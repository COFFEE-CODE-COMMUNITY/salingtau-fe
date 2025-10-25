import { Share2, Send } from "lucide-react";
import { LiveChatBubble } from "../components/LiveChatBubble.tsx";
import { useState } from "react";

export default function LivestreamPlayer() {
  // Contoh array of chat dari backend
  const [chatMessages] = useState([
    {
      id: 1,
      name: "Jane Smith",
      message: "This is awesome! Can't wait to see the final result.",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Andi Pratama",
      message: "Thanks for streaming! Very helpful.",
      avatar:
        "https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?q=80&w=2574&auto=format&fit=crop",
      isSelf: true,
    },
    {
      id: 3,
      name: "Emily White",
      message: "Could you explain the part about React hooks again?",
      avatar:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=2574&auto=format&fit=crop",
    },
  ]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* === LEFT: VIDEO + DETAILS === */}
      <div className="flex-1 flex flex-col">
        <div className="bg-black aspect-video flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1516975069153-cab7de853922?q=80&w=2592&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Live Stream Thumbnail"
          />
        </div>

        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Live Coding Session: Building a Web App with React
              </h1>
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  LIVE
                </span>
                <span>3,452 viewers</span>
                <span>•</span>
                <span>Started 45 minutes ago</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop"
                alt="Streamer Avatar"
              />
              <div>
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">120k subscribers</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h3 className="font-semibold mb-2">About this stream:</h3>
          <p className="text-sm text-gray-600">
            Join me in this live session where we'll build a complete web
            application from scratch using React, Node.js, and Tailwind CSS.
            Ask your questions in the live chat!
          </p>
        </div>
      </div>

      {/* === RIGHT: LIVE CHAT === */}
      <div className="w-full lg:w-96 flex flex-col bg-white border-l border-gray-200 h-full">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900">Live Chat</h3>
        </div>

        {/* Render chat dari array */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
          {chatMessages.map((chat) => (
            <LiveChatBubble
              key={chat.id}
              name={chat.name}
              message={chat.message}
              avatar={chat.avatar}
              isSelf={chat.isSelf}
            />
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-200 mt-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Say something..."
              className="w-full pl-4 pr-12 py-2.5 text-sm border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
