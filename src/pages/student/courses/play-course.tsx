import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import { Code, FileText, PlayCircle, ExternalLink, Clock, ChevronLeft, Menu } from "lucide-react";
import Article from "./article.tsx";
import { FileDownloadDialog } from "@/components/ui/file-download-dialog.tsx";
import { ExternalLinkDialog } from "@/components/ui/external-link-dialog.tsx";
import { useCourseDetail } from "@/services/courseDetail.ts";
import { getProfilePictureUrl } from "@/utils/imageUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import type { Section } from "@/types/course.types.ts";

const PlayCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading, error } = useCourseDetail(courseId);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<{
    type: 'file' | 'external' | null;
    lessonId: string | null;
  }>({ type: null, lessonId: null });

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Get video base URL from environment
  const VIDEO_BASE_URL = import.meta.env.VITE_VIDEO_BASE_URL || 'http://localhost:8081/api/v1/files/';

  // Helper function to build video URL
  const buildVideoUrl = (path: string): string => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `${VIDEO_BASE_URL}${path}`;
  };

  // Set first lesson as active when course is loaded
  useEffect(() => {
    if (course?.sections && course.sections.length > 0) {
      const allLessons = course.sections.flatMap((s) => s.lectures || []);

      console.log("📚 Course loaded:", {
        title: course.title,
        sections: course.sections.length,
        totalLessons: allLessons.length,
        firstLesson: allLessons[0]?.title
      });

      if (allLessons.length > 0) {
        setActiveLessonId(allLessons[0]?.id ?? null);
      }
    }
  }, [course]);

  // Cleanup HLS instance on unmount
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!activeLessonId || !course) return;

    const allLessons = course.sections?.flatMap((s) => s.lectures || []);
    const activeLesson = allLessons?.find((l) => l.id === activeLessonId);

    if (!activeLesson || activeLesson.type !== "VIDEO") return;

    // Get video path from the video object
    const videoPath = activeLesson.video?.path;

    if (!videoPath) {
      console.error("❌ No video path found for lesson:", activeLesson.id);
      return;
    }

    // Build full video URL
    const fullVideoUrl = buildVideoUrl(videoPath);

    console.log("🎬 Loading lesson:", {
      id: activeLesson.id,
      title: activeLesson.title,
      type: activeLesson.type,
      videoPath: videoPath,
      fullUrl: fullVideoUrl,
      status: activeLesson.video?.status,
      duration: activeLesson.video?.durationMilliseconds,
      resolutions: activeLesson.video?.resolutions
    });

    if (videoRef.current && fullVideoUrl) {
      loadVideo(fullVideoUrl);
    }
  }, [activeLessonId, course]);

  const loadVideo = (videoUrl: string) => {
    const video = videoRef.current;
    if (!video) return;

    // Destroy existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Check if the URL is an m3u8 file
    if (videoUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
          debug: false,
        });

        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          console.log("✅ Video ready:", {
            qualities: data.levels.length,
            duration: data.levels[0]?.details?.totalduration || 'unknown'
          });

          video.play().catch(() => {
            console.log("ℹ️ Autoplay prevented - user interaction required");
          });
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            console.error("❌ HLS Error:", {
              type: data.type,
              details: data.details
            });

            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });

        hlsRef.current = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log("🍎 Using Safari native HLS");
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {
            console.log("ℹ️ Autoplay prevented");
          });
        });
      } else {
        console.error("❌ HLS not supported");
        alert("Your browser does not support HLS video playback. Please use a modern browser.");
      }
    } else {
      video.src = videoUrl;
      video.load();
      video.play().catch(() => {
        console.log("ℹ️ Autoplay prevented");
      });
    }
  };

  const handleLessonClick = (lessonId: string, lessonType: string) => {
    if (lessonType === "FILE") {
      setOpenDialog({ type: 'file', lessonId });
    } else if (lessonType === "EXTERNAL") {
      setOpenDialog({ type: 'external', lessonId });
    } else {
      setActiveLessonId(lessonId);
      setIsSidebarOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-base sm:text-lg text-red-600 mb-2">Error loading course</p>
          <p className="text-sm sm:text-base text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-sm sm:text-base text-gray-600">Course not found.</p>
      </div>
    );
  }

  const allLessons = course?.sections?.flatMap((s) => s.lectures || []);
  const activeLesson = allLessons?.find((l) => l.id === activeLessonId);

  const getLessonIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "VIDEO":
        return <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "FILE":
        return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "ARTICLE":
        return <Code className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "EXTERNAL":
        return <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getSectionStats = (section: Section) => {
    if (!section.lectures) {
      return { lectureCount: 0, totalDuration: 0 };
    }

    const lectureCount = section.lectures.length;

    const totalDuration = section.lectures
      .filter((l) => l.type === "VIDEO" && l.video?.durationMilliseconds)
      .reduce((sum, l) => {
        const durationMs = l.video?.durationMilliseconds ?? "0";
        const durationInSeconds = parseInt(durationMs) / 1000;
        return sum + durationInSeconds;
      }, 0);

    return {
      lectureCount,
      totalDuration, // ← sekarang PASTI number
    };
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatLectureDuration = (durationMs: string | undefined) => {
    if (!durationMs) return null;
    const totalSeconds = Math.floor(parseInt(durationMs) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  // Get current lesson data for dialogs
  const currentFileLesson = openDialog.lessonId
    ? allLessons?.find((l) => l.id === openDialog.lessonId)
    : null;
  const currentExternalLesson = openDialog.lessonId
    ? allLessons?.find((l) => l.id === openDialog.lessonId)
    : null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-white">
        {activeLesson?.type === "ARTICLE" ? (
          <Article title={activeLesson.title} />
        ) : (
          <>
            <div className="relative w-full bg-black aspect-video">
              <video
                ref={videoRef}
                controls
                className="w-full h-full"
                style={{ backgroundColor: '#000' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8">
              <div className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                {course.category.name}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight break-words">
                {course.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {activeLesson
                  ? `Now Playing: ${activeLesson.title}`
                  : "Select a lesson to start learning."}
              </p>
            </div>

            <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src={getProfilePictureUrl(course.instructor.profilePictures)}
                  alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Instructor</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-30 p-3 sm:p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 active:scale-95 touch-manipulation"
      >
        {isSidebarOpen ? <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar with Accordion */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-30
        w-80 sm:w-96 bg-gray-50 border-l border-gray-200 
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        overflow-y-auto
        shadow-xl lg:shadow-none
      `}>
        <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Course Content
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <Accordion type="multiple" defaultValue={course.sections?.map((s) => s.id)} className="w-full">
          {course.sections?.map((section) => {
            const stats = getSectionStats(section);

            return (
              <AccordionItem key={section.id} value={section.id} className="border-b">
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-100 hover:no-underline transition-colors touch-manipulation">
                  <div className="flex flex-col items-start text-left w-full pr-2">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 break-words">
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
                  {section.lectures?.map((lesson) => {
                    const isActive = activeLessonId === lesson.id &&
                      (lesson.type === "VIDEO" || lesson.type === "ARTICLE");

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson.id, lesson.type)}
                        className={`px-4 sm:px-6 py-3 border-t border-gray-200 cursor-pointer transition-all duration-200 flex items-center gap-2 sm:gap-3 touch-manipulation active:scale-[0.98] ${
                          isActive
                            ? "bg-blue-50 border-l-4 border-l-blue-600 shadow-sm"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className={`flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                          {getLessonIcon(lesson.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs sm:text-sm font-medium break-words ${isActive ? "text-blue-600" : "text-gray-900"}`}>
                            {lesson.title}
                          </div>
                          {lesson.type === "VIDEO" && lesson.video?.durationMilliseconds && (
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span>{formatLectureDuration(lesson.video.durationMilliseconds)}</span>
                            </div>
                          )}
                          {lesson.type === "FILE" && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              Click to download
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </aside>

      {/* File Download Dialog */}
      {openDialog.type === 'file' && currentFileLesson && (
        <FileDownloadDialog
          lectureFile={{
            id: currentFileLesson.id,
            lecture_id: currentFileLesson.id,
            file_path: currentFileLesson.fileUrl || "",
            file_name: currentFileLesson.title || "Download",
            file_size: 0,
            mimetype: "application/octet-stream",
            created_at: currentFileLesson.createdAt || "",
            updated_at: currentFileLesson.updatedAt || ""
          }}
          open={true}
          onOpenChange={(open: boolean) => {
            if (!open) setOpenDialog({ type: null, lessonId: null });
          }}
        />
      )}

      {/* External Link Dialog */}
      {openDialog.type === "external" && currentExternalLesson && (
        <ExternalLinkDialog
          open={true}
          onOpenChange={(open: boolean) => {
            if (!open) setOpenDialog({ type: null, lessonId: null });
          }}
          lectureTitle={currentExternalLesson.title}
          lectureDescription={currentExternalLesson.description}
          externalUrl={currentExternalLesson.fileUrl || "#"}
        />
      )}
    </div>
  );
};

export default PlayCourse;