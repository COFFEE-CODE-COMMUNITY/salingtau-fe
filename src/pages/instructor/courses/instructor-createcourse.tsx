import React, { useState } from "react"
import { UploadCloud, Plus, Trash2 } from "lucide-react"
import { useUploadCourse } from "@/services/uploadCourse.ts";
import { useNavigate } from "react-router-dom";

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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition duration-150 ease-in-out
          ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="space-y-2 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={`file-upload-${label}`}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
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
          {currentFile && (
            <p className="text-sm font-medium text-gray-900 mt-2">
              File selected: <span className="text-blue-600">{currentFile.name}</span>
              <button
                type="button"
                onClick={() => onFileChange(null)}
                className="ml-2 text-red-500 hover:text-red-700 text-xs"
              >
                (Remove)
              </button>
            </p>
          )}
        </div>
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
      setMetadata((prev) => ({
        ...prev,
        category: { name: value },
      }));
    } else if (name === "price") {
      setMetadata((prev) => ({
        ...prev,
        price: parseFloat(value) || 0,
      }));
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
      videos: [{
        id: `${Date.now()}-1`,
        title: '',
        file: null
      }]
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
    setSections(sections.map(s =>
      s.id === sectionId ? { ...s, name } : s
    ));
  };

  const addVideoToSection = (sectionId: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          videos: [...s.videos, {
            id: `${Date.now()}-${s.videos.length + 1}`,
            title: '',
            file: null
          }]
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
        return {
          ...s,
          videos: s.videos.filter(v => v.id !== videoId)
        };
      }
      return s;
    }));
  };

  const updateVideoTitle = (sectionId: string, videoId: string, title: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          videos: s.videos.map(v =>
            v.id === videoId ? { ...v, title } : v
          )
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
          videos: s.videos.map(v =>
            v.id === videoId ? { ...v, file } : v
          )
        };
      }
      return s;
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!metadata.title || !metadata.category.name) {
      alert("Please fill in all required fields (Title and Category).");
      return;
    }

    if (!metadata.description) {
      alert("Please provide a course description.");
      return;
    }

    if (!thumbnail) {
      alert("Please upload a course thumbnail.");
      return;
    }

    // Validate sections and videos
    for (const section of sections) {
      if (!section.name.trim()) {
        alert(`Section name cannot be empty`);
        return;
      }

      for (const video of section.videos) {
        if (!video.title.trim()) {
          alert(`Please fill in all video titles in ${section.name}`);
          return;
        }
        if (!video.file) {
          alert(`Please upload all videos in ${section.name}`);
          return;
        }
      }
    }

    setIsUploading(true);

    try {
      console.log("Starting course upload...");
      console.log("Sections:", sections);

      // Note: You'll need to modify your uploadCourse service to handle multiple sections and videos
      // For now, this is a placeholder showing the structure
      alert("Upload functionality needs to be implemented in the backend to handle multiple sections and videos");

      // const course = await uploadCourse({
      //   title: metadata.title,
      //   description: metadata.description,
      //   language: metadata.language,
      //   price: metadata.price,
      //   category: metadata.category,
      //   thumbnail: thumbnail,
      //   sections: sections, // This will contain all sections with their videos
      // });

      // console.log("✅ Course created successfully:", course);
      // alert(`Course "${metadata.title}" created successfully!`);
      // navigate("/dashboard/instructor");
    } catch (error: any) {
      console.error("❌ Error creating course:", error);
      alert(`Failed to create course: ${error.response?.data?.message || error.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Course</h2>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Course</h1>
          <p className="text-gray-600">Fill in the details below to create your course</p>
        </div>

        <div className="space-y-6">
          {/* Course Metadata Section */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">Course Information</h2>

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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Introduction to Web Development"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Learn the fundamentals of web development including HTML, CSS, and JavaScript..."
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  id="category"
                  value={metadata.category.name}
                  onChange={handleMetadataChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categoriesData.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  name="language"
                  id="language"
                  value={metadata.language}
                  onChange={handleMetadataChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languagesData.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (Rupiah) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={metadata.price}
                    onChange={handleMetadataChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Set to 0 for a free course</p>
              </div>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">Course Thumbnail</h2>
            <FileUpload
              label="Course Thumbnail"
              onFileChange={handleThumbnailChange}
              currentFile={thumbnail}
              accept="image/*"
              description="PNG, JPG or WEBP (MAX. 2MB)"
            />
          </div>

          {/* Course Sections with Videos */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6 pb-3 border-b">
              <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>

            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => updateSectionName(section.id, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                      placeholder="Section Name"
                    />
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Remove Section"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {section.videos.map((video) => (
                      <div key={video.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Video Title <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => updateVideoTitle(section.id, video.id, e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Introduction to HTML"
                            />
                          </div>
                          {section.videos.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVideoFromSection(section.id, video.id)}
                              className="mt-7 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Remove Video"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="mt-1">
                          <div
                            className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400 transition"
                          >
                            <div className="space-y-2 text-center">
                              <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor={`video-upload-${section.id}-${video.id}`}
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                                >
                                  <span>Upload video</span>
                                  <input
                                    id={`video-upload-${section.id}-${video.id}`}
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        updateVideoFile(section.id, video.id, e.target.files[0]);
                                      }
                                    }}
                                    accept="video/*"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">MP4, WEBM or AVI (MAX. 100MB)</p>
                              {video.file && (
                                <p className="text-sm font-medium text-gray-900 mt-2">
                                  File: <span className="text-blue-600">{video.file.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateVideoFile(section.id, video.id, null)}
                                    className="ml-2 text-red-500 hover:text-red-700 text-xs"
                                  >
                                    (Remove)
                                  </button>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addVideoToSection(section.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
                    >
                      <Plus className="w-4 h-4" />
                      Add Video to {section.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/instructor/courses")}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isUploading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Create Course"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}