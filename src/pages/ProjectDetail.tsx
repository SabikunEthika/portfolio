import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <main className="project-detail-page">
      <div className="container project-detail-container">
        <Link className="back-link" to="/#projects"><ArrowLeft size={17} /> Back to projects</Link>
        <img className="project-detail-image" src={project.image} alt={`${project.name} project preview`} />
        <p className="eyebrow">{project.category}</p>
        <h1>{project.name}</h1>
        <p className="project-detail-intro">{project.description}</p>

        <div className="project-detail-actions">
          {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={16} /></a> : <span className="project-unavailable">Live demo currently unavailable</span>}
          <a href={project.github} target="_blank" rel="noreferrer"><Code2 size={16} /> Client GitHub repository <ArrowUpRight size={15} /></a>
        </div>

        <div className="project-detail-grid">
          <section><h2>Main technology stack</h2><div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></section>
          <section><h2>Project description</h2><p>{project.description}</p></section>
          <section><h2>Challenges faced</h2><ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></section>
          <section><h2>Potential improvements &amp; future plans</h2><ul>{project.futurePlans.map((plan) => <li key={plan}>{plan}</li>)}</ul></section>
        </div>
      </div>
    </main>
  );
}

export default ProjectDetail;
