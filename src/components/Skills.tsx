import React, { useEffect, useRef } from 'react';
import { Code, Database, Server, BarChart3, Github, Layers, Gitlab } from 'lucide-react';

const Skills: React.FC = () => {
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

  const skills = [
    { icon: <Code size={40} />, name: "ASP.NET Core" },
    { icon: <Layers size={40} />, name: "Angular" },
    { icon: <Code size={40} />, name: "C#" },
    { icon: <Server size={40} />, name: "Microservices" },
    { icon: <Database size={40} />, name: "SQL Server" },
    { icon: <BarChart3 size={40} />, name: "Power BI" },
    { icon: <Github size={40} />, name: "DevOps" },
    { icon: <Gitlab size={40} />, name: "CI/CD" }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 bg-light-grey opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-electric-blue">
          Tech & Skills
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => itemRefs.current[index] = el}
              className="flex flex-col items-center opacity-0 translate-y-10 transition-all duration-500 group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-4 rounded-xl bg-electric-blue/10 text-electric-blue transform transition-all duration-300 group-hover:scale-125 group-hover:bg-electric-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-electric-blue/30">
                {skill.icon}
              </div>
              <p className="text-center font-medium group-hover:text-electric-blue transition-colors duration-300">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;