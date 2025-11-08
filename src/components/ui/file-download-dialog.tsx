import { Download, FileText, File, FileSpreadsheet, FileImage, FileVideo, FileArchive } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LectureFile {
  id: string;
  lecture_id: string;
  file_path: string;
  file_name: string;
  file_size: number;
  mimetype: string;
  created_at: string;
  updated_at: string;
}

interface FileDownloadDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  lectureFile: LectureFile;
  triggerButton?: React.ReactNode;
  onDownload?: (file: LectureFile) => void;
}

export function FileDownloadDialog({
                                     open,
                                     onOpenChange,
                                     lectureFile,
                                     triggerButton,
                                     onDownload,
                                   }: FileDownloadDialogProps) {

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileExtension = (): string => {
    const ext = lectureFile.file_name.split(".").pop()?.toUpperCase() || "";
    return ext || lectureFile.mimetype.split("/")[1]?.toUpperCase() || "FILE";
  };

  const getFileIcon = () => {
    const mime = lectureFile.mimetype.toLowerCase();

    if (mime.includes("pdf"))
      return { icon: <FileText className="w-8 h-8 text-red-600" />, bg: "bg-red-100" };
    if (mime.includes("word") || mime.includes("document"))
      return { icon: <FileText className="w-8 h-8 text-blue-600" />, bg: "bg-blue-100" };
    if (mime.includes("excel") || mime.includes("spreadsheet"))
      return { icon: <FileSpreadsheet className="w-8 h-8 text-green-600" />, bg: "bg-green-100" };
    if (mime.includes("image"))
      return { icon: <FileImage className="w-8 h-8 text-purple-600" />, bg: "bg-purple-100" };
    if (mime.includes("video"))
      return { icon: <FileVideo className="w-8 h-8 text-pink-600" />, bg: "bg-pink-100" };
    if (mime.includes("zip") || mime.includes("rar") || mime.includes("compressed"))
      return { icon: <FileArchive className="w-8 h-8 text-orange-600" />, bg: "bg-orange-100" };

    return { icon: <File className="w-8 h-8 text-gray-600" />, bg: "bg-gray-100" };
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(lectureFile);
    } else {
      const link = document.createElement("a");
      link.href = lectureFile.file_path;
      link.download = lectureFile.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Close dialog after download
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const icon = getFileIcon();

  // Controlled mode - untuk dipanggil programmatically
  if (open !== undefined && onOpenChange !== undefined) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Download File</DialogTitle>
            <DialogDescription>Download {lectureFile.file_name}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-6 space-y-4">
            <div className={`w-16 h-16 ${icon.bg} rounded-2xl flex items-center justify-center`}>
              {icon.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 text-center px-4 break-words max-w-full">
              {lectureFile.file_name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="uppercase font-medium">{getFileExtension()}</span>
              <span>•</span>
              <span>{formatFileSize(lectureFile.file_size)}</span>
            </div>

            <Button
              onClick={handleDownload}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-6 rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Download File
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Uncontrolled mode - dengan trigger button
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Download File</DialogTitle>
          <DialogDescription>Download {lectureFile.file_name}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-4">
          <div className={`w-16 h-16 ${icon.bg} rounded-2xl flex items-center justify-center`}>
            {icon.icon}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 text-center px-4 break-words max-w-full">
            {lectureFile.file_name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="uppercase font-medium">{getFileExtension()}</span>
            <span>•</span>
            <span>{formatFileSize(lectureFile.file_size)}</span>
          </div>

          <Button
            onClick={handleDownload}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-6 rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Download File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}