import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  disabled = false
}) => {
  return (
    <div className="professional-form-group">
      <label className="professional-label">
        {label} {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`professional-select ${
            error 
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200 text-red-900' 
              : disabled
              ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 text-gray-900 hover:border-gray-400'
          }`}
        >
          <option value="" className="text-gray-500">Seçiniz...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {error ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <ChevronDown className={`h-5 w-5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
          )}
        </div>
      </div>
      {error && (
        <div className="mt-2 flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Select;