import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import 'videojs-youtube';
import "video.js/dist/video-js.css";
import { Code, FileText, PlayCircle, ExternalLink, Clock } from "lucide-react";
import type { CourseDetail } from "@/utils/courseData.ts";
import { coursesData } from "@/utils/courseData.ts";
import Article from "./article.tsx";
import { FileDownloadDialog } from "@/components/ui/file-download-dialog.tsx";
import { ExternalLinkDialog } from "@/components/ui/external-link-dialog.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

const PlayCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<{
    type: 'file' | 'external' | null;
    lessonId: string | null;
  }>({ type: null, lessonId: null });

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  const videoSources: Record<string, string> = {
    "lec-1": "https://www.youtube.com/watch?v=rfscVS0vtbw",
    "lec-2": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    "lec-4": "https://www.youtube.com/watch?v=vmEHCJofslg",
    "lec-5": "https://www.youtube.com/watch?v=UB3DE5Bgfx4",
    "lec-6": "https://www.youtube.com/watch?v=2FOpRrmk4tI",
  };

  // Dummy data untuk file lectures
  const fileLectures: Record<string, any> = {
    "lec-3": {
      id: "file-uuid-1",
      lecture_id: "lec-3",
      file_path: "/uploads/lectures/course-materials.pdf",
      file_name: "Course_Materials.pdf",
      file_size: 2516582,
      mimetype: "application/pdf",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z"
    },
    "lec-7": {
      id: "file-uuid-2",
      lecture_id: "lec-7",
      file_path: "/uploads/lectures/additional-materials.pdf",
      file_name: "Additional_Materials.pdf",
      file_size: 1524288,
      mimetype: "application/pdf",
      created_at: "2024-01-16T10:30:00Z",
      updated_at: "2024-01-16T10:30:00Z"
    }
  }

  const externalLectures: Record<string, any> = {
    "lec-7": {
      id: "external-uuid-1",
      lecture_id: "lec-7",
      external_url: "https://github.com/example/project",
      title: "GitHub Repository",
      description: "Access the complete source code for this project"
    },
    "lec-8": {
      id: "external-uuid-2",
      lecture_id: "lec-8",
      external_url: "https://docs.example.com/guide",
      title: "Documentation Guide",
      description: "Complete documentation for the project"
    }
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

  const handleLessonClick = (lessonId: string, lessonType: string) => {
    console.log("=== DEBUG CLICK ===");
    console.log("Lesson ID:", lessonId);
    console.log("Lesson Type:", lessonType);

    if (lessonType === "file") {
      console.log("Setting file dialog...");
      console.log("File data:", fileLectures[lessonId]);
      setOpenDialog({ type: 'file', lessonId });
    } else if (lessonType === "external") {
      console.log("Setting external dialog...");
      console.log("External data:", externalLectures[lessonId]);
      setOpenDialog({ type: 'external', lessonId });
    } else {
      setActiveLessonId(lessonId);
    }
  };

  useEffect(() => {
    console.log("=== DIALOG STATE CHANGED ===");
    console.log("openDialog:", openDialog);
  }, [openDialog]);

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
      case "external":
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <PlayCircle className="w-5 h-5" />;
    }
  };

  const getSectionStats = (sectionId: string) => {
    const section = course.sections.find(s => s.id === sectionId);
    if (!section) return { lectureCount: 0, totalDuration: 0 };

    const lectureCount = section.lectures.length;
    const totalDuration = section.lectures
      .filter(l => l.type === "video")
      .reduce((sum, l) => sum + (l.duration || 0), 0);

    return { lectureCount, totalDuration };
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  console.log("=== RENDER CHECK ===");
  console.log("openDialog.type:", openDialog.type);
  console.log("openDialog.lessonId:", openDialog.lessonId);
  console.log("fileLectures data:", fileLectures);
  console.log("externalLectures data:", externalLectures);

  if (openDialog.type === 'file' && openDialog.lessonId) {
    console.log("File dialog should render");
    console.log("File data exists?", !!fileLectures[openDialog.lessonId]);
  }

  if (openDialog.type === 'external' && openDialog.lessonId) {
    console.log("External dialog should render");
    console.log("External data exists?", !!externalLectures[openDialog.lessonId]);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-white">
        {activeLesson?.type === "article" ? (
          <Article title={activeLesson.title} />
        ) : (
          <>
            <div className="relative w-full bg-black aspect-video">
              <div data-vjs-player="" className="w-full h-full">
                <video
                  ref={videoRef}
                  className="video-js vjs-big-play-centered w-full h-full"
                />
              </div>
            </div>

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

      {/* Sidebar with Accordion */}
      <aside className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto">
        <div className="px-6 py-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-900">
            Course Content
          </h2>
        </div>

        <Accordion type="multiple" defaultValue={course.sections.map(s => s.id)} className="w-full">
          {course.sections.map((section) => {
            const stats = getSectionStats(section.id);

            return (
              <AccordionItem key={section.id} value={section.id} className="border-b">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-100 hover:no-underline">
                  <div className="flex flex-col items-start text-left w-full">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{stats.lectureCount} lectures</span>
                      {stats.totalDuration > 0 && (
                        <>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(stats.totalDuration)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-0">
                  {section.lectures.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson.id, lesson.type)}
                      className={`px-6 py-3 border-t border-gray-200 cursor-pointer transition-colors flex items-center gap-3 ${
                        activeLessonId === lesson.id && (lesson.type === "video" || lesson.type === "article")
                          ? "bg-blue-50 border-l-4 border-l-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div
                        className={
                          activeLessonId === lesson.id && (lesson.type === "video" || lesson.type === "article")
                            ? "text-blue-600"
                            : "text-gray-600"
                        }
                      >
                        {getLessonIcon(lesson.type)}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`text-sm font-medium ${
                            activeLessonId === lesson.id && (lesson.type === "video" || lesson.type === "article")
                              ? "text-blue-600"
                              : "text-gray-900"
                          }`}
                        >
                          {lesson.title}
                        </div>
                        {lesson.type === "video" && (
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>
                              {Math.floor(lesson.duration / 60)}:
                              {String(lesson.duration % 60).padStart(2, '0')}
                            </span>
                          </div>
                        )}
                        {lesson.type === "file" && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            Click to download
                          </div>
                        )}
                        {lesson.type === "external" && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            External resource
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </aside>

      {/* File Download Dialog */}
      {openDialog.type === 'file' && openDialog.lessonId && fileLectures[openDialog.lessonId] && (
        <FileDownloadDialog
          lectureFile={fileLectures[openDialog.lessonId]}
          open={true}
          onOpenChange={(open: any) => {
            if (!open) setOpenDialog({ type: null, lessonId: null });
          }}
        />
      )}

      {/* External Link Dialog */}
      {openDialog.type === "external" && openDialog.lessonId && externalLectures[openDialog.lessonId] && (
        <ExternalLinkDialog
          open={true}
          onOpenChange={(open: boolean) => {
            if (!open) setOpenDialog({ type: null, lessonId: null });
          }}
          lectureTitle={externalLectures[openDialog.lessonId].title}
          lectureDescription={externalLectures[openDialog.lessonId].description}
          externalUrl={externalLectures[openDialog.lessonId].external_url}
        />
      )}

    </div>
  );
};

export default PlayCourse;