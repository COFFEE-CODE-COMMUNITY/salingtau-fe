import { StarRating } from "@/components/ui/star-rating";

interface ReviewCardProps {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

const ReviewCard = ({ userName, userAvatar, rating, date, comment }: ReviewCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* User Info */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={userAvatar}
          alt={userName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-900">{userName}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating
              initialRating={rating}
              readonly={true}
              size={14}
            />
            <span className="text-xs text-gray-500">{date}</span>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>
    </div>
  );
};

export default ReviewCard;