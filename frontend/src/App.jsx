import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import StudentDashboard from "./user/StudentDashboard";
import QuizPage from "./user/QuizPage";
import ThanksPage from "./user/ThanksPage";
import AdminDashboard from "./admin/AdminDashboard";
import CreateEditQuiz from "./admin/CreateEditQuiz";
import ParticipationDashboard from "./admin/ParticipationDashboard";
import ExportResults from "./admin/ExportResults";

function LoginWithRedirect() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate("/dashboard")} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWithRedirect />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-quiz" element={<CreateEditQuiz />} />
        <Route path="/admin/participation" element={<ParticipationDashboard />} />
        <Route path="/admin/export-results" element={<ExportResults />} />
      </Routes>
    </Router>
  );
}