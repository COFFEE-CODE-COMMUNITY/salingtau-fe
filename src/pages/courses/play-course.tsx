import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import 'videojs-youtube';
import "video.js/dist/video-js.css";
import { Code, FileText, PlayCircle } from "lucide-react";
import type { CourseDetail } from "@/utils/course-data";
import { coursesData } from "@/utils/course-data";
import Article from "./article.tsx";

const PlayCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  const videoSources: Record<string, string> = {
    "lec-1": "https://www.youtube.com/watch?v=rfscVS0vtbw",
    "lec-2": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    "lec-4": "https://www.youtube.com/watch?v=vmEHCJofslg",
    "lec-5": "https://www.youtube.com/watch?v=UB3DE5Bgfx4",
    "lec-6": "https://www.youtube.com/watch?v=2FOpRrmk4tI",
  };

  useEffect(() => {
    if (courseId) {
      const foundCourse = coursesData.find((c) => c.id === courseId) || null;
      setCourse(foundCourse);

      if (foundCourse) {
        const allLessons = foundCourse.sections.flatMap((s) => s.lectures);
        setActiveLessonId(allLessons[0]?.id ?? null);
      }
    }
  }, [courseId]);

  // Initialize Video.js player HANYA SEKALI
  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
        preload: "auto",
        techOrder: ["youtube"],
        youtube: {
          ytControls: 2,
          modestbranding: 1
        }
      });

      playerRef.current = player;

      player.on('error', () => {
        const error = player.error();
        console.error("❌ Player error:", error);
      });
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const allLessons = course?.sections.flatMap((s) => s.lectures) || [];
    const activeLesson = allLessons.find((l) => l.id === activeLessonId);

    if (playerRef.current && activeLesson?.type === "video" && activeLessonId) {
      const videoUrl = videoSources[activeLessonId];

      if (videoUrl) {
        if (playerRef.current.readyState() === 0) {
          playerRef.current.one('loadedmetadata', () => {
            setVideoSource(videoUrl);
          });
        } else {
          setVideoSource(videoUrl);
        }
      }
    }
  }, [activeLessonId, course]);

  const setVideoSource = (videoUrl: string) => {
    if (playerRef.current) {
      playerRef.current.src({
        type: "video/youtube",
        src: videoUrl
      });

      playerRef.current.load();
      setTimeout(() => {
        playerRef.current?.play().catch((err: any) => {
          console.log("⚠️ Auto-play prevented:", err.message);
        });
      }, 100);
    }
  };

  if (!course) {
    return <div className="p-10 text-gray-600">Course not found.</div>;
  }

  const allLessons = course.sections.flatMap((s) => s.lectures);
  const activeLesson = allLessons.find((l) => l.id === activeLessonId);

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-5 h-5" />;
      case "file":
        return <FileText className="w-5 h-5" />;
      case "article":
        return <Code className="w-5 h-5" />;
      default:
        return <PlayCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-white">
        {activeLesson?.type === "article" ? (
          <Article
            title={activeLesson.title}
          />
        ) : (
          <>
            {/* Video Player */}
            <div className="relative w-full bg-black aspect-video">
              <div data-vjs-player="" className="w-full h-full">
                <video
                  ref={videoRef}
                  className="video-js vjs-big-play-centered w-full h-full"
                />
              </div>
            </div>

            {/* Course Info */}
            <div className="px-10 py-8">
              <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
                {course.category}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {course.title}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                {activeLesson
                  ? `Now Playing: ${activeLesson.title}`
                  : "Select a lesson to start learning."}
              </p>
            </div>

            {/* Bottom Navigation */}
            <div className="px-10 py-6 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-base font-semibold text-gray-900">
                    {course.instructor.name}
                  </div>
                  <div className="text-sm text-gray-500">Instructor</div>
                </div>
              </div>
              <button className="px-7 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Done & Continue
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <aside className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto">
        <div className="px-6 py-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            List of Lessons
          </h2>
        </div>
        <div className="py-2">
          {course.sections.map((section) => (
            <div key={section.id} className="mb-4">
              <h3 className="px-6 py-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {section.title}
              </h3>
              {section.lectures.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`px-6 py-3 border-b border-gray-200 cursor-pointer transition-colors flex items-center gap-3 ${
                    activeLessonId === lesson.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={
                      activeLessonId === lesson.id
                        ? "text-blue-600"
                        : "text-gray-600"
                    }
                  >
                    {getLessonIcon(lesson.type)}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-sm font-medium ${
                        activeLessonId === lesson.id
                          ? "text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {lesson.title}
                    </div>
                    {lesson.type === "video" && (
                      <div className="text-xs text-gray-500">
                        {Math.floor(lesson.duration / 60)}m{" "}
                        {lesson.duration % 60}s
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default PlayCourse;
