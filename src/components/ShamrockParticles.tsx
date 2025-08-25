import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const ShamrockParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMouseInHero = useRef(false);
  const [particleCount, setParticleCount] = useState(0); // State для принудительного ререндера

  // SVG трилистник
  const ShamrockSVG: React.FC<{ size: number; opacity: number; rotation: number }> = ({ 
    size, 
    opacity, 
    rotation 
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        position: 'absolute',
        opacity,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none'
      }}
    >
      <path
        d="M12 2c-1.5 0-2.5 1.5-2.5 3s1 3 2.5 3c1.5 0 2.5-1.5 2.5-3S13.5 2 12 2zm-5 6c-1.5 0-3 1-3 2.5S5.5 13 7 13s3-1 3-2.5S8.5 8 7 8zm10 0c-1.5 0-3 1-3 2.5S15.5 13 17 13s3-1 3-2.5S18.5 8 17 8zM12 10c-1 0-2 1-2 2.5 0 1 .5 2 1.5 2.5l.5 7.5.5-7.5c1-.5 1.5-1.5 1.5-2.5 0-1.5-1-2.5-2-2.5z"
        fill="currentColor"
      />
    </svg>
  );

  useEffect(() => {
    if (!containerRef.current) return;

    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      return; 
    }

    
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 15;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 20 + 15,
          speed: Math.random() * 0.5 + 0.2, 
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2, // -1 до 1
          opacity: Math.random() * 0.3 + 0.1 
        });
      }
      
      particlesRef.current = particles;
      setParticleCount(particles.length); 
    };

    
    const animateParticles = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      
      particlesRef.current.forEach((particle, index) => {
        
        if (isMouseInHero.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          
          if (distance < 200) {
            particle.x += dx * 0.02;
            particle.y += dy * 0.02;
          }
        }
        
        
        const speedMultiplier = isMouseInHero.current ? 0.3 : 1;
        particle.y -= particle.speed * speedMultiplier;
        particle.rotation += particle.rotationSpeed;

        
        if (particle.y < -50) {
          particle.y = window.innerHeight + 50;
          particle.x = Math.random() * window.innerWidth;
        }

        
        const particleElement = container.children[index] as HTMLElement;
        if (particleElement) {
          
          particleElement.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rotation}deg)`;
        }
      });

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    
    const handleMouseEnterHero = () => {
      isMouseInHero.current = true;
    };

    const handleMouseLeaveHero = () => {
      isMouseInHero.current = false;
    };

    
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        
        particlesRef.current = [];
        setParticleCount(0);
        return;
      }
      createParticles(); 
    };

    const heroSection = document.getElementById('hero');
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    if (heroSection) {
      heroSection.addEventListener('mouseenter', handleMouseEnterHero);
      heroSection.addEventListener('mouseleave', handleMouseLeaveHero);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (heroSection) {
        heroSection.removeEventListener('mouseenter', handleMouseEnterHero);
        heroSection.removeEventListener('mouseleave', handleMouseLeaveHero);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="shamrock-particles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        color: '#4ade80',
        overflow: 'hidden'
      }}
    >
      {Array.from({ length: particleCount }, (_, index) => {
        const particle = particlesRef.current[index];
        if (!particle) return null;
        
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate3d(${particle.x}px, ${particle.y}px, 0) rotate(${particle.rotation}deg)`,
              willChange: 'transform'
            }}
          >
            <ShamrockSVG
              size={particle.size}
              opacity={particle.opacity}
              rotation={0} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default ShamrockParticles;