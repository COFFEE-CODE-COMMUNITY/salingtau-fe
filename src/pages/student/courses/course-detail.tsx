import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Tag,
  PlayCircle,
  FileText,
  Folder,
  CheckCircle,
  Clock,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import CourseReviewsSection from "@/components/ui/course-review-section.tsx";
import CircularProgressBar from "@/components/ui/circular-progress-bar.tsx";
import api from "@/services/api.ts";
import { useUser } from "@/utils/user-context.tsx";
import type { CreateTransactionDto, CreateTransactionResponseDto } from "@/types/transaction.types";
import { validateTransactionData } from "@/utils/validation";
import { useCourseDetail } from "@/services/courseDetail.ts";
import { getCourseThumbnailUrl, getProfilePictureUrl } from "@/utils/imageUtils";
import { purchaseStatusRating } from "@/services/purchaseStatusRating.ts";

// Helper function untuk menghitung progress percentage
const calculateProgress = (watchedDuration: number, totalDuration: number): number => {
  if (totalDuration === 0) return 0;
  return Math.round((watchedDuration / totalDuration) * 100);
};

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const { course: courseData, loading, error } = useCourseDetail(courseId);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(true);

  useEffect(() => {
    // Auto expand first section when course data is loaded
    if (courseData?.sections?.[0]) {
      setExpandedSections([courseData.sections[0].id]);
    }
  }, [courseData])

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = "Mid-client-exZEx6snQpPP_ffB"
    const script = document.createElement("script")
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, []);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!courseId || !user?.id) {
        setIsPurchaseLoading(false);
        return;
      }

      try {
        setIsPurchaseLoading(true);
        const status = await purchaseStatusRating(courseId);
        setIsPurchased(status === true || status?.isPurchased === true);
      } catch (error) {
        setIsPurchased(false);
      } finally {
        setIsPurchaseLoading(false);
      }
    };

    checkPurchaseStatus();
  }, [courseId, user?.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const expandAllSections = () => {
    if (courseData?.sections) {
      setExpandedSections(courseData.sections.map((s: any) => s.id));
    }
  };

  const checkout = async () => {
    if (!user?.id || !courseId || !courseData) {
      alert("Unable to proceed with checkout. Please try again.");
      return;
    }

    setIsCheckingOut(true);

    try {
      const requestData: CreateTransactionDto = {
        userId: user.id,
        courseId: courseId,
        amount: 1,
        currency: "IDR"
      };

      const validation = validateTransactionData(requestData);
      if (!validation.isValid) {
        alert(validation.error || "Invalid transaction data");
        setIsCheckingOut(false);
        return;
      }

      // Send request ke backend
      const res = await api.post<CreateTransactionResponseDto>("/transaction/token", requestData, {
        withCredentials: true
      });

      // Response structure: { transactionId, snapToken, redirectUrl }
      const { snapToken, redirectUrl } = res.data;

      // Open Midtrans Snap payment page
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function(result: any) {
            console.log("Payment success:", result);
            // Redirect ke halaman sukses atau my-course
            navigate("/dashboard/student/my-course");
          },
          onPending: function(result: any) {
            console.log("Payment pending:", result);
            // Redirect ke halaman history untuk cek status
            navigate("/dashboard/student/history");
          },
          onError: function(result: any) {
            console.error("Payment error:", result);
            alert("Payment failed. Please try again.");
          },
          onClose: function() {
            setIsCheckingOut(false);
          }
        });
      } else {
        window.location.href = redirectUrl;
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to process checkout. Please try again.");
      setIsCheckingOut(false);
    }
  }

  const getLectureIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle size={18} className="text-blue-600" />;
      case "article":
        return <FileText size={18} className="text-green-600" />;
      case "file":
        return <Folder size={18} className="text-yellow-600" />;
      default:
        return <PlayCircle size={18} className="text-gray-600" />;
    }
  };

  if (loading || isPurchaseLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-red-600 text-base sm:text-lg mb-2">Error loading course</p>
          <p className="text-gray-600 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Responsif Height */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-900">
        <img
          src={getCourseThumbnailUrl(courseData.thumbnail)}
          alt={courseData.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 -mt-32 sm:-mt-48 md:-mt-56 lg:-mt-64 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            {/* Title & Meta */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">
                {courseData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={getProfilePictureUrl(courseData.instructor.profilePictures)}
                    alt={`${courseData.instructor.firstName} ${courseData.instructor.lastName}`}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full ring-2 ring-gray-100"
                  />
                  <span className="text-gray-700 text-xs sm:text-sm">
                    {courseData.instructor.firstName} {courseData.instructor.lastName}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm">
                <Tag size={12} className="sm:w-3.5 sm:h-3.5" />
                {courseData.category?.name || "Uncategorized"}
              </div>
            </div>

            {/* Description (Expandable Markdown) */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 mb-4 sm:mb-6 relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Description</h2>
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 active:text-blue-800 text-xs sm:text-sm font-medium transition touch-manipulation"
                >
                  {isDescriptionExpanded ? (
                    <>
                      <ChevronUp size={16} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Show More</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div
                  className={`prose prose-sm max-w-none overflow-hidden transition-all duration-300 text-xs sm:text-sm ${
                    isDescriptionExpanded ? "max-h-full" : "max-h-32 sm:max-h-40"
                  }`}
                >
                  <ReactMarkdown>{courseData.description}</ReactMarkdown>
                </div>

                {!isDescriptionExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Course Content</h2>
                <button
                  onClick={expandAllSections}
                  className="text-blue-600 hover:text-blue-700 active:text-blue-800 text-xs sm:text-sm font-medium transition touch-manipulation"
                >
                  Expand all sections
                </button>
              </div>

              <div className="text-xs sm:text-sm text-gray-600 mb-4">
                {courseData.sections?.length || 0} sections • {courseData.totalDuration || "N/A"} total length
              </div>

              <div className="space-y-2">
                {courseData.sections?.map((section: any) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        {expandedSections.includes(section.id) ? (
                          <ChevronUp size={18} className="text-gray-600 flex-shrink-0 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-600 flex-shrink-0 sm:w-5 sm:h-5" />
                        )}
                        <span className="font-medium text-sm sm:text-base text-gray-900 text-left break-words">
                          {section.title}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 ml-2 flex-shrink-0">
                        {section.lectures?.length || 0} lectures
                      </span>
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="bg-white">
                        {section.lectures?.map((lecture: any) => {
                          const progress = calculateProgress(
                            lecture.watchedDuration,
                            lecture.duration
                          );

                          return (
                            <div
                              key={lecture.id}
                              className="flex items-center justify-between p-3 sm:p-4 border-t border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                            >
                              {isPurchased ? (
                                <Link
                                  to={`/dashboard/student/course/play/${courseId}`}
                                  className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 touch-manipulation"
                                >
                                  {getLectureIcon(lecture.type)}
                                  <span className="text-xs sm:text-sm text-gray-700 truncate">{lecture.title}</span>
                                </Link>
                              ) : (
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 cursor-not-allowed opacity-60">
                                  {getLectureIcon(lecture.type)}
                                  <span className="text-xs sm:text-sm text-gray-700 truncate">{lecture.title}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
                                {isPurchased ? (
                                  lecture.completed ? (
                                    <CheckCircle size={16} className="text-green-600 sm:w-4 sm:h-4" />
                                  ) : (
                                    <CircularProgressBar value={progress} size={16} strokeWidth={2} />
                                  )
                                ) : (
                                  <Clock size={16} className="text-gray-400 sm:w-4 sm:h-4" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Student Reviews */}
            <CourseReviewsSection
              courseId={courseData.id}
            />
          </div>

          {/* SIDEBAR - Price Card (Conditional) */}
          <div className="lg:col-span-1">
            {!isPurchased && (
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 sticky top-4">
                <img
                  src={getCourseThumbnailUrl(courseData.thumbnail)}
                  alt={courseData.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg mb-3 sm:mb-4 hover:scale-[1.02] transition-transform duration-300"
                />

                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {courseData.price === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `Rp ${courseData.price.toLocaleString("id-ID")}`
                  )}
                </div>

                {/* ✅ Tombol Checkout dengan Midtrans Snap */}
                <button
                  onClick={() => {
                    if (courseData.price === 0) {
                      alert("Kursus gratis — langsung terdaftar!");
                    } else {
                      checkout();
                    }
                  }}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-medium text-sm sm:text-base mb-3 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98] touch-manipulation"
                >
                  {isCheckingOut ? "Processing..." : (courseData.price === 0 ? "Enroll Now" : "Buy Now")}
                </button>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5 sm:gap-2">
                      <Clock size={14} className="sm:w-4 sm:h-4" />
                      Duration
                    </span>
                    <span className="font-medium text-gray-900">{courseData.totalDuration || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5 sm:gap-2">
                      <Star size={14} className="sm:w-4 sm:h-4" />
                      Rating
                    </span>
                    <span className="font-medium text-gray-900">{courseData.averageRating} / 5.0</span>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Instructor</h3>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <img
                      src={getProfilePictureUrl(courseData.instructor.profilePictures)}
                      alt={`${courseData.instructor.firstName} ${courseData.instructor.lastName}`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-gray-100 hover:ring-blue-300 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base text-gray-900 truncate">
                        {courseData.instructor.firstName} {courseData.instructor.lastName}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{courseData.instructor.headline}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;