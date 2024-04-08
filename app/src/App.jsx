import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import AdminLayout from "./components/layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Quizzes from "./pages/Admin/Quizzes";
import { Toaster } from "react-hot-toast";
import FormQuiz from "./pages/Admin/FormQuiz";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" index element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/admin" index element={<Dashboard />} />
          <Route path="/admin/quizzes" element={<Quizzes />} />
          <Route path="/admin/quizzes/create" element={<FormQuiz />} />
          <Route path="/admin/quizzes/edit/:id" element={<FormQuiz />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
