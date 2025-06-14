import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  name: string;
  type?: 'text' | 'textarea';
  rows?: number;
  labelTooltip?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  name,
  type = 'text',
  rows = 3,
  labelTooltip
}) => {
  const commonProps = {
    id,
    name,
    value,
    onChange,
    placeholder,
    className: "mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-white placeholder-gray-500",
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-pink-400">
        {label}
        {labelTooltip && (
          <span className="ml-1 text-gray-400 hover:text-pink-300 cursor-help" title={labelTooltip}>
            (?)
          </span>
        )}
      </label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={rows}></textarea>
      ) : (
        <input type="text" {...commonProps} />
      )}
    </div>
  );
};

export default InputField;