import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Регистрируем плагины GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useScrollSmoother = () => {
  useEffect(() => {
    // Создаем ScrollSmoother для стабильного плавного скролла
    const smoother = ScrollSmoother.create({
      smooth: 1.5, // Баланс между скоростью и стабильностью
      effects: true, // Включает поддержку data-speed и data-lag атрибутов
      smoothTouch: 0.2, // Умеренная плавность на тач-устройствах
      normalizeScroll: true, // Решает проблемы с мобильными браузерами
      ignoreMobileResize: true, // Игнорирует изменения размера на мобильных устройствах
      ease: "power2.out", // Плавная кривая для естественного движения
      speed: 1.1, // Слегка увеличенная скорость
    });

    // Оптимизация для стабильной работы
    gsap.ticker.fps(60); // Стандартный FPS для стабильности
    gsap.config({ 
      force3D: true, 
      nullTargetWarn: false,
      autoSleep: 60 // Автоматическая оптимизация неактивных анимаций
    });

    // Очистка при размонтировании
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);
};