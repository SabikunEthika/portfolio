import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";

const achievements = [
  {
    title: "HULT PRIZE - FINALIST",
    organization: "BUTEX"
  },
  {
    title: "Argumentative Thesis- Winner",
    organization: "St. Joseph Higher Secondary School",
  },
];

function Achievements() {
  return (
    <section className="section achievements-section" id="achievements">
      <div className="container">
        <SectionHeading
          eyebrow="ACTIVITIES & PARTICIPATION"
          title="Beyond academics."
          description="The lending ledger: events, contests and communities I have taken part in."
        />

        <div className="ledger">
          <div className="ledger-head" aria-hidden="true">
            <span>No.</span>
            <span>Entry</span>
            <span>Held by</span>
          </div>

          {achievements.map((achievement, index) => (
            <Reveal
              key={achievement.title}
              delay={index * 0.08}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <div className="ledger-row">
                <span className="ledger-no">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{achievement.title}</h3>
                <p>{achievement.organization}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;