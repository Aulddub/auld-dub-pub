import { useEffect } from 'react';
import Lenis from 'lenis';

// Расширяем тип Window для ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: {
      update: () => void;
    };
  }
}

export const useLenis = () => {
  useEffect(() => {
    // Создаем экземпляр Lenis с настройками для плавного скролла
    const lenis = new Lenis({
      duration: 2.0, // Длительность анимации скролла в секундах
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Функция плавности
      lerp: 0.05, // Интенсивность линейной интерполяции (0-1)
      smoothWheel: true, // Плавный скролл колесиком мыши
      syncTouch: false, // Отключаем синхронизацию с тач-устройствами для стабильности
    });

    // Функция для обновления анимации
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Интеграция с GSAP ScrollTrigger если он используется
    if (window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
    }

    // Очистка при размонтировании
    return () => {
      lenis.destroy();
    };
  }, []);
};