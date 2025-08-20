import React from "react";
import { Github, Linkedin, Twitter, Mail, Youtube } from "lucide-react";
import "./Footer.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Edwardvee",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/lautaro-iv%C3%A1n-quiroga-8467a5315/",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/edwardvee",
      icon: Twitter,
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/@Edwardveee",
      icon: Youtube,
    },
    {
      name: "Email",
      url: "mailto:quirogalautaroivan@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>{"<>Q</>"}</h3>
            <p>Una colección de proyectos que harían llorar a Terry Davis</p>
          </div>

          <div className="footer__section">
            <h4>Conectemos</h4>
            <div className="footer__social">
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={name}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Edwardvee. Ni un solo derecho reservado.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
