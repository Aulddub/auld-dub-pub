import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TypewriterTextProps {
  text: string;
  delay?: number; // Задержка перед началом анимации
  speed?: number; // Скорость печатания (мс между символами)
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 50,
  className = '',
  showCursor = true,
  onComplete
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(showCursor);

  useEffect(() => {
    if (!textRef.current) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let cursorAnimation: gsap.core.Timeline;

    // Анимация мигающего курсора
    if (showCursor && cursorRef.current) {
      cursorAnimation = gsap.timeline({ repeat: -1 });
      cursorAnimation.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      }).to(cursorRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      } else {
        // Анимация завершена
        if (showCursor) {
          // Продолжаем мигание курсора еще немного, затем скрываем
          setTimeout(() => {
            setShowBlinkingCursor(false);
            if (cursorAnimation) {
              cursorAnimation.kill();
            }
          }, 2000);
        }
        
        if (onComplete) {
          onComplete();
        }
      }
    };

    // Запускаем анимацию с задержкой
    const startAnimation = () => {
      typeNextCharacter();
    };

    timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (cursorAnimation) {
        cursorAnimation.kill();
      }
    };
  }, [text, delay, speed, showCursor, onComplete]);

  return (
    <span className={`typewriter-text ${className}`}>
      <span ref={textRef}>
        {displayedText}
      </span>
      {showBlinkingCursor && (
        <span
          ref={cursorRef}
          className="typewriter-cursor"
          style={{
            color: '#c8b273',
            fontSize: '1em',
            fontWeight: 'normal',
            marginLeft: '2px'
          }}
        >
          |
        </span>
      )}
    </span>
  );
};

export default TypewriterText;