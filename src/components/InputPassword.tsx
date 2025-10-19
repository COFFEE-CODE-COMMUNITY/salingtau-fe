import React, { useState } from "react";

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function InputPassword({value, onChange, placeholder = "Password", className = ""}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative w-full mb-4 ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-3.5 right-2 flex items-center pr-3"
      >
        <img
          src={showPassword ? "/eye-open.svg" : "/eye-closed.svg"}
          alt="Toggle password visibility"
          className="h-5 w-5 text-gray-500"
        />
      </button>
    </div>
  );
}
