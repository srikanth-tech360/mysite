import React, { useEffect, useRef } from 'react';
import { CheckCircle, Users, Cpu } from 'lucide-react';

const Highlights: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const highlights = [
    {
      icon: <CheckCircle size={48} className="text-electric-blue" />,
      title: "End-to-end enterprise delivery",
      description: "Expertise in delivering complete enterprise solutions from conception to implementation, ensuring alignment with business objectives."
    },
    {
      icon: <Users size={48} className="text-electric-blue" />,
      title: "Cross-functional team leadership",
      description: "Skilled at leading diverse teams across technical and business domains, fostering collaboration and driving results."
    },
    {
      icon: <Cpu size={48} className="text-electric-blue" />,
      title: "Agile, DevOps & data analytics expertise",
      description: "Deep knowledge of Agile methodologies, DevOps practices, and data analytics tools to optimize development and decision-making."
    }
  ];

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="py-24 px-4 bg-dark-grey opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-electric-blue">
          Key Highlights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              ref={(el) => cardRefs.current[index] = el}
              className="bg-light-grey p-10 rounded-xl shadow-xl border border-transparent hover:border-electric-blue hover:shadow-2xl hover:shadow-electric-blue/10 transition-all duration-500 opacity-0 translate-y-10 group"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{highlight.icon}</div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-electric-blue transition-colors duration-300">{highlight.title}</h3>
              <p className="text-text-medium leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;