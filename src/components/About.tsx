import React, { useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
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
      id="about"
      ref={sectionRef}
      className="py-24 px-4 bg-light-grey opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-electric-blue">
          About Me
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-electric-blue opacity-10 transform scale-110"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/10">
                <img
                  src="https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sree Gunti portrait"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <p className="text-lg leading-relaxed mb-6">
              I'm a seasoned IT Solutions Architect & Technical Project Manager with 18+ years leading 
              .NET Core, Angular, SQL Server, Web API, distributed & cloud-native systems. I align tech 
              strategy with business goals, champion Agile/hybrid deliveries, and empower leaders with 
              Power BI insights.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              With a passion for creating scalable, resilient systems, I excel at bridging the gap between 
              technical requirements and business objectives. My expertise spans enterprise architecture, 
              team leadership, and implementing cutting-edge solutions that drive organizational success.
            </p>
            
            <a 
              href="https://linkedin.com/in/srikanth-gunti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-electric-blue hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} />
              <span className="font-medium">Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;