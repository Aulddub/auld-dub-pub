import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Helmet } from 'react-helmet';
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
            <>
              <Helmet>
                <title>The Auld Dub - Best Pub & Restaurant Stockholm Hötorget | Irish Food, Sports & Music</title>
                <meta name="description" content="Stockholm's best pub & restaurant at Hötorget in Stockholm City Center. Watch live sports, enjoy pub quiz, live music, traditional Irish food & Guinness. Perfect central location for tourists & locals." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.theaulddub.se/" />
              </Helmet>
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
            </>
          } />
          <Route path="/all-matches" element={
            <>
              <Helmet>
                <title>All Sports Matches - The Auld Dub Stockholm | Live Football & Sports</title>
                <meta name="description" content="Watch all live sports matches at The Auld Dub Stockholm. Premier League, Champions League, and more on big screens with great atmosphere and Guinness." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.theaulddub.se/all-matches" />
              </Helmet>
              <Navbar />
              <Suspense fallback={<Loading />}>
                <AllMatches />
              </Suspense>
            </>
          } />
          <Route path="/all-live-music" element={
            <>
              <Helmet>
                <title>Live Music Events - The Auld Dub Stockholm | Irish Traditional Music</title>
                <meta name="description" content="Experience authentic Irish live music at The Auld Dub Stockholm. Traditional Irish sessions, local bands, and musical entertainment in Stockholm's best Irish pub." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.theaulddub.se/all-live-music" />
              </Helmet>
              <Navbar />
              <Suspense fallback={<Loading />}>
                <AllLiveMusic />
              </Suspense>
            </>
          } />
          <Route path="/admin" element={
            <>
              <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex, nofollow" />
              </Helmet>
              <Suspense fallback={<Loading />}>
                <Admin />
              </Suspense>
            </>
          } />
        </Routes>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
