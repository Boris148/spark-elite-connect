#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync, spawnSync } from "node:child_process";

const VITE_VERSION = "5.4.21";
const PLUGIN_REACT_VERSION = "4.3.4";
const projectRoot = process.cwd();

function fileExists(relativePath) {
  return fs.existsSync(path.join(projectRoot, relativePath));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function getExpectedViteChunkFromCli() {
  const cliPath = "node_modules/vite/dist/node/cli.js";
  if (!fileExists(cliPath)) return null;

  const cliSource = readText(cliPath);
  const match = cliSource.match(/\.\/chunks\/(dep-[^"']+\.js)/);
  return match ? match[1] : null;
}

function isViteInstallHealthy() {
  const viteBin = "node_modules/vite/bin/vite.js";
  const viteCli = "node_modules/vite/dist/node/cli.js";

  if (!fileExists(viteBin) || !fileExists(viteCli)) return false;

  const expectedChunk = getExpectedViteChunkFromCli();
  if (!expectedChunk) return false;

  return fileExists(`node_modules/vite/dist/node/chunks/${expectedChunk}`);
}

function isPluginReactHealthy() {
  return fileExists("node_modules/@vitejs/plugin-react/dist/index.mjs");
}

function runRepair(reason) {
  console.warn(`[vite-safe] Repairing Vite install (${reason})...`);
  execSync(
    `npm install vite@${VITE_VERSION} @vitejs/plugin-react@${PLUGIN_REACT_VERSION} --save-exact --include=dev --no-audit --no-fund`,
    { stdio: "inherit", cwd: projectRoot },
  );
}

function runVite(viteArgs) {
  const result = spawnSync(process.execPath, ["node_modules/vite/bin/vite.js", ...viteArgs], {
    cwd: projectRoot,
    encoding: "utf8",
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  return {
    code: result.status ?? 1,
    output: `${result.stdout ?? ""}\n${result.stderr ?? ""}`,
  };
}

function shouldRepairFromOutput(output) {
  return (
    output.includes("ERR_MODULE_NOT_FOUND") &&
    output.includes("node_modules/vite/dist/node/chunks/dep-")
  ) || output.includes("Cannot find module '@vitejs/plugin-react'");
}

function normalizeArgs(rawArgs) {
  if (rawArgs.length === 0) return ["dev"];

  const [first, ...rest] = rawArgs;
  if (first === "dev" || first === "build" || first === "preview") {
    return [first, ...rest];
  }

  return rawArgs;
}

function main() {
  const viteArgs = normalizeArgs(process.argv.slice(2));

  if (!isViteInstallHealthy() || !isPluginReactHealthy()) {
    runRepair("missing Vite runtime files");
  }

  let firstRun = runVite(viteArgs);

  if (firstRun.code !== 0 && shouldRepairFromOutput(firstRun.output)) {
    runRepair("runtime missing module error");
    firstRun = runVite(viteArgs);
  }

  process.exit(firstRun.code);
}

main();