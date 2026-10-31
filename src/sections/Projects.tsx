
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
const featuredProjects = [
  {
    number: "01",
    name: "ResumeOrbit",
    category: "AI / Full-Stack Development",
    description:
      "An AI-powered resume analyzer that evaluates resumes, identifies skill gaps and provides actionable feedback for job applications.",
    technologies: ["React", "TypeScript", "FastAPI", "Gemini"],
    github: "https://github.com/SabikunEthika/AI_ResumeAnalyzer",
  },
  {
    number: "02",
    name: "GetTally",
    category: "AI / SaaS / Full-Stack Development",
    description:
      "A chat-native order and earnings tracker designed to help small online sellers manage sales through natural-language and voice-based interactions.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Gemini"],
    github: "https://github.com/SabikunEthika/GetTally",
  },
  {
    number: "03",
    name: "CareMeds",
    category: "Healthcare / E-commerce",
    description:
      "A medicine availability and ordering platform designed to make medicine discovery and delivery more accessible.",
    technologies: ["React", "TypeScript", "Laravel", "MySQL"],
    github: "https://github.com/SabikunEthika/CareMeds",
    live: "https://care-meds-sd.vercel.app/",
  },
  {
    number: "04",
    name: "Ed-Bridge",
    category: "Education / Full-Stack Development",
    description:
      "An academic resource-sharing and collaboration platform designed to connect students with useful learning resources.",
    technologies: ["React", "ASP.NET Core", "EF Core", "MySQL"],
    github: "https://github.com/SabikunEthika/Ed-Bridge",
    live: "https://ed-bridge-mu.vercel.app/",
  },
  {
    number: "05",
    name: "GridWise Energy Optimizer",
    category: "AI / Optimization",
    description:
      "An energy optimization project developed for the BUP 2026 showcase, combining AI with mathematical optimization.",
    technologies: ["Python", "FastAPI", "Gemini", "PuLP"],
    github: "https://github.com/SabikunEthika/GridWise-Energy-Optimizer",
    live: "https://gridwise-bup-2026-i1n0.onrender.com/docs",
  },
];

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
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.number}
              delay={(index % 2) * 0.12}
              className="fill"
            >
              <article className="project-card">
                <div className="project-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                </div>

                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="project-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub <ArrowUpRight size={15} />
                  </a>

                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live project <ArrowUpRight size={15} />
                    </a>
                  )}
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
