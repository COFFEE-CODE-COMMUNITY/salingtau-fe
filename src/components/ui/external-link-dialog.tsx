import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle, Globe } from "lucide-react";

interface ExternalLinkDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  lectureTitle: string;
  lectureDescription?: string;
  externalUrl: string;
}

export function ExternalLinkDialog({
                                     open,
                                     onOpenChange,
                                     lectureTitle,
                                     lectureDescription,
                                     externalUrl,
                                   }: ExternalLinkDialogProps) {

  const handleOpenLink = () => {
    window.open(externalUrl, "_blank", "noopener,noreferrer");

    // Close dialog after opening link
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Debug logging
  React.useEffect(() => {
    console.log("ExternalLinkDialog - open:", open);
    console.log("ExternalLinkDialog - data:", { lectureTitle, externalUrl });
  }, [open, lectureTitle, externalUrl]);

  // Pastikan open dan onOpenChange tersedia
  if (open === undefined || !onOpenChange) {
    console.error("ExternalLinkDialog requires 'open' and 'onOpenChange' props");
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            {lectureTitle}
          </DialogTitle>

          {lectureDescription && (
            <DialogDescription className="text-gray-600">
              {lectureDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* External URL Display */}
          <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <ExternalLink className="w-4 h-4 shrink-0 mt-0.5" />
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all hover:underline text-blue-600"
            >
              {externalUrl}
            </a>
          </div>

          {/* Warning Message */}
          <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              Anda akan diarahkan ke website eksternal di luar platform ini.
            </p>
          </div>

          {/* Action Button */}
          <Button
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-6 rounded-xl"
            onClick={handleOpenLink}
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            Buka Link Eksternal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}