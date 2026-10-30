import SectionHeading from "../components/common/SectionHeading";

const achievements = [
  {
    title: "Campus Ambassador",
    organization: "STC — Think of Career",
  },
  {
    title: "Adventure Resumption 1.0",
    organization: "Notre Dame Outward Bound Adventure Club",
  },
  {
    title: "Caza de Talento 1.0",
    organization: "Vinnorup",
  },
  {
    title: "Echo 1.0",
    organization: "International Speaking Contest",
  },
  {
    title: "Competitions & Hackathons",
    organization: "BUP, IUT and AUST",
  },
];

function Achievements() {
  return (
    <section className="section achievements-section" id="achievements">
      <div className="container">
        <SectionHeading
          eyebrow="ACTIVITIES & PARTICIPATION"
          title="Beyond academics."
        />

        <div className="achievement-list">
          {achievements.map((achievement, index) => (
            <div className="achievement-item" key={achievement.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>

              <div>
                <h3>{achievement.title}</h3>
                <p>{achievement.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;