import React, { useState } from "react";

interface InputEmailProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function InputEmail({value, onChange, placeholder = "Email", className = "", required = true}: InputEmailProps) {
  const [isTouched, setIsTouched] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = isTouched && !isValidEmail(value);

  return (
    <div className="w-full mb-4 text-left">
      <input
        type="email"
        value={value}
        onChange={onChange}
        onBlur={() => setIsTouched(true)}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 border rounded focus:outline-none focus:ring-2 ${
          showError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } ${className}`}
      />
      {showError && (
        <p className="text-red-500 text-sm mt-1">Format email tidak valid</p>
      )}
    </div>
  );
}
