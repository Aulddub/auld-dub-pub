import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Admin from './components/Admin';
import { useLenis } from './hooks/useLenis';


// Lazy load components
const About = lazy(() => import('./components/About'));
const Menu = lazy(() => import('./components/Menu'));
const Entertainment = lazy(() => import('./components/Entertainment'));
const AllMatches = lazy(() => import('./components/AllMatches'));
const AllLiveMusic = lazy(() => import('./components/AllLiveMusic'));
const Contact = lazy(() => import('./components/Contact'));

gsap.registerPlugin(ScrollTrigger);

// Loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    color: '#c8b273'
  }}>
    Loading...
  </div>
);

function App() {
  // Используем Lenis для плавного скролла
  useLenis();

  useEffect(() => {
    // Функция для создания профессионального эффекта наложения секций
    const setupScrollAnimations = () => {
      // Очищаем предыдущие триггеры
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Настраиваем секции с правильными z-index
      const sections = [
        { element: document.querySelector('#hero'), zIndex: 1 },
        { element: document.querySelector('#about'), zIndex: 10 },
        { element: document.querySelector('#menu'), zIndex: 20 },
        { element: document.querySelector('#entertainment'), zIndex: 30 },
        { element: document.querySelector('#contact'), zIndex: 40 }
      ];
      
      sections.forEach(({ element, zIndex }, index) => {
        if (!element) return;
        
        // Устанавливаем базовые стили для корректного наложения
        gsap.set(element, {
          zIndex,
          position: 'relative',
          willChange: 'transform' // Оптимизация для GPU
        });
        
        // Создаем быстрый профессиональный эффект наложения
        if (index > 0) {
          // Устанавливаем изначальное положение секций ниже viewport
          gsap.set(element, { y: '25vh' });
          
          gsap.to(element, {
            y: '0vh', // Движение в нормальное положение
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom', // Начинаем когда секция входит в viewport
              end: 'top center', // Заканчиваем в центре
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          });
        }
      });
      
      ScrollTrigger.refresh();
    };
    
    // Устанавливаем анимации после загрузки всех компонентов
    const timeoutId = setTimeout(setupScrollAnimations, 100);
    
    // Обработка хэша URL для навигации
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.split('?')[0];
        const element = document.querySelector(elementId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    setTimeout(handleHashNavigation, 200);
    
    // Очистка при размонтировании
    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={
            <div className="outer-container">
              <div className="inner-container">
                <div className="App">
                  <Navbar />
                  <section id="hero">
                    <Hero />
                  </section>
                  <Suspense fallback={<Loading />}>
                    <section id="about">
                      <About />
                    </section>
                    <section id="menu">
                      <Menu />
                    </section>
                    <section id="entertainment">
                      <Entertainment />
                    </section>
                    <section id="contact">
                      <Contact />
                    </section>
                  </Suspense>
                </div>
              </div>
            </div>
          } />
          <Route path="/all-matches" element={
            <>
              <Navbar />
              <Suspense fallback={<Loading />}>
                <AllMatches />
              </Suspense>
            </>
          } />
          <Route path="/all-live-music" element={
            <>
              <Navbar />
              <Suspense fallback={<Loading />}>
                <AllLiveMusic />
              </Suspense>
            </>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<Loading />}>
              <Admin />
            </Suspense>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
