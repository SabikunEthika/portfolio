
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";

const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "PHP"],
  },
  {
    title: "Frontend Development",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "React Router"],
  },
  {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Laravel",
      "FastAPI",
      "ASP.NET Core",
    ],
  },
  {
    title: "Databases and ORM",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "MariaDB", "Prisma", "EF Core"],
  },
  {
    title: "Tools and Technologies",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "JWT",
      "Vercel",
      "Stripe API",
      "Gemini API",
    ],
  },
];

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="MY TOOLKIT"
          title="Skills and technologies."
          description="Technologies and tools I have worked with while building software projects."
        />

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.1} className="fill">
              <article className="skill-card">
                <span className="skill-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{group.title}</h3>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
