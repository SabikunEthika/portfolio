import { ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <a href="#home" className="footer-logo">
            Sabikun<span>.</span>
          </a>

          <p>Thoughtfully built. Continuously evolving.</p>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
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

            <a href="#home" aria-label="Back to top">
              <ArrowUpRight size={18} />
            </a>
          </div>

          <span>© {new Date().getFullYear()} Sabikun Alam Ethika</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;