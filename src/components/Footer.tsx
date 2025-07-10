import React from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-grey py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-6">
            <a 
              href="https://linkedin.com/in/srikanth-gunti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-medium hover:text-electric-blue transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com/srikanthgunti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-medium hover:text-electric-blue transition-colors duration-300"
              aria-label="Twitter Profile"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://github.com/srikanthgunti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-medium hover:text-electric-blue transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a 
              href="mailto:srikanthg.leo@gmail.com" 
              className="text-text-medium hover:text-electric-blue transition-colors duration-300"
              aria-label="Email Contact"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <p className="text-text-medium text-center">
            © {new Date().getFullYear()} Srikant Gunti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;