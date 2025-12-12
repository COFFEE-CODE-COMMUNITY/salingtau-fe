import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Edit2, Trash2 } from "lucide-react";
import ReviewCard from "./review-card.tsx";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { SortByReview } from "@/components/ui/sort-by-review.tsx";
import { purchaseStatusRating } from "@/services/purchaseStatusRating.ts";
import api from "@/services/api.ts";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface CourseReviewsSectionProps {
  courseId: string;
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const PAGE_SIZE = 5;

const CourseReviewsSection = ({
                                courseId,
                                averageRating,
                                totalRatings,
                                ratingDistribution,
                              }: CourseReviewsSectionProps) => {
  const [sortOrder, setSortOrder] = useState("descending");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isCheckingPurchase, setIsCheckingPurchase] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [otherReviews, setOtherReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Rating form states
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Check purchase status
  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const purchaseStatus = await purchaseStatusRating(courseId);
        setHasPurchased(purchaseStatus);
      } catch (error) {
        console.error("Error checking purchase status:", error);
      } finally {
        setIsCheckingPurchase(false);
      }
    };

    checkPurchase();
  }, [courseId]);

  // Fetch reviews (user and others)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await api.get(`/rating/${courseId}`, {
          withCredentials: true
        });

        if (response.data) {
          // Set user review if exists
          if (response.data.userReview) {
            setUserReview(response.data.userReview);
            setSelectedRating(response.data.userReview.rating);
            setReviewComment(response.data.userReview.comment);
          }

          // Set other reviews
          if (response.data.otherReviews) {
            setOtherReviews(response.data.otherReviews);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  // Submit or update review
  const handleSubmitReview = async () => {
    if (selectedRating === 0) {
      setSubmitError("Please select a rating");
      return;
    }

    if (!reviewComment.trim()) {
      setSubmitError("Please write a review");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        rating: selectedRating,
        comment: reviewComment.trim()
      };

      if (userReview) {
        // Update existing review
        await api.patch(`/rating/${courseId}`, payload, {
          withCredentials: true
        });
      } else {
        // Create new review
        const result = await api.post(`/rating/${courseId}`, payload, {
          withCredentials: true
        });

        console.log(result);
      }

      // Refresh the page or update state
      alert(userReview ? "Review updated successfully!" : "Review submitted successfully!");
      window.location.reload();
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete review
  const handleDeleteReview = async () => {
    if (!confirm("Are you sure you want to delete your review?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      await api.delete(`/rating/${courseId}`, {
        withCredentials: true
      });

      alert("Review deleted successfully!");
      window.location.reload();
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || "Failed to delete review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    if (userReview) {
      setSelectedRating(userReview.rating);
      setReviewComment(userReview.comment);
    }
    setIsEditMode(false);
    setSubmitError("");
  };

  // Sort other reviews
  const processedReviews = useMemo(() => {
    const sorted = [...otherReviews];

    sorted.sort((a, b) => {
      const compareValue = a.rating - b.rating;
      return sortOrder === "ascending" ? compareValue : -compareValue;
    });

    return sorted;
  }, [otherReviews, sortOrder]);

  const [displayedReviews, setDisplayedReviews] = useState(
    processedReviews.slice(0, PAGE_SIZE)
  );
  const [hasMore, setHasMore] = useState(processedReviews.length > PAGE_SIZE);

  useEffect(() => {
    setDisplayedReviews(processedReviews.slice(0, PAGE_SIZE));
    setHasMore(processedReviews.length > PAGE_SIZE);
  }, [processedReviews]);

  const showMoreReviews = () => {
    const nextReviews = processedReviews.slice(
      displayedReviews.length,
      displayedReviews.length + PAGE_SIZE
    );
    setDisplayedReviews((prev) => [...prev, ...nextReviews]);

    if (displayedReviews.length + PAGE_SIZE >= processedReviews.length) {
      setHasMore(false);
    }
  };

  const getRatingPercentage = (count: number) => {
    return totalRatings > 0 ? (count / totalRatings) * 100 : 0;
  };

  const handleSortChange = (_newSortBy: string, newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Student Reviews</h2>

      {/* Rating Form - Only show if user has purchased */}
      {!isCheckingPurchase && hasPurchased && (
        <div className="mb-8 p-6 border-2 border-gray-200 rounded-lg">
          {userReview && !isEditMode ? (
            // Display existing review
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Review</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteReview}
                    disabled={isSubmitting}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <StarRating initialRating={userReview.rating} readonly={true} size={24} />
              </div>
              <p className="text-gray-700">{userReview.comment}</p>
            </div>
          ) : (
            // Rating form (for new review or edit mode)
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {userReview ? "Edit Your Review" : "Rate This Course"}
              </h3>

              {/* Star Rating */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your rating</p>
                <StarRating
                  initialRating={selectedRating}
                  readonly={false}
                  size={32}
                  onRatingChange={(rating) => {
                    setSelectedRating(rating);
                    setSubmitError("");
                  }}
                />
              </div>

              {/* Comment Textarea */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your review</p>
                <textarea
                  value={reviewComment}
                  onChange={(e) => {
                    setReviewComment(e.target.value);
                    setSubmitError("");
                  }}
                  placeholder="Share your experience with this course..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{submitError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : userReview ? "Update Review" : "Submit Review"}
                </button>
                {userReview && isEditMode && (
                  <button
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rating Overview */}
      <div className="grid grid-cols-[30%_70%] gap-1 mb-8">
        {/* Left: Average Rating */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="mb-2">
            <StarRating
              initialRating={averageRating}
              readonly={true}
              size={20}
            />
          </div>
          <p className="text-sm text-gray-600">Course Rating</p>
        </div>

        {/* Right: Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full transition-all duration-300"
                  style={{
                    width: `${getRatingPercentage(
                      ratingDistribution[rating as keyof typeof ratingDistribution]
                    )}%`,
                  }}
                />
              </div>
              <div className="min-w-[100px]">
                <StarRating
                  initialRating={rating}
                  readonly={true}
                  size={14}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Only */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">Reviews from Other Students</p>
        <SortByReview onSortChange={handleSortChange} />
      </div>

      {/* Reviews List - Only Other Reviews */}
      {isLoadingReviews ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No other reviews available yet
            </p>
          )}
        </div>
      )}

      {/* Show More Button */}
      {hasMore && displayedReviews.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={showMoreReviews}
            className="inline-flex items-center gap-2 px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Show more ratings
            <ChevronDown size={18} />
          </button>
        </div>
      )}

      {/* No more reviews message */}
      {!hasMore && displayedReviews.length > 0 && processedReviews.length > PAGE_SIZE && (
        <p className="text-center text-gray-500 text-sm mt-6">
          You've reached the end of reviews
        </p>
      )}
    </div>
  );
};

export default CourseReviewsSection;