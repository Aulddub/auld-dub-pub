import React from 'react';
import { motion, Variants } from 'framer-motion';
import '../../styles/ui/LoadingSkeleton.css';

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = '',
  variant = 'rectangular',
  lines = 1,
  animation = 'wave'
}) => {
  const getSkeletonStyle = () => {
    const baseStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
    };

    switch (variant) {
      case 'text':
        return { ...baseStyle, height: '1em', borderRadius: '4px' };
      case 'circular':
        return { ...baseStyle, borderRadius: '50%' };
      case 'card':
        return { ...baseStyle, height: height || '200px', borderRadius: '16px' };
      default:
        return baseStyle;
    }
  };

  const skeletonVariants: Variants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    wave: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`loading-skeleton-text ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <motion.div
            key={i}
            className={`loading-skeleton loading-skeleton-${animation}`}
            style={{
              ...getSkeletonStyle(),
              width: i === lines - 1 ? '60%' : '100%',
              marginBottom: i === lines - 1 ? 0 : '0.5rem'
            }}
            variants={animation !== 'none' ? skeletonVariants : undefined}
            animate={animation !== 'none' ? animation : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`loading-skeleton loading-skeleton-${animation} ${className}`}
      style={getSkeletonStyle()}
      variants={animation !== 'none' ? skeletonVariants : undefined}
      animate={animation !== 'none' ? animation : undefined}
    />
  );
};

// Preset skeletons for common use cases
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`card-skeleton ${className || ''}`}>
    <LoadingSkeleton variant="card" height="200px" className="mb-4" />
    <LoadingSkeleton variant="text" height="1.5rem" className="mb-2" />
    <LoadingSkeleton variant="text" height="1rem" lines={2} className="mb-4" />
    <div className="flex gap-2">
      <LoadingSkeleton width="80px" height="32px" borderRadius="6px" />
      <LoadingSkeleton width="60px" height="32px" borderRadius="6px" />
    </div>
  </div>
);

export const FormSkeleton: React.FC<{ fields?: number; className?: string }> = ({ 
  fields = 3, 
  className 
}) => (
  <div className={`form-skeleton ${className || ''}`}>
    {Array.from({ length: fields }, (_, i) => (
      <div key={i} className="form-field-skeleton">
        <LoadingSkeleton width="100px" height="1rem" className="mb-1" />
        <LoadingSkeleton width="100%" height="48px" borderRadius="12px" />
      </div>
    ))}
    <LoadingSkeleton width="120px" height="40px" borderRadius="8px" className="mt-4" />
  </div>
);

export const ListSkeleton: React.FC<{ items?: number; className?: string }> = ({ 
  items = 3, 
  className 
}) => (
  <div className={`list-skeleton ${className || ''}`}>
    {Array.from({ length: items }, (_, i) => (
      <div key={i} className="list-item-skeleton">
        <LoadingSkeleton variant="circular" width="48px" height="48px" />
        <div className="list-item-content">
          <LoadingSkeleton width="150px" height="1.25rem" className="mb-1" />
          <LoadingSkeleton width="200px" height="1rem" />
        </div>
        <LoadingSkeleton width="80px" height="32px" borderRadius="6px" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;