import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import { projects } from "../data/projects";

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Things I've built."
          description="A selection of software projects, experiments and practical solutions."
        />

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.12} className="fill">
              <article className="project-card">
                <img
                  className="project-image"
                  src={project.image}
                  alt={`${project.name} project preview`}
                />
                <div className="project-card-content">
                  <div className="project-top">
                    <span className="project-number">{project.number}</span>
                    <span className="project-category">{project.category}</span>
                  </div>

                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>

                  <Link className="project-details-link" to={`/projects/${project.slug}`}>
                    View details <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
