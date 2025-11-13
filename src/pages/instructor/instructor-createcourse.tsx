import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Plus,
  X,
  UploadCloud,
  // ChevronDown, // Dihapus
  Video,
  FileText,
  Download,
  Link,
  // CheckCircle, // Dihapus
} from "lucide-react"

// --- ENUM (sesuai ERD) ---
enum LectureType {
  VIDEO = 'video',
  ARTICLE = 'article',
  FILE = 'file',
  EXTERNAL = 'external'
}

// --- Dummy Data (HARUS disesuaikan dengan API Anda) ---
const categoriesData = [
  { id: "e9a3a7b0-3d84-4fde-9b56-c7f7e2c9085a", name: "Web Development" },
  { id: "f2c3b8a1-b845-4b8b-851b-4f8e5d2b1f8b", name: "Mobile Development" },
  { id: "a7c8e2b4-5f8e-4a6a-8b1e-9e7f2b1d3c5a", name: "Data Science" },
  { id: "b3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f", name: "UI/UX Design" },
]

// --- Tipe Data untuk Form (DISESUAIKAN) ---
interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LectureType;
  video_file?: File | null;
  video_duration_min?: number;
  article_content?: string;
  file_asset?: File | null;
  external_url?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseFormData {
  // Step 1: Course Info
  title: string;
  description: string;
  category_id: string;
  // Step 2: Course Media
  thumbnail: File | null;
  // Step 3: Pricing
  price: number;
  isPaid: boolean;
  // Step 4: Curriculum
  curriculum: Section[];
}

// --- Komponen FileUpload (Sama seperti sebelumnya) ---
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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition duration-150 ease-in-out
          ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={`file-upload-${label}`}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload a file</span>
              <input id={`file-upload-${label}`} name={`file-upload-${label}`} type="file" className="sr-only" onChange={handleChange} accept={accept} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
          {currentFile && (
            <p className="text-sm font-medium text-gray-900 mt-2">
              File selected: <span className="text-blue-600">{currentFile.name}</span>
              <button type="button" onClick={() => onFileChange(null)} className="ml-2 text-red-500 hover:text-red-700 text-xs">(Remove)</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


// --- KOMPONEN UTAMA: CreateCourse ---
export default function CreateCourse() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category_id: "",
    thumbnail: null,
    price: 100000,
    isPaid: true,
    curriculum: [],
  });
  
  // State baru untuk menu kurikulum yang interaktif
  const [openSectionMenu, setOpenSectionMenu] = useState<string | null>(null);

  const totalSteps = 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        isPaid: checked,
        price: checked ? prev.price : 0,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validasi diperbarui: level dihilangkan
      if (!formData.title || !formData.category_id) {
        alert("Please fill in required fields for Course Info.");
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleThumbnailChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };
  
  // Hapus handlePreviewVideoChange

  // --- Curriculum Handlers ---
  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      curriculum: [...prev.curriculum, { id: crypto.randomUUID(), title: "", lessons: [] }],
    }));
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec) =>
        sec.id === sectionId ? { ...sec, title: newTitle } : sec
      ),
    }));
  };

  const removeSection = (sectionId: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((sec) => sec.id !== sectionId),
    }));
  };

  const addLesson = (sectionId: string, type: LectureType) => {
    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      type: type,
      video_duration_min: 10,
      article_content: "# New Article\n\nWrite your content here.",
      external_url: "https://",
    };
    
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec) =>
        sec.id === sectionId ? { ...sec, lessons: [...sec.lessons, newLesson] } : sec
      ),
    }));
    // Tutup menu setelah menambahkan
    setOpenSectionMenu(null);
  };

  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              lessons: sec.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
              ),
            }
          : sec
      ),
    }));
  };
  
  const updateLessonFile = (sectionId: string, lessonId: string, field: 'video_file' | 'file_asset', file: File | null) => {
     setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              lessons: sec.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: file } : lesson
              ),
            }
          : sec
      ),
    }));
  }

  const removeLesson = (sectionId: string, lessonId: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((sec) =>
        sec.id === sectionId
          ? { ...sec, lessons: sec.lessons.filter((lesson) => lesson.id !== lessonId) }
          : sec
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Course Data:", formData);
    alert("Course Created Successfully! (Check console for data)");
    navigate("/instructor/dashboard");
  };

  // --- Komponen renderLessonFields (Sama) ---
  const renderLessonFields = (sectionId: string, lesson: Lesson) => {
    const commonFields = (
      <>
        <input
          type="text"
          value={lesson.title}
          onChange={(e) => updateLesson(sectionId, lesson.id, "title", e.target.value)}
          placeholder="Lesson Title"
          className="flex-grow px-2 py-1 border border-gray-200 rounded-md text-sm mr-2"
        />
        <input
          type="text"
          value={lesson.description}
          onChange={(e) => updateLesson(sectionId, lesson.id, "description", e.target.value)}
          placeholder="Lesson Description (optional)"
          className="flex-grow px-2 py-1 border border-gray-200 rounded-md text-sm mr-2 mt-2"
        />
      </>
    );

    switch (lesson.type) {
      case LectureType.VIDEO:
        return (
          <div className="w-full">
            {commonFields}
            <div className="mt-2 flex items-center gap-2">
              <label className="text-sm">Duration (min):</label>
              <input
                type="number"
                value={lesson.video_duration_min}
                onChange={(e) => updateLesson(sectionId, lesson.id, "video_duration_min", parseInt(e.target.value) || 0)}
                className="w-24 px-2 py-1 border border-gray-200 rounded-md text-sm"
              />
            </div>
            <div className="mt-2">
              <FileUpload
                label="Video File"
                onFileChange={(file) => updateLessonFile(sectionId, lesson.id, 'video_file', file)}
                currentFile={lesson.video_file || null}
                accept="video/*"
                description="Upload lesson video"
              />
            </div>
          </div>
        );
      case LectureType.ARTICLE:
        return (
          <div className="w-full">
            {commonFields}
            <textarea
              value={lesson.article_content}
              onChange={(e) => updateLesson(sectionId, lesson.id, "article_content", e.target.value)}
              rows={5}
              placeholder="Write your article content in Markdown..."
              className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm mt-2"
            />
          </div>
        );
      case LectureType.FILE:
        return (
          <div className="w-full">
            {commonFields}
            <div className="mt-2">
              <FileUpload
                label="Downloadable File"
                onFileChange={(file) => updateLessonFile(sectionId, lesson.id, 'file_asset', file)}
                currentFile={lesson.file_asset || null}
                accept="application/pdf,application/zip,.rar"
                description="Upload PDF, ZIP, or other files"
              />
            </div>
          </div>
        );
      case LectureType.EXTERNAL:
        return (
          <div className="w-full">
            {commonFields}
            <input
              type="text"
              value={lesson.external_url}
              onChange={(e) => updateLesson(sectionId, lesson.id, "external_url", e.target.value)}
              placeholder="https://example.com/resource"
              className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm mt-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Course Info (Disederhanakan)
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a detailed overview of what students will learn."
                required
              />
            </div>
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                id="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categoriesData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Input Level dan Language Dihapus */}
            
          </div>
        );
      case 2: // Course Media (Disederhanakan)
        return (
          <div className="space-y-6">
            <FileUpload
              label="Course Thumbnail"
              onFileChange={handleThumbnailChange}
              currentFile={formData.thumbnail}
              accept="image/*"
              description="Upload a high-quality image for your course thumbnail."
            />
            
            {/* Input Preview Video Dihapus */}
            
          </div>
        );
      case 3: // Pricing (Sama)
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <input type="checkbox" name="isPaid" id="isPaid" checked={formData.isPaid} onChange={handleChange} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="isPaid" className="text-lg font-medium text-gray-900">
                This is a paid course
              </label>
            </div>
            {formData.isPaid && (
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Price (Rp) <span className="text-red-500">*</span>
                </label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" min="0" required />
              </div>
            )}
            {!formData.isPaid && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-700">
                <p>This course will be free for all students.</p>
              </div>
            )}
          </div>
        );
      case 4: // Curriculum (Tombol Add Lesson Diperbarui)
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Course Curriculum</h3>
            {formData.curriculum.map((section, sectionIndex) => (
              <div key={section.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    placeholder={`Section ${sectionIndex + 1} Title`}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-lg font-medium mr-2"
                  />
                  <button type="button" onClick={() => removeSection(section.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3 pl-4 border-l border-gray-200 ml-2">
                  {section.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-start bg-gray-50 p-3 rounded-md border border-gray-100">
                      {renderLessonFields(section.id, lesson)}
                      <button type="button" onClick={() => removeLesson(section.id, lesson.id)} className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition ml-2">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {/* --- Tombol Add Lesson Baru (Click-based) --- */}
                  <div className="relative mt-3">
                    <button
                      type="button"
                      onClick={() => setOpenSectionMenu(openSectionMenu === section.id ? null : section.id)}
                      className="flex items-center justify-center w-full py-2 border-dashed border-2 border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Lesson
                    </button>
                    
                    {/* Menu yang muncul/hilang berdasarkan state */}
                    {openSectionMenu === section.id && (
                      <div className="absolute z-10 bottom-full mb-2 w-full bg-white rounded-md shadow-lg border border-gray-200">
                        <button type="button" onClick={() => addLesson(section.id, LectureType.VIDEO)} className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                          <Video className="w-4 h-4 mr-2 text-blue-500" /> Video
                        </button>
                        <button type="button" onClick={() => addLesson(section.id, LectureType.ARTICLE)} className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                          <FileText className="w-4 h-4 mr-2 text-green-500" /> Article
                        </button>
                        <button type="button" onClick={() => addLesson(section.id, LectureType.FILE)} className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                          <Download className="w-4 h-4 mr-2 text-yellow-500" /> File
                        </button>
                         <button type="button" onClick={() => addLesson(section.id, LectureType.EXTERNAL)} className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                          <Link className="w-4 h-4 mr-2 text-purple-500" /> External Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="flex items-center justify-center w-full py-3 bg-blue-100 text-blue-700 rounded-md font-semibold hover:bg-blue-200 transition mt-6"
            >
              <Plus className="w-5 h-5 mr-2" /> Add New Section
            </button>
          </div>
        );
      case 5: // Review (Disederhanakan)
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Your Course Details</h3>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
              <h4 className="font-bold text-gray-800 text-lg border-b pb-2">Course Information</h4>
              <p><strong>Title:</strong> {formData.title || "N/A"}</p>
              <p><strong>Category:</strong> {categoriesData.find(c => c.id === formData.category_id)?.name || "N/A"}</p>
              <p><strong>Description:</strong> {formData.description || "N/A"}</p>
              
              <h4 className="font-bold text-gray-800 text-lg border-b pb-2 pt-4">Course Media</h4>
              <p><strong>Thumbnail:</strong> {formData.thumbnail ? formData.thumbnail.name : "N/A"}</p>

              <h4 className="font-bold text-gray-800 text-lg border-b pb-2 pt-4">Pricing</h4>
              <p><strong>Course Type:</strong> {formData.isPaid ? "Paid" : "Free"}</p>
              {formData.isPaid && <p><strong>Price:</strong> Rp {formData.price.toLocaleString("id-ID")}</p>}

              <h4 className="font-bold text-gray-800 text-lg border-b pb-2 pt-4">Curriculum</h4>
              {formData.curriculum.length > 0 ? (
                <div className="space-y-3">
                  {formData.curriculum.map((section, sIdx) => (
                    <div key={section.id} className="pl-4 border-l border-gray-200">
                      <p className="font-semibold text-gray-700">Section {sIdx + 1}: {section.title || "Untitled"}</p>
                      <ul className="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1">
                        {section.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            ({lesson.type}) {lesson.title || "Untitled"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : <p>No curriculum defined.</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-900">Create New Course</h2>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => navigate("/instructor/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Your Course</h1>

        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 grid grid-cols-5 text-xs text-center font-medium text-gray-500">
            <div>Course Info</div>
            <div>Media</div>
            <div>Pricing</div>
            <div>Curriculum</div>
            <div>Review</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Back
              </button>
            )}
            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleNextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Next
              </button>
            )}
            {currentStep === totalSteps && (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Create Course
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}