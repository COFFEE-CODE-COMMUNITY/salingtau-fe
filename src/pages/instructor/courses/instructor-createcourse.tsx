import React, { useState } from "react"
import { UploadCloud } from "lucide-react"
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

interface CourseFiles {
  thumbnail: File | null;
  video: File | null;
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
  const { uploadCourse } = useUploadCourse();
  const [metadata, setMetadata] = useState<CourseMetadata>({
    title: "",
    description: "",
    language: "id-ID",
    price: 75000,
    category: {
      name: "",
    },
  });

  const [files, setFiles] = useState<CourseFiles>({
    thumbnail: null,
    video: null,
  });

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
    setFiles((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleVideoChange = (file: File | null) => {
    setFiles((prev) => ({ ...prev, video: file }));
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

    if (!files.thumbnail) {
      alert("Please upload a course thumbnail.");
      return;
    }

    if (!files.video) {
      alert("Please upload a course video.");
      return;
    }

    setIsUploading(true);

    try {
      console.log("Starting course upload...");
      
      const course = await uploadCourse({
        title: metadata.title,
        description: metadata.description,
        language: metadata.language,
        price: metadata.price,
        category: metadata.category,
        thumbnail: files.thumbnail,
        video: files.video,
      });

      console.log("✅ Course created successfully:", course);
      alert(`Course "${metadata.title}" created successfully!`);
      
      // Navigate to instructor courses page
      navigate("/dashboard/instructor");
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

          {/* Course Files Section */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">Course Media</h2>

            <div className="space-y-6">
              <FileUpload
                label="Course Thumbnail"
                onFileChange={handleThumbnailChange}
                currentFile={files.thumbnail}
                accept="image/*"
                description="PNG, JPG or WEBP (MAX. 2MB)"
              />

              <FileUpload
                label="Course Video"
                onFileChange={handleVideoChange}
                currentFile={files.video}
                accept="video/*"
                description="MP4, WEBM or AVI (MAX. 100MB)"
              />
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