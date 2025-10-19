import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Homepage from '../pages/homepages/Homepage.tsx';
import Courses from '../pages/courses/Courses.tsx';
import CreateCourse from '../pages/dashboards/CreateCourse.tsx';
import CoursePlayer from '../pages/courses/CoursePlayer.tsx';
import Forum from '../pages/forums/Forum.tsx';
import ForumThread from '../pages/forums/ForumThread.tsx';
import CreatePost from '../pages/forums/CreatePost.tsx';
import Livestream from '../pages/livestreams/Livestream.tsx';
import LivestreamPlayer from '../pages/livestreams/LivestreamPlayer.tsx';
import GoLive from '../pages/dashboards/GoLive.tsx';
import Shop from '../pages/shops/Shop.tsx';
import Profile from '../pages/profiles/Profile.tsx';
import Dashboard from '../pages/dashboards/Dashboard.tsx';
import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";
import ForgotPassword from "../pages/auth/ForgotPassword.tsx";
import ChangePassword from "../pages/auth/ChangePassword.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route element={<Layout />}>
          <Route path="homepage" element={<Homepage/>}/>
          <Route path="courses" element={<Courses />} />
          <Route path="courses/player" element={<CoursePlayer />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum/thread" element={<ForumThread />} />
          <Route path="forum/create" element={<CreatePost />} />
          <Route path="livestream" element={<Livestream />} />
          <Route path="livestream/player" element={<LivestreamPlayer />} />
          <Route path="dashboard/go-live" element={<GoLive />} />
          <Route path="dashboard/create-course" element={<CreateCourse />} />
          <Route path="shop" element={<Shop />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
