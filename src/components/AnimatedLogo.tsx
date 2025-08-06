import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedLogoProps {
  logoSrc: string;
  alt: string;
  className?: string;
  onAnimationComplete?: () => void;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  logoSrc, 
  alt, 
  className = '', 
  onAnimationComplete 
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!logoRef.current || !imageRef.current) return;

    const logo = logoRef.current;
    const image = imageRef.current;

    // Создаем элемент для цветовой анимации
    const colorSweep = document.createElement('div');
    colorSweep.className = 'color-sweep';
    colorSweep.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #009A49 20%,  /* Зеленый ирландского флага */
        #FFFFFF 40%,  /* Белый */
        #FF7F00 60%,  /* Оранжевый */
        transparent 80%
      );
      mix-blend-mode: overlay;
      border-radius: inherit;
      pointer-events: none;
      z-index: 2;
    `;
    
    logo.appendChild(colorSweep);

    // Создаем временную шкалу анимации
    const tl = gsap.timeline({
      onComplete: () => {
        // Убираем элемент цветовой анимации после завершения
        if (colorSweep.parentNode) {
          colorSweep.parentNode.removeChild(colorSweep);
        }
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    });

    // Начальное состояние логотипа
    gsap.set(image, { 
      scale: 0.8, 
      opacity: 0,
      filter: 'brightness(0.7)'
    });

    // Анимация появления логотипа
    tl.to(image, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    // Анимация цветового всплеска
    .to(colorSweep, {
      left: '100%',
      duration: 1.5, // Уменьшили с 2 до 1.5 секунд
      ease: 'power2.out'
    }, '-=0.3')
    // Восстановление яркости и финальное состояние
    .to(image, {
      filter: 'brightness(1) drop-shadow(0 0 10px rgba(200, 178, 115, 0.2))',
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.8'); // Убрали зависающий yoyo эффект

    // Cleanup
    return () => {
      tl.kill();
      if (colorSweep.parentNode) {
        colorSweep.parentNode.removeChild(colorSweep);
      }
    };
  }, [onAnimationComplete]);

  return (
    <div 
      ref={logoRef}
      className={`animated-logo ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img
        ref={imageRef}
        src={logoSrc}
        alt={alt}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'block'
        }}
      />
    </div>
  );
};

export default AnimatedLogo;