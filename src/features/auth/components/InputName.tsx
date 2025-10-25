import React from "react";

interface InputNameProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputName({label, placeholder, value, onChange, required = true,}: InputNameProps) {
  return (
    <div className="mb-4 text-left">
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
