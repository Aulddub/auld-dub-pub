import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import '../../styles/ui/FormField.css';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'select';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  options?: Array<{ value: string; label: string }>;
  autoComplete?: string;
  statusIcon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success = false,
  required = false,
  disabled = false,
  icon,
  className = '',
  options,
  autoComplete,
  statusIcon
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();
  const hasValue = value && value.length > 0;
  const hasError = !!error;

  const getInputClassName = () => {
    let className = 'form-input';
    if (hasError) className += ' form-input-error';
    if (success && !hasError) className += ' form-input-success';
    if (disabled) className += ' form-input-disabled';
    if (isFocused) className += ' form-input-focused';
    return className;
  };

  const renderInput = () => {
    const commonProps = {
      id,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(e.target.value),
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      className: getInputClassName(),
      placeholder: placeholder || `Enter ${label.toLowerCase()}`,
      required,
      disabled,
      autoComplete
    };

    if (type === 'select' && options) {
      return (
        <select {...commonProps}>
          <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return <input {...commonProps} type={type} />;
  };

  return (
    <div className={`form-field ${className}`}>
      {/* Static label on top */}
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      
      <div className="form-input-container">
        {icon && (
          <div className="form-input-icon">
            {icon}
          </div>
        )}
        
        <div className="form-input-wrapper">
          {renderInput()}
          <div className="form-input-border" />
        </div>

        <div className="form-status-icon">
          {statusIcon ? (
            statusIcon
          ) : (
            <AnimatePresence mode="wait">
              {hasError && (
                <motion.div
                  key="error"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="form-icon-error" size={18} />
                </motion.div>
              )}
              {success && !hasError && hasValue && (
                <motion.div
                  key="success"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="form-icon-success" size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="form-error-message"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormField;