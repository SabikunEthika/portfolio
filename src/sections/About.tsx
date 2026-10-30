import { motion } from "framer-motion";
import SectionHeading from "../components/common/SectionHeading";

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <SectionHeading
            eyebrow="A LITTLE ABOUT ME"
            title="Building with curiosity and purpose."
          />
        </div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p>
            I'm a Computer Science and Engineering student at Ahsanullah
            University of Science and Technology, interested in software
            development, full-stack engineering and artificial intelligence.
          </p>

          <p>
            I enjoy turning ideas into practical applications, exploring
            how systems work behind the interface, and understanding the
            decisions that make software reliable and useful.
          </p>

          <p>
            Beyond programming, I have developed an interest in leadership,
            event organization, communication and building independent
            initiatives.
          </p>

          <div className="about-note">
            <span>MY APPROACH</span>
            <p>
              Learn continuously. Understand deeply. Build responsibly.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;