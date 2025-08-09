import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import StudentDashboard from "./user/StudentDashboard";
import QuizPage from "./user/QuizPage";
import ThanksPage from "./user/ThanksPage";
import AdminDashboard from "./admin/AdminDashboard";
import CreateEditQuiz from "./admin/CreateEditQuiz";
import UploadQuestions from "./admin/UploadQuestions";
import ScheduleQuiz from "./admin/ScheduleQuiz";
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
  <Route path="/quiz" element={<QuizPage />} />
  <Route path="/thanks" element={<ThanksPage />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/admin/create-quiz" element={<CreateEditQuiz />} />
  <Route path="/admin/upload-questions" element={<UploadQuestions />} />
  <Route path="/admin/schedule-quiz" element={<ScheduleQuiz />} />
  <Route path="/admin/participation" element={<ParticipationDashboard />} />
  <Route path="/admin/export-results" element={<ExportResults />} />
      </Routes>
    </Router>
  );
}