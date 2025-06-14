import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  options: Option[];
  labelTooltip?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  name,
  options,
  labelTooltip,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-pink-400">
        {label}
        {labelTooltip && (
          <span className="ml-1 text-gray-400 hover:text-pink-300 cursor-help" title={labelTooltip}>
            (?)
          </span>
        )}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-white"
      >
        <option value="" className="text-gray-400">Pilih {label.toLowerCase()}...</option>
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;