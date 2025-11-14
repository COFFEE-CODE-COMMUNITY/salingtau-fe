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
import { sampleRatingDistribution, sampleReviews } from "@/utils/reviewData.ts";
import CircularProgressBar from "@/components/ui/circular-progress-bar.tsx";
import api from "@/services/api.ts";
import { useUser } from "@/utils/user-context.tsx";
import type { CreateTransactionDto, CreateTransactionResponseDto } from "@/types/transaction.types";
import { validateTransactionData } from "@/utils/validation";
import { useCourseDetail } from "@/services/courseDetail.ts";

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

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
      console.error("Missing required data for checkout");
      alert("Unable to proceed with checkout. Please try again.");
      return;
    }

    setIsCheckingOut(true);

    try {
      // Prepare data sesuai CreateTransactionDto
      const requestData: CreateTransactionDto = {
        userId: user.id,
        courseId: courseId,
        amount: 1,
        currency: "IDR"
      };

      // Validate data sesuai dengan backend DTO validation
      const validation = validateTransactionData(requestData);
      if (!validation.isValid) {
        console.error("Validation failed:", validation.error);
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
            console.log("Payment popup closed");
            setIsCheckingOut(false);
          }
        });
      } else {
        // Fallback: redirect to Midtrans payment page
        window.location.href = redirectUrl;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error loading course</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={courseData.thumbnail?.url || "/placeholder-course.jpg"}
          alt={courseData.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-64 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            {/* Title & Meta */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseData.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="font-semibold">{courseData.averageRating}</span>
                  <span className="text-gray-500">({courseData.totalReviews} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={courseData.instructor.profilePictures?.[0]?.url || "/fallback-avatar.jpg"}
                    alt={`${courseData.instructor.firstName} ${courseData.instructor.lastName}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-700">
                    {courseData.instructor.firstName} {courseData.instructor.lastName}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                <Tag size={14} />
                {courseData.category?.name || "Uncategorized"}
              </div>
            </div>

            {/* Description (Expandable Markdown) */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {isDescriptionExpanded ? (
                    <>
                      <ChevronUp size={18} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} />
                      Show More
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <div
                  className={`prose prose-sm max-w-none overflow-hidden transition-all duration-300 ${
                    isDescriptionExpanded ? "max-h-full" : "max-h-40"
                  }`}
                >
                  <ReactMarkdown>{courseData.description}</ReactMarkdown>
                </div>

                {!isDescriptionExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
                <button
                  onClick={expandAllSections}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Expand all sections
                </button>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                {courseData.sections?.length || 0} sections • {courseData.totalDuration || "N/A"} total length
              </div>

              <div className="space-y-2">
                {courseData.sections?.map((section: any) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {expandedSections.includes(section.id) ? (
                          <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600" />
                        )}
                        <span className="font-medium text-gray-900">{section.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
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
                              className="flex items-center justify-between p-4 border-t border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              <Link
                                to={`/dashboard/student/course/play/${courseId}`}
                                className="flex items-center gap-3"
                              >
                                {getLectureIcon(lecture.type)}
                                <span className="text-gray-700">{lecture.title}</span>
                              </Link>
                              <div className="flex items-center gap-3">
                                {lecture.duration !== 0 && (
                                  <span className="text-sm text-gray-500">
                                    {formatDuration(lecture.duration)}
                                  </span>
                                )}
                                {lecture.completed ? (
                                  <CheckCircle size={18} className="text-green-600" />
                                ) : (
                                  <CircularProgressBar value={progress} size={18} strokeWidth={2} />
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
              averageRating={courseData.averageRating}
              totalRatings={courseData.totalReviews}
              ratingDistribution={sampleRatingDistribution}
              reviews={sampleReviews}
            />
          </div>

          {/* SIDEBAR - Price Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <img
                src={courseData.thumbnail?.url || "/placeholder-course.jpg"}
                alt={courseData.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="text-3xl font-bold text-gray-900 mb-4">
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
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? "Processing..." : (courseData.price === 0 ? "Enroll Now" : "Buy Now")}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock size={16} />
                    Duration
                  </span>
                  <span className="font-medium text-gray-900">{courseData.totalDuration || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Star size={16} />
                    Rating
                  </span>
                  <span className="font-medium text-gray-900">{courseData.averageRating} / 5.0</span>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Instructor</h3>
                <div className="flex items-start gap-3">
                  <img
                    src={courseData.instructor.profilePictures?.[0]?.url || "/fallback-avatar.jpg"}
                    alt={`${courseData.instructor.firstName} ${courseData.instructor.lastName}`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {courseData.instructor.firstName} {courseData.instructor.lastName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{courseData.instructor.headline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
