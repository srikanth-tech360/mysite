import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-grey text-text-light">
      <Header />
      <main>
        <Hero />
        <About />
        <Highlights />
        <Skills />
        <Experience />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}

export default App;