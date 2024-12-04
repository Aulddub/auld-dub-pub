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
const Gallery = lazy(() => import('./components/Gallery'));
const Menu = lazy(() => import('./components/Menu'));
const Sports = lazy(() => import('./components/Sports'));
const LiveMusic = lazy(() => import('./components/LiveMusic'));
const AllMatches = lazy(() => import('./components/AllMatches'));

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
                <Hero />
                <Suspense fallback={<Loading />}>
                  <About />
                  <Menu />
                  <Gallery />
                  <Sports />
                  <LiveMusic />
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
