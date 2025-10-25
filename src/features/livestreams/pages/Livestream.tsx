import { Calendar } from "lucide-react";
import SearchBar from "../../../globals/components/SearchBar.tsx";
import { LiveStreamCard, LiveStream } from "../components/LiveStreamCard.tsx";

export default function Livestream() {
  const liveStreams: LiveStream[] = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1516975069153-cab7de853922?q=80&w=2592&auto=format&fit=crop",
      title: "Live Coding: Building a Web App with React",
      streamer: "John Doe",
      viewers: "3.4k",
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2670&auto=format&fit=crop",
      title: "UI/UX Design Review Session",
      streamer: "Jane Smith",
      viewers: "1.8k",
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">Live Streams</h2>
          {SearchBar("Search live...", "relative")}
        </div>
      </header>

      {/* Body */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Happening Now
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {liveStreams.map((stream, index) => (
            <LiveStreamCard key={index} stream={stream} />
          ))}

          {/* Next Stream Placeholder */}
          <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 group flex items-center justify-center text-center">
            <div className="p-4">
              <div className="mx-auto bg-white rounded-full p-3 w-16 h-16">
                <Calendar className="w-full h-full text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-600 mt-4">
                Next stream starts in 2 hours
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Q&A with Michael Brown
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
