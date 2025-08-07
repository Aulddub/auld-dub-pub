import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import '../../styles/ui/DateTimeField.css';

interface DateTimeFieldProps {
  label: string;
  type: 'date' | 'time' | 'datetime';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  min?: string;
  max?: string;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  min,
  max
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();
  const hasError = !!error;




  const getPlaceholder = () => {
    switch (type) {
      case 'date':
        return 'Select date';
      case 'time':
        return 'Select time';
      default:
        return 'Select date and time';
    }
  };

  return (
    <div className={`datetime-field ${className}`}>
      <label htmlFor={id} className="datetime-label">
        {label}
        {required && <span className="datetime-required">*</span>}
      </label>
      
      <div className={`datetime-input-container ${isFocused ? 'focused' : ''} ${hasError ? 'error' : ''}`}>

        
        <div className="datetime-input-wrapper">
          {/* Native input (visible but styled) */}
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="datetime-native-input"
            placeholder={getPlaceholder()}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
          />
          
          <div className="datetime-input-border" />
        </div>

        <div className="datetime-status-icon">
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div
                key="error"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle className="datetime-icon-error" size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="datetime-error-message"
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

export default DateTimeField;