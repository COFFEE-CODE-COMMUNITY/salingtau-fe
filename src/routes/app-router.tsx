import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "@/pages/landing-page/landingpage.tsx";
import Login from "@/pages/auth/login.tsx";
import Register from "@/pages/auth/register.tsx";
import ForgotPassword from "@/pages/auth/forgot-password.tsx";
import ChangePassword from "@/pages/auth/change-password.tsx";

// Layout
import { Layout } from "@/components/ui/layout.tsx";

// Student pages
import StudentHomepage from "@/pages/student/dashboard/student-homepage.tsx";
import ExploreCourse from "@/pages/student/courses/explore-course.tsx";
import MyCourse from "@/pages/student/courses/my-course.tsx";
import ApplyAsInstructor from "@/pages/student/users/apply-as-instructor.tsx";
import Profile from "@/pages/student/users/profile.tsx";
import CourseDetail from "@/pages/student/courses/course-detail.tsx";
import PlayCourse from "@/pages/student/courses/play-course.tsx";
import TransactionHistory from "@/pages/student/transactions/transaction-history.tsx";
import BuyCourse from "@/pages/student/courses/buy-course.tsx";

// Instructor pages
import InstructorDashboard from "@/pages/instructor/dashboard/instructor-dashboard.tsx";
import InstructorCreateCourse from "@/pages/instructor/courses/instructor-createcourse.tsx";

// Route protection
import { InstructorRoute, StudentRoute } from "@/utils/protected-routes.tsx";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* ---------- STUDENT ROUTES ---------- */}
        <Route element={<StudentRoute />}>
          <Route path="/dashboard/student" element={<Layout />}>
            <Route index element={<StudentHomepage />} />
            <Route path="my-course" element={<MyCourse />} />
            <Route path="explore" element={<ExploreCourse />} />
            <Route path="apply-as-instructor" element={<ApplyAsInstructor />} />
            <Route path="profile" element={<Profile />} />
            <Route path="course/:courseId" element={<CourseDetail />} />
            <Route path="course/play/:courseId" element={<PlayCourse />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="buy/:id" element={<BuyCourse />} />
          </Route>
        </Route>

        {/* ---------- INSTRUCTOR ROUTES ---------- */}
        <Route element={<InstructorRoute />}>
          <Route path="/dashboard/instructor" element={<Layout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="course" element={<InstructorCreateCourse />} />
            {/* kamu bisa tambahkan halaman lain seperti revenue, rating, dsb */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
