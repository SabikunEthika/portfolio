
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
const experiences = [
  {
    role: "Founder",
    organization: "Wingardium Leviosa",
    description:
      "Founded and managed an independent book venture, taking ownership of planning, operations, communication and business development.",
    type: "Entrepreneurship",
  },
  {
    role: "Event Management Coordinator",
    organization: "Ideal School and College",
    description:
      "Contributed to event planning and coordination, including collaborative activities and a literature quiz involving St. Joseph Higher Secondary School.",
    type: "Leadership and Organization",
  },
];

function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="BEYOND THE CODE"
          title="Experience and leadership."
        />

        <div className="experience-grid">
          {experiences.map((item, index) => (
            <Reveal
              key={item.role}
              delay={index * 0.15}
              direction={index % 2 === 0 ? "right" : "left"}
              className="fill"
            >
              <article className="experience-card">
                <span className="eyebrow">{item.type}</span>

                <span className="experience-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{item.role}</h3>
                <h4>{item.organization}</h4>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
