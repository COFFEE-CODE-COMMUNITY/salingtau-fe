import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import ReviewCard from "./review-card.tsx";
import { StarRating } from "@/components/ui/star-rating.tsx";
import { SortByReview, FilterReview } from "@/components/ui/sort-by-review.tsx";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface CourseReviewsSectionProps {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

const PAGE_SIZE = 5;

const CourseReviewsSection = ({
                                averageRating,
                                totalRatings,
                                ratingDistribution,
                                reviews: initialReviews,
                              }: CourseReviewsSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("descending");

  // Filter and sort reviews
  const processedReviews = useMemo(() => {
    let filtered = [...initialReviews];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (review) =>
          review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting by rating only
    filtered.sort((a, b) => {
      const compareValue = a.rating - b.rating;
      return sortOrder === "ascending" ? compareValue : -compareValue;
    });

    return filtered;
  }, [initialReviews, searchQuery, sortOrder]);

  const [displayedReviews, setDisplayedReviews] = useState(
    processedReviews.slice(0, PAGE_SIZE)
  );
  const [hasMore, setHasMore] = useState(processedReviews.length > PAGE_SIZE);

  // Reset displayed reviews when filters/sort changes
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

      {/* Search and Filter */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-900 mb-3">Review</p>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <FilterReview />
          <SortByReview onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No reviews found matching your criteria
          </p>
        )}
      </div>

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