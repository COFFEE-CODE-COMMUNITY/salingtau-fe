import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

interface AlertMessageProps {
  type: "success" | "error" | "info";
  message: string;
  onClose?: () => void;
}

export default function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  const styles = {
    success: "bg-green-50 border-green-400 text-green-700",
    error: "bg-red-50 border-red-400 text-red-700",
    info: "bg-blue-50 border-blue-400 text-blue-700",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 mr-2" />,
    error: <XCircle className="w-5 h-5 mr-2" />,
    info: <Info className="w-5 h-5 mr-2" />,
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center justify-between border-l-4 px-4 py-3 rounded-md mt-4 shadow-sm ${styles[type]}`}
        >
          <div className="flex items-center">
            {icons[type]}
            <span className="text-sm font-medium">{message}</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="ml-2 text-sm font-semibold hover:opacity-70">
              ✕
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
