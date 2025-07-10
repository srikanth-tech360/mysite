import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-br from-dark-grey via-light-grey to-dark-grey opacity-0 transition-opacity duration-1000"
      style={{ 
        backgroundSize: '200% 200%',
        animation: 'gradient-x 15s ease infinite'
      }}
    >
      <div className="absolute inset-0 bg-dark-grey opacity-70"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-electric-blue shadow-lg animate-fade-in">
          <img
            src="/Srik-prfpic.png"
            alt="Srikanth Gunti"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-electric-blue">
            Hi, I'm Srikant
          </h1>
          <p className="text-xl md:text-2xl text-text-medium max-w-2xl mx-auto">
            Driving enterprise IT strategy & scalable solutions
          </p>
        </div>
        
        <a 
          href="#about"
          className="inline-block mt-8 px-8 py-3 bg-electric-blue text-white font-medium rounded-full transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:shadow-electric-blue/30 transform hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Explore My Work
        </a>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown className="text-electric-blue" size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;