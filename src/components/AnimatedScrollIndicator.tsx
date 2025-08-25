import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedScrollIndicatorProps {
  onClick?: () => void;
}

const AnimatedScrollIndicator: React.FC<AnimatedScrollIndicatorProps> = ({ onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mugRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);

  // SVG кружки пива
  const BeerMugSVG = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Кружка */}
      <path
        d="M5 7V19C5 19.5523 5.44772 20 6 20H16C16.5523 20 17 19.5523 17 19V7H5Z"
        fill="#D4AF37"
        stroke="#B8860B"
        strokeWidth="1"
      />
      {/* Ручка кружки */}
      <path
        d="M17 9H19C20.1046 9 21 9.89543 21 11V13C21 14.1046 20.1046 15 19 15H17"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Пена */}
      <ellipse cx="11" cy="7" rx="6" ry="2" fill="#FFFAF0" />
      <ellipse cx="11" cy="6" rx="5" ry="1.5" fill="#FFFFFF" />
      {/* Пузырьки в пене */}
      <circle cx="9" cy="6.5" r="0.5" fill="#F0F8FF" opacity="0.8" />
      <circle cx="13" cy="6.2" r="0.3" fill="#F0F8FF" opacity="0.6" />
      <circle cx="11" cy="6.8" r="0.4" fill="#F0F8FF" opacity="0.7" />
    </svg>
  );

  // Компонент пузырька
  const Bubble: React.FC<{ index: number }> = ({ index }) => {
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!bubbleRef.current) return;

      const bubble = bubbleRef.current;
      const size = Math.random() * 4 + 2; // 2-6px
      const startX = Math.random() * 30 - 15; // -15 до 15px от центра
      const duration = Math.random() * 2 + 2; // 2-4 секунды
      
      gsap.set(bubble, {
        width: size,
        height: size,
        x: startX,
        y: 0,
        opacity: 0
      });

  
      const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 2 });
      
      tl.to(bubble, {
        opacity: 0.6,
        duration: 0.3
      })
      .to(bubble, {
        y: -60,
        x: startX + (Math.random() * 20 - 10),
        scale: Math.random() * 0.5 + 0.5, 
        duration,
        ease: 'power1.out'
      })
      .to(bubble, {
        opacity: 0,
        duration: 0.5
      }, '-=0.5');

      if (bubblesRef.current) {
        bubblesRef.current[index] = bubble;
      }

      return () => {
        tl.kill();
      };
    }, [index]);

    return (
      <div
        ref={bubbleRef}
        style={{
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
    );
  };

  useEffect(() => {
    if (!containerRef.current || !mugRef.current) return;

    const container = containerRef.current;
    const mug = mugRef.current;

    
    const bounceAnimation = gsap.timeline({ repeat: -1 });
    bounceAnimation
      .to(mug, {
        y: -10,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to(mug, {
        y: 0,
        duration: 0.6,
        ease: 'bounce.out'
      })
      .to({}, { duration: 1 }); 

    
    const handleMouseEnter = () => {
      gsap.to(mug, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mug, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      bounceAnimation.kill();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="animated-scroll-indicator"
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      {/* Текст */}
      <div
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--font-size-small)',
          fontWeight: 'var(--font-weight-medium)',
          fontStyle: 'italic',
          color: '#fff',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}
      >
        Scroll for More
      </div>

      
      <div style={{ position: 'relative' }}>
        
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 60,
            pointerEvents: 'none'
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Bubble key={i} index={i} />
          ))}
        </div>

        
        <div
          ref={mugRef}
          style={{
            color: '#c8b273',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        >
          <BeerMugSVG />
        </div>
      </div>
    </div>
  );
};

export default AnimatedScrollIndicator;