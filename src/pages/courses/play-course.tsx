import { useState } from 'react';
import { PlayCircle, FileText, Code } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'document' | 'code';
}

const PlayCourse = () => {
  const [activeLesson, setActiveLesson] = useState(1);

  const lessons: Lesson[] = [
    { id: 1, title: 'What is HTML?', type: 'video' },
    { id: 2, title: 'Basic HTML Elements & Tags', type: 'document' },
    { id: 3, title: 'Getting Started with CSS', type: 'code' },
  ];

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      default:
        return <PlayCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Video Player */}
        <div className="relative w-full bg-black aspect-video">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop"
            alt="Dashboard Preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="px-10 py-8">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">
            Web Development
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            Full-Stack Web Developer Bootcamp
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Lesson 1: Introduction to HTML & CSS. In this video, we'll cover the basics of HTML and how to style it using CSS.
          </p>
        </div>

        {/* Bottom Navigation */}
        <div className="px-10 py-6 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              O
            </div>
            <div className="text-base font-semibold text-gray-900">Oji</div>
          </div>
          <button className="px-7 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Done & Continue
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto">
        <div className="px-6 py-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">List of lessons</h2>
        </div>
        <div className="py-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setActiveLesson(lesson.id)}
              className={`px-6 py-4 border-b border-gray-200 cursor-pointer transition-colors flex items-center gap-3 ${
                activeLesson === lesson.id
                  ? 'bg-blue-50 border-l-4 border-l-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className={activeLesson === lesson.id ? 'text-blue-600' : 'text-gray-600'}>
                {getLessonIcon(lesson.type)}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  activeLesson === lesson.id ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {lesson.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default PlayCourse;