import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  const experiences = [
    {
      period: "2019–Present",
      role: "IT Solutions Architect",
      company: "Agility",
      location: "Kuwait",
      responsibilities: [
        "Lead enterprise architecture solutions for logistics technology platforms",
        "Design and implement cloud-native microservices architecture for global shipping systems"
      ]
    },
    {
      period: "2015–2019",
      role: "Project Manager",
      company: "Agility E Services",
      location: "Hyderabad",
      responsibilities: [
        "Managed cross-functional teams for enterprise software implementations",
        "Led Agile transformation and DevOps adoption across development teams"
      ]
    },
    {
      period: "2013–2015",
      role: "Associate Project Manager",
      company: "Agility E Services",
      location: "Hyderabad",
      responsibilities: [
        "Coordinated development and deployment of customer-facing logistics applications",
        "Implemented CI/CD pipelines and automated testing frameworks"
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-4 bg-dark-grey opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-electric-blue">
          Experience Timeline
        </h2>
        
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-dark-grey border-l-2 border-electric-blue"></div>
          
          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => itemRefs.current[index] = el}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } opacity-0 translate-y-10 transition-all duration-700`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Year Marker */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8 md:top-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-electric-blue text-white z-10">
                  <Calendar size={20} />
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                  <div className="bg-white text-dark-grey p-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-electric-blue/10 transition-all duration-300 group">
                    <div className="mb-2 text-electric-blue font-bold">{exp.period}</div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-electric-blue transition-colors duration-300">{exp.role}</h3>
                    <p className="mb-4 text-gray-600">{exp.company}, {exp.location}</p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-electric-blue mt-2 mr-3 flex-shrink-0"></span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;