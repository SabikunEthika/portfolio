import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Factory, GraduationCap, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";

type EducationItem = {
  institution: string;
  degree: string;
  level: string;
  period: string;
  result: string;
  numeral: string;
  icon: LucideIcon;
};

const education: EducationItem[] = [
  {
    institution: "Ahsanullah University of Science and Technology",
    degree: "BSc in Computer Science & Engineering",
    level: "Undergraduate",
    period: "2023 — Expected 2027",
    result: "Currently studying",
    numeral: "IV",
    icon: GraduationCap,
  },
  {
    institution: "Bangladesh University of Textiles (BUTEX)",
    degree: "BSc in Yarn Engineering",
    level: "Undergraduate",
    period: "2022 — 2023",
    result: "Left to pursue CSE",
    numeral: "III",
    icon: Factory,
  },
  {
    institution: "Ideal School & College",
    degree: "Higher Secondary Certificate",
    level: "College",
    period: "2021",
    result: "GPA 5.00",
    numeral: "II",
    icon: BookOpen,
  },
  {
    institution: "Ideal School & College, Banasree",
    degree: "Secondary School Certificate",
    level: "School",
    period: "2019",
    result: "GPA 5.00",
    numeral: "I",
    icon: ScrollText,
  },
];

function Education() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section" id="education">
      <div className="container">
        <SectionHeading
          eyebrow="ACADEMIC BACKGROUND"
          title="Education."
          description="The reading list so far, shelved in order of study."
        />

        <div className="edu-track" ref={trackRef}>
          <div className="edu-rail">
            <motion.span className="edu-rail-fill" style={{ scaleY }} />
          </div>

          {education.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.degree}
                className="edu-entry"
                direction={index % 2 === 0 ? "right" : "left"}
                delay={0.05}
              >
                <span className="edu-node">
                  <Icon size={16} />
                </span>

                <div className="edu-card">
                  <span className="edu-numeral" aria-hidden="true">
                    {item.numeral}
                  </span>

                  <div className="edu-plate">
                    <span className="plate-level">{item.level}</span>
                    <span className="plate-period">{item.period}</span>
                  </div>

                  <div className="edu-main">
                    <h3>{item.degree}</h3>
                    <p>{item.institution}</p>
                  </div>

                  <div className="edu-result">{item.result}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;