import { currProjectsInfo } from "../../../utils/projectsInfo";
import { ProjectCard } from "./ProjectCard";
import "./Projects.scss";
export function Projects() {
  return (
    <>
      <div className="projects">
        <div className="projects__grid">
          {currProjectsInfo.projects.map((v, i) => (
            <ProjectCard
              name={v.name}
              description={v.description}
              duration={v.duration}
              path={v.path}
            />
          ))}
        </div>
      </div>
    </>
  );
}
