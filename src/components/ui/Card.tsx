import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/ui/Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false, 
  padding = 'md',
  onClick 
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hoverable ? { 
      y: -4, 
      boxShadow: '0 20px 40px rgba(200, 178, 115, 0.15)' 
    } : {}
  };

  return (
    <motion.div
      className={`card card-${padding} ${hoverable ? 'card-hoverable' : ''} ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;