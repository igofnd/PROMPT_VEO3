import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  className?: string;
  disabled?: boolean;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  title
}) => {
  let baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  if (disabled) {
    baseStyle += " opacity-60 cursor-not-allowed";
  }

  switch (variant) {
    case 'primary':
      baseStyle += ` text-white ${disabled ? 'bg-pink-800 border-pink-800' : 'bg-pink-500 hover:bg-pink-600 border-pink-500 hover:border-pink-600 focus:ring-pink-500'}`;
      break;
    case 'secondary':
      baseStyle += ` ${disabled ? 'text-pink-700 border-pink-700' : 'text-pink-400 border-pink-500 hover:bg-pink-500 hover:text-black focus:ring-pink-500'}`;
      if (!disabled) { // Add transparent background for non-disabled secondary
        baseStyle += ' bg-transparent';
      }
      break;
    case 'danger': // Keep danger red, but adjust for dark theme if needed
      baseStyle += ` text-white ${disabled ? 'bg-red-800 border-red-800' : 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 focus:ring-red-500'}`;
      break;
    case 'icon':
      baseStyle += ` p-2 border-transparent ${disabled ? 'text-gray-500' : 'text-pink-400 hover:text-pink-300 hover:bg-gray-800 focus:ring-pink-500'}`;
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;