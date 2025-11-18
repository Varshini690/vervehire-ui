// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


import ResumeUpload from "./pages/ResumeUpload";
import InterviewSetup from "./pages/InterviewSetup";
import ResumeScore from "./pages/premium/ResumeScore";
import ATSCheck from "./pages/premium/ATSCheck";
import JDQuestions from "./pages/premium/JDQuestions";
import CoverLetter from "./pages/premium/CoverLetter";
import PremiumDashboard from "./pages/premium/PremiumDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT ROUTE: Redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/resume" element={<ResumeUpload />} />
        <Route path="/setup" element={<InterviewSetup />} />
        <Route path="/premium" element={<PremiumDashboard />} />
        <Route path="/score" element={<ResumeScore />} />
        <Route path="/ats" element={<ATSCheck />} />
        <Route path="/jd-questions" element={<JDQuestions />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
