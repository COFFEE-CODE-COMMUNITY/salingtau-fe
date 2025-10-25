import React, { useState } from "react";
import {EyeIcon, EyeOffIcon} from "lucide-react"

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function InputPassword({value, onChange, placeholder = "Password", className = "", required=true}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative w-full mb-4 ${className}`}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-3.5 right-2 flex items-center pr-3"
      >
        {
          showPassword ? (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          )
        }
      </button>
    </div>
  );
}
