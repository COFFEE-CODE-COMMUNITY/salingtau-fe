import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/landing-page/landingpage.tsx";
import Login from "@/pages/auth/login.tsx";
import Register from "@/pages/auth/register.tsx";
import ForgotPassword from "@/pages/auth/forgot-password.tsx";
import ChangePassword from "@/pages/auth/change-password.tsx";
import { Layout } from "@/components/ui/layout.tsx";
import StudentHomepage from "@/pages/dashboard/student-homepage.tsx";
import ExploreCourse from "@/pages/courses/explore-course.tsx";
import MyCourse from "@/pages/courses/my-course.tsx";
import ApplyAsInstructor from "@/pages/users/apply-as-instructor.tsx";
import Profile from "@/pages/users/profile.tsx";
import {AdminRoute, InstructorRoute, StudentRoute} from "@/utils/protected-routes.tsx";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/change-password" element={<ChangePassword/>} />

        <Route element={<StudentRoute/>}>
          <Route path="/dashboard/student" element={<Layout/>}>
            <Route index element={<StudentHomepage/>} />
            <Route path="my-course" element={<MyCourse/>} />
            <Route path="explore" element={<ExploreCourse/>} />
            <Route path="apply-as-instructor" element={<ApplyAsInstructor/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Route>

        <Route element={<InstructorRoute />}>
          <Route path="/dashboard/instructor">
            <Route index element={<StudentHomepage/>} />
          </Route>
        </Route>

        <Route element={<AdminRoute/>}>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}