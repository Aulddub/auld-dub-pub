import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Admin from './components/Admin';

// Lazy load components
const About = lazy(() => import('./components/About'));
const Menu = lazy(() => import('./components/Menu'));
const Sports = lazy(() => import('./components/Sports'));
const LiveMusic = lazy(() => import('./components/LiveMusic'));
const AllMatches = lazy(() => import('./components/AllMatches'));
const PubQuiz = lazy(() => import('./components/PubQuiz'));
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
  useEffect(() => {
    // Обработка хэша в URL при загрузке страницы
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
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
                  <section id="live-music">
                    <LiveMusic />
                  </section>
                  <section id="live-sport">
                    <Sports />
                  </section>
                  <section id="pubquiz">
                    <PubQuiz />
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
        <Route path="/admin" element={
          <Suspense fallback={<Loading />}>
            <Admin />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
