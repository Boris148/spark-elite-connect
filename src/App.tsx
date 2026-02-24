import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { EvergreenPage } from "./pages/EvergreenPage";
import { FundingPage } from "./pages/FundingPage";
import { HomePage } from "./pages/HomePage";
import { MusicPage } from "./pages/MusicPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ServicesPage } from "./pages/ServicesPage";

function SiteLayout() {
  return (
    <div className="min-h-screen bg-elite-black bg-hero-radial">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/funding" element={<FundingPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/evergreen" element={<EvergreenPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
