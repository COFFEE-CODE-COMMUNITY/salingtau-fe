import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../globals/components/Layout"
import Login from "../features/auth/pages/Login.tsx"
import Register from "../features/auth/pages/Register.tsx"
import ForgotPassword from "../features/auth/pages/ForgotPassword.tsx"
import ChangePassword from "../features/auth/pages/ChangePassword.tsx"
import Homepage from "../features/homepages/pages/Homepage.tsx"
import Courses from "../features/courses/pages/Courses.tsx"
import CoursePlayer from "../features/courses/pages/CoursePlayer.tsx"
import Forum from "../features/forums/pages/Forum.tsx"
import ForumThread from "../features/forums/pages/ForumThread.tsx"
import CreatePost from "../features/forums/pages/CreatePost.tsx"
import Livestream from "../features/livestreams/pages/Livestream.tsx"
import LivestreamPlayer from "../features/livestreams/pages/LivestreamPlayer.tsx"
import Dashboard from "../features/dashboards/pages/Dashboard.tsx"
import CreateCourse from "../features/dashboards/pages/CreateCourse.tsx"
import GoLive from "../features/dashboards/pages/GoLive.tsx"
import Shop from "../features/shops/Shop.tsx"
import ProfileLayout from "../features/profiles/pages/ProfileLayout.tsx"
import ProfileHome from "../features/profiles/pages/ProfileHome.tsx"
import Settings from "../features/profiles/pages/Settings.tsx"
import Security from "../features/profiles/pages/Security.tsx"
import ProtectedRoute from "../globals/components/ProtectedRoute.tsx"
import BlankPage from "../features/auth/pages/BlankPage.tsx";
import Notifications from "../features/homepages/pages/Notification.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/*  AUTH ROUTES */}
        {/* ========================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/blankpage" element={<BlankPage/>} />

        {/* ========================= */}
        {/*  MAIN APP ROUTES */}
        {/* ========================= */}
        <Route element={<Layout />}>
          {/* === Homepage === */}
          <Route
            path="homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="notification"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* === Courses === */}
          <Route
            path="courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/player"
            element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            }
          />

          {/* === Forum === */}
          <Route
            path="forum"
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />
          <Route
            path="forum/thread"
            element={
              <ProtectedRoute>
                <ForumThread />
              </ProtectedRoute>
            }
          />
          <Route
            path="forum/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          {/* === Livestream === */}
          <Route
            path="livestream"
            element={
              <ProtectedRoute>
                <Livestream />
              </ProtectedRoute>
            }
          />
          <Route
            path="livestream/player"
            element={
              <ProtectedRoute>
                <LivestreamPlayer />
              </ProtectedRoute>
            }
          />

          {/* === Dashboard === */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/create-course"
            element={
              <ProtectedRoute>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/go-live"
            element={
              <ProtectedRoute>
                <GoLive />
              </ProtectedRoute>
            }
          />

          {/* === Shop === */}
          <Route
            path="shop"
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            }
          />

          {/* === Profile === */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="security" element={<Security />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
