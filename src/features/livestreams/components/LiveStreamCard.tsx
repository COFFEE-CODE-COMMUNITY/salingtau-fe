import { Link } from "react-router-dom";

export type LiveStream = {
  thumbnail: string;
  title: string;
  streamer: string;
  viewers: string;
};

export const LiveStreamCard = ({ stream }: { stream: LiveStream }) => {
  return (
    <Link
      to="/livestream/player"
      className="block bg-white rounded-xl shadow-md overflow-hidden group"
    >
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src={stream.thumbnail}
          alt={stream.title}
        />
        {/* LIVE badge */}
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          LIVE
        </div>
        {/* Viewers badge */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {stream.viewers} viewers
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600">
          {stream.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{stream.streamer}</p>
      </div>
    </Link>
  );
};
