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

  // npm can incorrectly report "up to date" when node_modules is partially
  // restored from a stale cache. Remove the exact broken package folders first
  // so the install has to materialize fresh copies before Vite/tsc run.
  for (const packagePath of [
    "node_modules/vite",
    "node_modules/@vitejs/plugin-react",
    "node_modules/.package-lock.json",
  ]) {
    fs.rmSync(path.join(projectRoot, packagePath), { recursive: true, force: true });
  }

  execSync(
    `npm install vite@${VITE_VERSION} @vitejs/plugin-react@${PLUGIN_REACT_VERSION} --save-exact --include=dev --no-audit --no-fund --force`,
    { stdio: "inherit", cwd: projectRoot },
  );

  if (!isViteInstallHealthy() || !isPluginReactHealthy()) {
    throw new Error("[vite-safe] Vite repair completed but required files are still missing.");
  }
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
  const rawArgs = process.argv.slice(2);

  if (rawArgs[0] === "ensure") {
    if (!isViteInstallHealthy() || !isPluginReactHealthy()) {
      runRepair("preflight: missing Vite runtime files");
    }
    process.exit(0);
  }

  const viteArgs = normalizeArgs(rawArgs);

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