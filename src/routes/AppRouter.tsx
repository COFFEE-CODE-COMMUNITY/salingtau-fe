import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/landing-page/landingpage.tsx";
import Login from "@/pages/auth/login.tsx";
import Register from "@/pages/auth/register.tsx";
import ForgotPassword from "@/pages/auth/forgot-password.tsx";
import ChangePassword from "@/pages/auth/change-password.tsx";
import { Layout } from "@/components/ui/layout.tsx";
import Homepage from "@/pages/dashboard/Homepage.tsx";
import ExploreCourse from "@/pages/courses/ExploreCourse.tsx";
import MyCourse from "@/pages/courses/MyCourse.tsx";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path="/dashboard/student" element={<Layout/>}>
          <Route index element={<Homepage/>} />
          <Route path="my-course" element={<MyCourse/>} />
          <Route path="explore" element={<ExploreCourse/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}