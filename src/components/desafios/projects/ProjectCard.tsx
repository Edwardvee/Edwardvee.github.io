interface ProjectProps {
  name: string;
  description: string;
  duration: string;
  path: string;
}
import "./ProjectCard.scss";
import { Link } from "react-router-dom";
export function ProjectCard({
  name,
  description,
  duration,
  path,
}: ProjectProps) {
  return (
    <div key={name} className="project-card">
      <Link to={"/" + path}>
        <h3 className="project-card__title">{name}</h3>
        <p className="project-card__description">{description}</p>
        <p className="project-card__description">Tiempo total: {duration}</p>
      </Link>
    </div>
  );
}
