import { useEffect, useRef, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal} from "react";
import {useParams} from "react-router-dom";
import Hls from "hls.js";
import {Code, FileText, PlayCircle, ExternalLink, Clock} from "lucide-react";
import Article from "./article.tsx";
import {FileDownloadDialog} from "@/components/ui/file-download-dialog.tsx";
import {ExternalLinkDialog} from "@/components/ui/external-link-dialog.tsx";
import { useCourseDetail } from "@/services/courseDetail.ts";
import { getProfilePictureUrl } from "@/utils/imageUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

const PlayCourse = () => {
  const {courseId} = useParams<{ courseId: string }>();
  const { course, loading, error } = useCourseDetail(courseId);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<{
    type: 'file' | 'external' | null;
    lessonId: string | null;
  }>({type: null, lessonId: null});

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Set first lesson as active when course is loaded
  useEffect(() => {
    console.log("📚 Course data:", course);
    console.log("📚 Sections:", course?.sections);
    
    if (course?.sections && course.sections.length > 0) {
      console.log("✅ Course has", course.sections.length, "sections");
      
      const allLessons = course.sections.flatMap((s) => s.lectures || []);
      console.log("📋 All lessons:", allLessons);
      console.log("📋 Total lessons:", allLessons.length);
      
      if (allLessons.length > 0) {
        const firstLesson = allLessons[0];
        console.log("🎯 Setting first lesson as active:", firstLesson);
        setActiveLessonId(firstLesson?.id ?? null);
      } else {
        console.warn("⚠️ No lessons found in course sections");
      }
    } else {
      console.warn("⚠️ Course has no sections, loading video directly with fallback URL");
      // Fallback: Load video directly if no sections
      if (course) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081/api/v1"
        const testUrl = `${baseUrl}/files/courses/1c0e7702-d645-415f-9338-96bc89a98e22/master.m3u8`
        console.log("🧪 Loading fallback video URL:", testUrl);
        setTimeout(() => loadVideo(testUrl), 500);
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
    if (!activeLessonId) {
      console.warn("⚠️ No active lesson ID set yet");
      return;
    }

    const allLessons = course?.sections?.flatMap((s: { lectures: any; }) => s.lectures || []) || [];
    console.log("🔍 Searching for lesson with ID:", activeLessonId);
    console.log("🔍 Available lessons:", allLessons.map((l: any) => ({ id: l.id, title: l.title })));
    
    const activeLesson = allLessons.find((l: { id: string | null; }) => l.id === activeLessonId);

    console.log("🎬 Active lesson found:", activeLesson);

    if (!activeLesson) {
      console.error("❌ Active lesson not found in course data");
      return;
    }

    if (activeLesson.type?.toUpperCase() !== "VIDEO") {
      console.log("ℹ️ Active lesson is not a video type:", activeLesson.type);
      return;
    }

    if (videoRef.current) {
      const videoUrl = activeLesson.videoUrl;
      console.log("🔗 Video URL from lesson:", videoUrl);

      if (videoUrl) {
        loadVideo(videoUrl);
      } else {
        console.warn("⚠️ No video URL found for this lesson");
        
        // Fallback: Try hardcoded URL for testing
        const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081/api/v1"
        const testUrl = `${baseUrl}/files/courses/1c0e7702-d645-415f-9338-96bc89a98e22/master.m3u8`
        console.log("🧪 Using fallback test URL:", testUrl);
        loadVideo(testUrl);
      }
    } else {
      console.error("❌ Video element not ready");
    }
  }, [activeLessonId, course]);

  const loadVideo = (videoUrl: string) => {
    const video = videoRef.current;
    if (!video) {
      console.error("❌ Video element not found");
      return;
    }

    console.log("📦 Loading video:", videoUrl);

    // Destroy existing HLS instance
    if (hlsRef.current) {
      console.log("🧹 Destroying existing HLS instance");
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Check if the URL is an m3u8 file
    if (videoUrl.includes('.m3u8')) {
      console.log("🎬 Detected HLS stream (m3u8)");
      
      if (Hls.isSupported()) {
        console.log("✅ HLS.js is supported");
        
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
          debug: true, // Enable debug logging
        });

        console.log("🔗 Loading HLS source:", videoUrl);
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          console.log("✅ Manifest parsed successfully");
          console.log("📊 Available levels:", data.levels);
          
          video.play().catch((err) => {
            console.log("⚠️ Auto-play prevented:", err.message);
            console.log("👆 Please click play button manually");
          });
        });

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          console.log("✅ Media attached to video element");
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
          console.log("✅ Level loaded:", data.level, "- Duration:", data.details.totalduration);
        });

        hls.on(Hls.Events.FRAG_LOADED, (_event, data) => {
          console.log("✅ Fragment loaded:", data.frag.sn);
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          console.error("❌ HLS Error:", data);
          
          if (data.fatal) {
            console.error("⚠️ Fatal error detected:", data.type, data.details);
            
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("🌐 Network error - trying to recover");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("🎥 Media error - trying to recover");
                hls.recoverMediaError();
                break;
              default:
                console.error("❌ Fatal error - cannot recover");
                hls.destroy();
                break;
            }
          }
        });

        hlsRef.current = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log("🍎 Safari native HLS support detected");
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => {
          console.log("✅ Video metadata loaded");
          video.play().catch((err) => {
            console.log("⚠️ Auto-play prevented:", err.message);
          });
        });
      } else {
        console.error("❌ HLS is not supported in this browser");
        alert("Your browser does not support HLS video playback. Please use a modern browser like Chrome, Firefox, or Safari.");
      }
    } else {
      console.log("🎬 Regular video file detected");
      // For regular mp4 or other video formats
      video.src = videoUrl;
      video.load();
      video.play().catch((err) => {
        console.log("⚠️ Auto-play prevented:", err.message);
      });
    }
  };

  const handleLessonClick = (lessonId: string, lessonType: string) => {
    if (lessonType === "FILE") {
      setOpenDialog({type: 'file', lessonId});
    } else if (lessonType === "EXTERNAL") {
      setOpenDialog({type: 'external', lessonId});
    } else {
      setActiveLessonId(lessonId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading course...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error loading course</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Course not found.</p>
      </div>
    );
  }

  const allLessons = course.sections?.flatMap((s: { lectures: any; }) => s.lectures || []) || [];
  const activeLesson = allLessons.find((l: { id: string | null; }) => l.id === activeLessonId);

  const getLessonIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "VIDEO":
        return <PlayCircle className="w-5 h-5"/>;
      case "FILE":
        return <FileText className="w-5 h-5"/>;
      case "ARTICLE":
        return <Code className="w-5 h-5"/>;
      case "EXTERNAL":
        return <ExternalLink className="w-5 h-5"/>;
      default:
        return <PlayCircle className="w-5 h-5"/>;
    }
  };

  const getSectionStats = (sectionId: React.Key | null | undefined) => {
    const section = course.sections?.find((s: { id: string; }) => s.id === sectionId);
    if (!section || !section.lectures) return {lectureCount: 0, totalDuration: 0};

    const lectureCount = section.lectures.length;
    const totalDuration = section.lectures
      .filter((l: { type: string; }) => l.type.toUpperCase() === "VIDEO")
      .reduce((sum: any, l: { duration: any; }) => sum + (l.duration || 0), 0);

    return {lectureCount, totalDuration};
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Get current lesson data for dialogs
  const currentFileLesson = activeLessonId ? allLessons.find((l: any) => l.id === openDialog.lessonId) : null;
  const currentExternalLesson = activeLessonId ? allLessons.find((l: any) => l.id === openDialog.lessonId) : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-white">
        {activeLesson?.type.toUpperCase() === "ARTICLE" ? (
          <Article title={activeLesson.title}/>
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

            <div className="px-10 py-8">
              <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
                {course.category?.name || "Course"}
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
                  src={getProfilePictureUrl(course.instructor.profilePictures)}
                  alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-base font-semibold text-gray-900">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </div>
                  <div className="text-sm text-gray-500">Instructor</div>
                </div>
              </div>
              <button
                className="px-7 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
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

        <Accordion type="multiple" defaultValue={course.sections?.map((s: { id: any; }) => s.id) || []} className="w-full">
          {course.sections?.map((section: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; lectures: any[]; }) => {
            const stats = getSectionStats(section.id);

            return (
              <AccordionItem key={section.id} value={String(section?.id ?? "")} className="border-b">
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
                  {section.lectures?.map((lesson: any) => {
                    const lessonTypeUpper = lesson.type.toUpperCase();
                    const isActive = activeLessonId === lesson.id && (lessonTypeUpper === "VIDEO" || lessonTypeUpper === "ARTICLE");
                    
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson.id, lesson.type)}
                        className={`px-6 py-3 border-t border-gray-200 cursor-pointer transition-colors flex items-center gap-3 ${
                          isActive
                            ? "bg-blue-50 border-l-4 border-l-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className={isActive ? "text-blue-600" : "text-gray-600"}>
                          {getLessonIcon(lesson.type)}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-900"}`}>
                            {lesson.title}
                          </div>
                          {lessonTypeUpper === "VIDEO" && lesson.duration && (
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              <span>
                                {Math.floor(lesson.duration / 60)}:
                                {String(lesson.duration % 60).padStart(2, '0')}
                              </span>
                            </div>
                          )}
                          {lessonTypeUpper === "FILE" && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              Click to download
                            </div>
                          )}
                          {lessonTypeUpper === "EXTERNAL" && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              External resource
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
      {openDialog.type === 'file' && openDialog.lessonId && currentFileLesson && (
        <FileDownloadDialog
          lectureFile={{
            id: currentFileLesson.id,
            lecture_id: currentFileLesson.id,
            file_path: currentFileLesson.fileUrl || "",
            file_name: currentFileLesson.title || "Download",
            file_size: 0,
            mimetype: "application/octet-stream",
            created_at: currentFileLesson.createdAt,
            updated_at: currentFileLesson.updatedAt
          }}
          open={true}
          onOpenChange={(open: any) => {
            if (!open) setOpenDialog({ type: null, lessonId: null });
          }}
        />
      )}

      {/* External Link Dialog */}
      {openDialog.type === "external" && openDialog.lessonId && currentExternalLesson && (
        <ExternalLinkDialog
          open={true}
          onOpenChange={(open: boolean) => {
            if (!open) setOpenDialog({ type: null, lessonId: null });
          }}
          lectureTitle={currentExternalLesson.title || "External Resource"}
          lectureDescription={currentExternalLesson.description || ""}
          externalUrl={currentExternalLesson.fileUrl || "#"}
        />
      )}

    </div>
  );
};

export default PlayCourse;