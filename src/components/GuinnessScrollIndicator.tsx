import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GuinnessScrollIndicatorProps {
  onClick?: () => void;
}

const GuinnessScrollIndicator: React.FC<GuinnessScrollIndicatorProps> = ({ onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const beerRef = useRef<HTMLDivElement>(null);
  const foamRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);

  // Реалистичный SVG стакана Guinness
  const GuinnessGlassSVG = () => (
    <svg
      width="80"
      height="100"
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Градиенты для реализма */}
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8F8FF" stopOpacity="0.1"/>
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#E5E5E5" stopOpacity="0.1"/>
        </linearGradient>
        <linearGradient id="rimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0C0C0"/>
          <stop offset="50%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#A8A8A8"/>
        </linearGradient>
      </defs>
      
      {/* Тело стакана - характерная форма Guinness */}
      <path
        d="M20 15 C18 15 16 17 16 19 L16 75 C16 82 20 85 25 85 L55 85 C60 85 64 82 64 75 L64 19 C64 17 62 15 60 15 Z"
        fill="url(#glassGradient)"
        stroke="#D3D3D3"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      
      {/* Rim (ободок стакана) */}
      <ellipse cx="40" cy="15" rx="22" ry="3" fill="url(#rimGradient)" stroke="#B0B0B0" strokeWidth="1"/>
      
      {/* Основание */}
      <ellipse cx="40" cy="85" rx="22" ry="4" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1"/>
      
      {/* Блики для реализма */}
      <ellipse cx="25" cy="30" rx="3" ry="15" fill="#FFFFFF" opacity="0.4"/>
      <ellipse cx="23" cy="60" rx="2" ry="8" fill="#FFFFFF" opacity="0.3"/>
    </svg>
  );

  // Компонент пузырька в Guinness
  const GuinnessBubble: React.FC<{ index: number }> = ({ index }) => {
    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!bubbleRef.current) return;

      const bubble = bubbleRef.current;
      const size = Math.random() * 3 + 1; // 1-4px пузырьки
      const startX = 20 + Math.random() * 40; // В пределах нового стакана (20-60px)
      const duration = Math.random() * 4 + 3; // 3-7 секунд для более реалистичного подъема
      
      gsap.set(bubble, {
        width: size,
        height: size,
        x: startX,
        y: 75, // Начинаем со дна нового стакана
        opacity: 0
      });

      // Реалистичный подъем пузырьков Guinness
      const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 4 });
      
      tl.to(bubble, {
        opacity: 0.6,
        duration: 0.3
      })
      .to(bubble, {
        y: 20, // До уровня пены в новом стакане
        x: startX + (Math.random() * 8 - 4), // Более выраженное покачивание
        scale: Math.random() * 0.4 + 0.6,
        rotation: Math.random() * 360, // Вращение пузырьков
        duration,
        ease: 'power1.out'
      })
      .to(bubble, {
        opacity: 0,
        scale: 0,
        y: 15,
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
          backgroundColor: '#F5F5F5',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
    );
  };

  useEffect(() => {
    if (!containerRef.current || !glassRef.current || !beerRef.current || !foamRef.current) return;

    const container = containerRef.current;
    const glass = glassRef.current;
    const beer = beerRef.current;
    const foam = foamRef.current;

    // Начальные состояния для реалистичной анимации
    gsap.set(beer, {
      height: 0,
      transformOrigin: 'bottom',
      scaleY: 0
    });
    
    gsap.set(foam, {
      opacity: 0,
      scale: 0.5,
      y: 10
    });

    // Реалистичная анимация наполнения Guinness
    const fillAnimation = gsap.timeline({ repeat: -1 });
    
    fillAnimation
      // Медленное наполнение темным пивом (как настоящий Guinness)
      .to(beer, {
        height: 55, // Больше высота для нового стакана
        scaleY: 1,
        duration: 3, // Медленнее для реализма
        ease: 'power1.inOut'
      })
      // Образование пены с задержкой
      .to(foam, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1')
      // Небольшое оседание пены
      .to(foam, {
        scaleY: 0.9,
        duration: 0.5,
        ease: 'power2.out'
      })
      // Пауза с полным стаканом
      .to({}, { duration: 3 })
      // "Выпивание" - постепенное исчезновение
      .to(beer, {
        height: 0,
        scaleY: 0,
        duration: 2,
        ease: 'power2.in'
      })
      .to(foam, {
        opacity: 0,
        scale: 0.3,
        duration: 1.5,
        ease: 'power2.in'
      }, '-=1.5')
      // Пауза перед следующим циклом
      .to({}, { duration: 1.5 });

    // Анимация подпрыгивания стакана
    const bounceAnimation = gsap.timeline({ repeat: -1 });
    bounceAnimation
      .to(glass, {
        y: -8,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(glass, {
        y: 0,
        duration: 0.8,
        ease: 'bounce.out'
      })
      .to({}, { duration: 2 });

    // Интерактивность
    const handleMouseEnter = () => {
      gsap.to(glass, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glass, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      fillAnimation.kill();
      bounceAnimation.kill();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="guinness-scroll-indicator"
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
          marginBottom: '1rem',
          textAlign: 'center'
        }}
      >
        Scroll for More
      </div>

      {/* Стакан Guinness */}
      <div
        ref={glassRef}
        style={{
          position: 'relative',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}
      >
        {/* Пузырьки для нового стакана */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 80,
            height: 100,
            pointerEvents: 'none'
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <GuinnessBubble key={i} index={i} />
          ))}
        </div>

        {/* Темное пиво Guinness */}
        <div
          ref={beerRef}
          style={{
            position: 'absolute',
            bottom: 15,
            left: 18,
            width: 44,
            height: 0,
            background: 'linear-gradient(to bottom, #2D1810 0%, #1A0F08 100%)', // Реалистичный градиент Guinness
            borderRadius: '0 0 4px 4px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        />

        {/* Кремовая пена */}
        <div
          ref={foamRef}
          style={{
            position: 'absolute',
            top: 18,
            left: 16,
            width: 48,
            height: 12,
            background: 'linear-gradient(to bottom, #FFF8DC 0%, #F5F5DC 50%, #E6E6FA 100%)', // Реалистичная пена
            borderRadius: '4px 4px 0 0',
            opacity: 0,
            boxShadow: '0 -1px 3px rgba(255, 255, 255, 0.5), inset 0 1px 2px rgba(0, 0, 0, 0.1)'
          }}
        />

        {/* Стакан */}
        <GuinnessGlassSVG />

        {/* Официальный брендинг Guinness на стакане */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          {/* Основной логотип GUINNESS */}
          <div
            style={{
              fontFamily: 'serif',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#FFD700', // Золотистый цвет
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              letterSpacing: '1px',
              marginBottom: '2px'
            }}
          >
            GUINNESS
          </div>
          
          {/* Арфа - символ Guinness */}
          <div
            style={{
              fontSize: '14px',
              color: '#FFD700',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              marginBottom: '2px'
            }}
          >
            ♪
          </div>
          
          {/* EST. 1759 */}
          <div
            style={{
              fontFamily: 'serif',
              fontSize: '6px',
              color: '#E5E5E5',
              textShadow: '1px 1px 1px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.5px'
            }}
          >
            EST. 1759
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuinnessScrollIndicator;