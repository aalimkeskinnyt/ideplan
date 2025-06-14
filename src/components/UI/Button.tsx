import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ide-primary' | 'ide-secondary' | 'ide-accent';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon: Icon,
  className = ''
}) => {
  const baseClasses = 'btn-professional inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-[1.02] active:scale-[0.98] focus-enhanced';
  
  const variants = {
    primary: 'btn-professional-primary',
    secondary: 'btn-professional-secondary',
    danger: 'btn-professional-danger',
    success: 'btn-professional-success',
    'ide-primary': 'btn-ide-primary',
    'ide-secondary': 'btn-ide-secondary', 
    'ide-accent': 'btn-ide-accent'
  };
  
  const sizes = {
    sm: 'px-4 py-3 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-sm min-h-[48px]',
    lg: 'px-8 py-4 text-base min-h-[52px]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 18 : size === 'lg' ? 22 : 20} className="mr-2 flex-shrink-0" />}
      <span className="truncate">{children}</span>
    </button>
  );
};

export default Button;