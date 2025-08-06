import { useEffect } from 'react';
import Lenis from 'lenis';

// Расширяем тип Window для ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: {
      update: () => void;
      refresh: () => void;
    };
  }
}

export const useLenis = () => {
  useEffect(() => {
    // Создаем экземпляр Lenis с оптимизированными настройками
    const lenis = new Lenis({
      duration: 1, // Оптимальная длительность для баланса плавности и отзывчивости
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная функция easing
      lerp: 0.07, // Оптимальное значение для плавного следования за скроллом
      smoothWheel: true,
      syncTouch: false, // Отключаем для стабильности на мобильных
      touchMultiplier: 1.5, // Умеренная чувствительность на тач
      wheelMultiplier: 1.2, // Слегка увеличенная чувствительность колеса
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical'
    });

    // Оптимизированная функция анимации
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Интеграция с GSAP ScrollTrigger
    if (window.ScrollTrigger) {
      lenis.on('scroll', () => {
        window.ScrollTrigger?.update();
      });
    }

    // Обновление при изменении размера окна
    const handleResize = () => {
      lenis.resize();
      window.ScrollTrigger?.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Очистка при размонтировании
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);
};