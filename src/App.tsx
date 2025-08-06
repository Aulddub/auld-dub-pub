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
    // Исправляем позиционирование секций сохраняя другие анимации
    const setupScrollAnimations = () => {
      // Очищаем только ScrollTrigger триггеры наложения секций
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Исправляем только позиционирование секций
      const sections = document.querySelectorAll('#hero, #about, #menu, #entertainment, #contact');
      
      sections.forEach((element) => {
        if (!element) return;
        
        // Очищаем только transform свойства, сохраняя остальные анимации
        gsap.set(element, {
          y: 0,
          x: 0,
          position: 'relative',
          zIndex: 'auto'
        });
      });
    };
    
    // Устанавливаем анимации после загрузки всех компонентов
    const timeoutId = setTimeout(setupScrollAnimations, 100);
    
    // Упрощенная обработка хэша URL для навигации
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      
      if (hash) {
        const elementId = hash.split('?')[0];
        const element = document.querySelector(elementId);
        if (element) {
          const offset = 80;
          // Используем стандартный offset для всех секций
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
    
    // Добавляем обработчик для hashchange событий
    const handleHashChange = () => {
      handleHashNavigation();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Очистка при размонтировании
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashChange);
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
