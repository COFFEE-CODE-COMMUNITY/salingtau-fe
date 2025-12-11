import React, { useState } from "react"
import { UploadCloud, Plus, Trash2, FileVideo } from "lucide-react"
import { useUploadCourse } from "@/services/uploadCourse.ts";
import { useNavigate } from "react-router-dom";

// Data Categories & Languages
const categoriesData = [
  { name: "Web Development" },
  { name: "Mobile Development" },
  { name: "Data Science" },
  { name: "UI/UX Design" },
  { name: "Machine Learning" },
  { name: "DevOps" },
]

const languagesData = [
  { code: "en-US", name: "English (US)" },
  { code: "id-ID", name: "Indonesian" },
]

interface CourseMetadata {
  title: string;
  description: string;
  language: string;
  price: number;
  category: {
    name: string;
  };
}

interface VideoItem {
  id: string;
  title: string;
  file: File | null;
}

interface Section {
  id: string;
  name: string;
  videos: VideoItem[];
}

interface FileUploadProps {
  label: string;
  onFileChange: (file: File | null) => void;
  currentFile: File | null;
  accept: string;
  description: string;
}

// Komponen FileUpload yang sudah dipercantik
const FileUpload: React.FC<FileUploadProps> = ({ label, onFileChange, currentFile, accept, description }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div
        className={`group relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out cursor-pointer
          ${isDragOver 
            ? "border-blue-500 bg-blue-50 ring-4 ring-blue-100" 
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="space-y-2 text-center pointer-events-none">
          <UploadCloud className={`mx-auto h-12 w-12 transition-colors duration-200 ${isDragOver ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400"}`} />
          <div className="flex text-sm text-gray-600 justify-center">
            <label
              htmlFor={`file-upload-${label}`}
              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none pointer-events-auto"
            >
              <span>Upload a file</span>
              <input
                id={`file-upload-${label}`}
                name={`file-upload-${label}`}
                type="file"
                className="sr-only"
                onChange={handleChange}
                accept={accept}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
        </div>

        {/* Tampilan File Terpilih */}
        {currentFile && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl border-2 border-green-500 transition-all">
             <div className="flex items-center gap-2 text-green-600 mb-2">
                <UploadCloud className="w-6 h-6" />
                <span className="font-semibold text-sm">File Selected</span>
             </div>
             <p className="text-sm font-medium text-gray-900 truncate max-w-[80%] px-2">
                {currentFile.name}
             </p>
             <button
               type="button"
               onClick={(e) => { e.preventDefault(); onFileChange(null); }}
               className="mt-3 px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full hover:bg-red-100 transition border border-red-200 pointer-events-auto"
             >
               Remove File
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CreateCourse() {
  const navigate = useNavigate();
  useUploadCourse();
  const [metadata, setMetadata] = useState<CourseMetadata>({
    title: "",
    description: "",
    language: "id-ID",
    price: 75000,
    category: {
      name: "",
    },
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      name: 'Section 1',
      videos: [
        {
          id: '1-1',
          title: '',
          file: null
        }
      ]
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "category") {
      setMetadata((prev) => ({ ...prev, category: { name: value } }));
    } else if (name === "price") {
      setMetadata((prev) => ({ ...prev, price: parseFloat(value) || 0 }));
    } else {
      setMetadata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnail(file);
  };

  const addSection = () => {
    const newSectionNumber = sections.length + 1;
    setSections([...sections, {
      id: Date.now().toString(),
      name: `Section ${newSectionNumber}`,
      videos: [{ id: `${Date.now()}-1`, title: '', file: null }]
    }]);
  };

  const removeSection = (sectionId: string) => {
    if (sections.length === 1) {
      alert("Harus ada minimal satu section");
      return;
    }
    setSections(sections.filter(s => s.id !== sectionId));
  };

  const updateSectionName = (sectionId: string, name: string) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, name } : s));
  };

  const addVideoToSection = (sectionId: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          videos: [...s.videos, { id: `${Date.now()}-${s.videos.length + 1}`, title: '', file: null }]
        };
      }
      return s;
    }));
  };

  const removeVideoFromSection = (sectionId: string, videoId: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        if (s.videos.length === 1) {
          alert("Harus ada minimal satu video per section");
          return s;
        }
        return { ...s, videos: s.videos.filter(v => v.id !== videoId) };
      }
      return s;
    }));
  };

  const updateVideoTitle = (sectionId: string, videoId: string, title: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          videos: s.videos.map(v => v.id === videoId ? { ...v, title } : v)
        };
      }
      return s;
    }));
  };

  const updateVideoFile = (sectionId: string, videoId: string, file: File | null) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          videos: s.videos.map(v => v.id === videoId ? { ...v, file } : v)
        };
      }
      return s;
    }));
  };

  const handleSubmit = async () => {
    if (!metadata.title || !metadata.category.name) { alert("Please fill in all required fields (Title and Category)."); return; }
    if (!metadata.description) { alert("Please provide a course description."); return; }
    if (!thumbnail) { alert("Please upload a course thumbnail."); return; }
    for (const section of sections) {
      if (!section.name.trim()) { alert(`Section name cannot be empty`); return; }
      for (const video of section.videos) {
        if (!video.title.trim()) { alert(`Please fill in all video titles in ${section.name}`); return; }
        if (!video.file) { alert(`Please upload all videos in ${section.name}`); return; }
      }
    }
    setIsUploading(true);
    try {
      console.log("Sections:", sections);
      alert("Upload functionality needs to be implemented in the backend to handle multiple sections and videos");
    } catch (error: any) {
      alert(`Failed to create course: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-20 shadow-sm border-b border-gray-200">
        <div className="h-16 flex items-center justify-between px-6 max-w-7xl mx-auto w-full">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            Create New Course
          </h2>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Course</h1>
          <p className="text-gray-600">Fill in the details below to structure your learning materials.</p>
        </div>

        <div className="space-y-8">
          {/* Course Metadata Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Course Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={metadata.title}
                  onChange={handleMetadataChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  placeholder="e.g., Ultimate ReactJS Masterclass"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={metadata.description}
                  onChange={handleMetadataChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  placeholder="What will students learn from this course?"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                    name="category"
                    id="category"
                    value={metadata.category.name}
                    onChange={handleMetadataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                    >
                    <option value="">Select a category</option>
                    {categoriesData.map((cat) => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language <span className="text-red-500">*</span>
                </label>
                 <div className="relative">
                    <select
                    name="language"
                    id="language"
                    value={metadata.language}
                    onChange={handleMetadataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                    >
                    {languagesData.map((lang) => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (Rupiah) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={metadata.price}
                    onChange={handleMetadataChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="0"
                    step="5000"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-500">Set to 0 for a free course.</p>
              </div>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
             <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Course Thumbnail
            </h2>
            <FileUpload
              label=""
              onFileChange={handleThumbnailChange}
              currentFile={thumbnail}
              accept="image/*"
              description="PNG, JPG or WEBP (MAX. 2MB)"
            />
          </div>

          {/* Course Sections with Videos */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                    Course Content
                </h2>
                <p className="text-sm text-gray-500 mt-1 ml-10">Organize your course into sections and lectures.</p>
              </div>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>

            <div className="space-y-8">
              {/* PERBAIKAN DISINI: Menghapus vIndex yang tidak terpakai */}
              {sections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-xl bg-gray-50/50 overflow-hidden">
                  {/* Section Header */}
                  <div className="p-4 bg-gray-100/80 border-b border-gray-200 flex items-start sm:items-center gap-4">
                     <div className="flex-none pt-2 sm:pt-0">
                        <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                        </div>
                     </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => updateSectionName(section.id, e.target.value)}
                        className="w-full px-0 py-1 bg-transparent border-0 border-b-2 border-transparent focus:border-blue-500 focus:ring-0 text-lg font-semibold text-gray-800 placeholder:text-gray-400 transition-all"
                        placeholder={`Name for Section ${index + 1}`}
                      />
                    </div>
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove Section"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Videos Container */}
                  <div className="p-4 sm:p-6 space-y-4">
                    {section.videos.map((video) => (
                      <div key={video.id} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                        <div className="flex flex-col sm:flex-row gap-5 items-start">
                          {/* Video Info (Left) */}
                          <div className="flex-1 w-full space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <FileVideo className="w-5 h-5"/>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                        Video Title
                                    </label>
                                    <input
                                        type="text"
                                        value={video.title}
                                        onChange={(e) => updateVideoTitle(section.id, video.id, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
                                        placeholder="e.g., Introduction to HTML"
                                    />
                                </div>
                            </div>

                            {/* Custom Mini File Upload */}
                            <div className="w-full">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                    Source File
                                </label>
                                <div className="relative flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors group cursor-pointer">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                updateVideoFile(section.id, video.id, e.target.files[0]);
                                            }
                                        }}
                                        accept="video/*"
                                    />
                                    <div className="text-center">
                                        {video.file ? (
                                             <div className="flex items-center gap-2 text-green-600">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                <span className="text-sm font-medium truncate max-w-[200px]">{video.file.name}</span>
                                                <span className="text-xs text-gray-400 ml-1">(Click to change)</span>
                                             </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <UploadCloud className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                                <span className="text-sm group-hover:text-blue-600 font-medium">Click to upload video</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {video.file && (
                                    <button
                                        type="button"
                                        onClick={() => updateVideoFile(section.id, video.id, null)}
                                        className="text-xs text-red-500 hover:text-red-700 mt-1 ml-1 font-medium"
                                    >
                                        Remove video file
                                    </button>
                                )}
                            </div>
                          </div>

                          {/* Action (Right) */}
                          {section.videos.length > 1 && (
                            <div className="pt-2">
                                <button
                                type="button"
                                onClick={() => removeVideoFromSection(section.id, video.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Video"
                                >
                                <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addVideoToSection(section.id)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Video to {section.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/instructor/courses")}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isUploading}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
              ) : (
                  <>
                   <UploadCloud className="w-5 h-5" />
                   Publish Course
                  </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}