import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Zap, Heart } from "lucide-react";
import "./Home.scss";

const Home: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: "Coding diario",
      description:
        "Diario... bueno es un termino ambigúo, idealmente mantendremos el compromiso.",
    },
    {
      icon: Zap,
      title: "Desarrollos de duración breve",
      description:
        "Para sumar dificultad, pondré un limite de tiempo en cada proyecto, este limite será directamente proporcional a la dificultad de la tarea.",
    },
    {
      icon: Heart,
      title: "Con su apoyo",
      description:
        "Todo lo que haga será libre para que ustedes lo prueben y me den feedback. Con un poco de suerte inspiraré a algun desarrollador primerizo.",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Bienvenido al <span className="hero__highlight">DEDsafio</span>
          </h1>

          <p className="hero__subtitle">
            Bueno no, más bien será un proyecto, o colección de estos, que
            quiero construir a largo plazo, tanto para mi como para todos
            ustedes.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features__title">¿Cómo funcionará?</h2>
        <div className="features__grid">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-card__icon">
                <Icon size={32} />
              </div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__description">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__content">
          <h2>Feeling bold today?</h2>
          <p>
            Revisa mis proyectos pasados, actuales, y los futuros... Bueno esos
            aún no.
          </p>
          <Link to="/projects" className="btn btn--primary">
            Entrar
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
