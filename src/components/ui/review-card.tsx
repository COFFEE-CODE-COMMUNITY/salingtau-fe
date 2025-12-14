import { StarRating } from "@/components/ui/star-rating";

interface ProfilePicture {
  path: string;
  width: number;
  height: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePictures: ProfilePicture[] | undefined;
}

interface ReviewCardProps {
  id: string;
  user: User;
  rating: number;
  createdAt: Date;
  comment: string;
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const buildImageUrl = (path?: string) => {
  if (!path) return undefined;
  console.log(`${IMAGE_BASE_URL}${path}`)
  return `${IMAGE_BASE_URL}${path}`;
};

const ReviewCard = ({
                      user,
                      rating,
                      createdAt,
                      comment,
                    }: ReviewCardProps) => {
  // Ambil avatar ukuran kecil
  const avatar =
    user.profilePictures?.find(p => p.width === 128) ??
    user.profilePictures?.[0];

  const avatarUrl =
    buildImageUrl(avatar?.path) ?? "/default-avatar.png";

  const userName = `${user.firstName} ${user.lastName}`;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* User Info */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={avatarUrl}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-900">{userName}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating
              initialRating={rating}
              readonly
              size={14}
            />
            <span className="text-xs text-gray-500">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {comment}
      </p>
    </div>
  );
};

export default ReviewCard;
