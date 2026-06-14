import { Routes, Route } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import { LandingPage } from "./components/LandingPage.jsx";
import { IdeaThonPage } from "./pages/IdeaThonPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { ForteFormPage } from "./components/form/ForteFormPage.jsx";
import { ideathonConfig } from "./components/form/configs/ideathonConfig.jsx";
import { Navbar } from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      <div className="fixed inset-0 bg-[#050816] -z-50 pointer-events-none" />
      <ScrollToTop />
      <div className="min-h-[100dvh] w-full max-w-[100vw] flex flex-col relative">
        <Navbar />
        <div className="flex-1 w-full max-w-[100vw] overflow-x-clip relative flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ideathon" element={<IdeaThonPage />} />

          {/* Ideathon Routes */}
          <Route path="/ideathon/register" element={<ForteFormPage config={ideathonConfig.register} themeColor={ideathonConfig.themeColor} />} />
          <Route path="/ideathon/submit" element={<ForteFormPage config={ideathonConfig.submit} themeColor={ideathonConfig.themeColor} />} />
          <Route path="/ideathon/feedback" element={<ForteFormPage config={ideathonConfig.feedback} themeColor={ideathonConfig.themeColor} />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </>
  );
}