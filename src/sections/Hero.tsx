import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
} from "lucide-react";
import {
  Github,
  Linkedin,
  Facebook,
} from "lucide-brands";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-glow" />
      </div>

      <div className="container hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="eyebrow hero-eyebrow">
            COMPUTER SCIENCE & ENGINEERING
          </span>

          <p className="hero-greeting">Hello, I'm</p>

          <h1>
            Sabikun
            <br />
            <span>Alam.</span>
          </h1>

          <h2>Full-Stack Software Developer</h2>

          <p className="hero-description">
            I build end-to-end software solutions, from backend
            systems and application architecture to intuitive
            user experiences. I enjoy solving real-world problems
            through software engineering and practical AI integration.
          </p>

          <div className="hero-actions">
            <a
              href="/resume.pdf"
              download="Sabikun_Alam_Resume.pdf"
              className="button-primary"
            >
              Download Resume
              <Download size={15} />
            </a>

            <a href="#projects" className="button-outline">
              View Projects
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="hero-socials">
            <a
              href="https://github.com/SabikunEthika"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href="https://linkedin.com/in/sabikun027"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="https://www.facebook.com/sabikun.alam.ethika"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>

            <span className="social-divider" />

            <span className="hero-location">
              Dhaka, Bangladesh
            </span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="portrait-frame">
            <motion.img
              className="portrait-photo"
              src="/images/profile.jpg"
              alt="Portrait of Sabikun Alam"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll">
        <span>EXPLORE PORTFOLIO</span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}

export default Hero;