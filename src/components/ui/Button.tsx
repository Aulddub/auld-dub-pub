import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import '../../styles/ui/Button.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = ''
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const getButtonClassName = () => {
    let baseClass = `btn btn-${variant} btn-${size}`;
    if (fullWidth) baseClass += ' btn-full-width';
    if (loading || disabled) baseClass += ' btn-disabled';
    if (className) baseClass += ` ${className}`;
    return baseClass;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="btn-spinner" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
          <span>Loading...</span>
        </>
      );
    }

    if (icon && children) {
      return iconPosition === 'left' ? (
        <>
          <span className="btn-icon">{icon}</span>
          <span>{children}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <span className="btn-icon">{icon}</span>
        </>
      );
    }

    if (icon && !children) {
      return <span className="btn-icon">{icon}</span>;
    }

    return children;
  };

  return (
    <motion.button
      className={getButtonClassName()}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "initial"}
      whileTap={!disabled && !loading ? "tap" : "initial"}
      transition={{ duration: 0.15 }}
    >
      {renderContent()}
    </motion.button>
  );
};

export default Button;