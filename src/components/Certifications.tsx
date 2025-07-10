import React, { useEffect, useRef } from 'react';
import { Award } from 'lucide-react';

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const certifications = [
    {
      name: "PMP",
      year: "2023",
      issuer: "Project Management Institute",
      description: "Project Management Professional certification demonstrating expertise in leading projects and teams."
    },
    {
      name: "TOGAF",
      year: "2022",
      issuer: "The Open Group",
      description: "TOGAF certification validating enterprise architecture skills and knowledge."
    },
    {
      name: "CSM",
      year: "2021",
      issuer: "Scrum Alliance",
      description: "Certified Scrum Master recognizing proficiency in Agile methodologies and Scrum framework."
    },
    {
      name: "MCA",
      year: "2005",
      issuer: "VTU",
      description: "Master of Computer Applications degree providing strong foundation in computer science and applications."
    }
  ];

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-24 px-4 bg-light-grey opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-electric-blue">
          Certifications & Education
        </h2>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 hide-scrollbar"
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[350px] snap-start bg-white rounded-xl shadow-xl overflow-hidden flex-shrink-0 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-electric-blue/10 group"
              >
                <div className="h-2 bg-gradient-to-r from-electric-blue to-blue-600"></div>
                <div className="p-6 text-dark-grey">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-electric-blue/10 rounded-xl group-hover:bg-electric-blue group-hover:scale-110 transition-all duration-300">
                      <Award size={24} className="text-electric-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-electric-blue font-medium">{cert.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-electric-blue transition-colors duration-300">{cert.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{cert.issuer}</p>
                  <p className="text-gray-700 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {certifications.map((_, index) => (
              <button
                key={index}
                className="w-3 h-3 rounded-full bg-gray-400 focus:outline-none hover:bg-electric-blue hover:scale-125 transition-all duration-300"
                onClick={() => {
                  if (sliderRef.current) {
                    const scrollWidth = sliderRef.current.scrollWidth;
                    const itemWidth = scrollWidth / certifications.length;
                    sliderRef.current.scrollTo({
                      left: itemWidth * index,
                      behavior: 'smooth',
                    });
                  }
                }}
                aria-label={`View ${certifications[index].name} certification`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;