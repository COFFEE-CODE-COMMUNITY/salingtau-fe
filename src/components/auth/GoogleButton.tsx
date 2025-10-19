interface GoogleButtonProps {
  label?: string;
  onClick?: () => void;
}

export default function GoogleButton({label, onClick}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded hover:bg-gray-100 transition"
    >
      <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
      {label}
    </button>
  );
}
