import SectionHeading from "../components/common/SectionHeading";

const education = [
  {
    institution: "Ahsanullah University of Science and Technology",
    degree: "BSc in Computer Science & Engineering",
    period: "2023 — Expected 2027",
    result: "Currently studying",
  },
  {
    institution: "Ideal School & College",
    degree: "Higher Secondary Certificate",
    period: "2021",
    result: "GPA 5.00",
  },
  {
    institution: "Ideal School & College, Banasree",
    degree: "Secondary School Certificate",
    period: "2019",
    result: "GPA 5.00",
  },
];

function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          eyebrow="ACADEMIC BACKGROUND"
          title="Education."
        />

        <div className="timeline">
          {education.map((item, index) => (
            <div className="timeline-item" key={item.institution}>
              <span className="timeline-marker" />

              <span className="timeline-period">{item.period}</span>

              <div>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <span className="timeline-result">{item.result}</span>
              </div>

              <span className="timeline-index">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;