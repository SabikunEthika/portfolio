import { ArrowUp, FileText, Library, Mail } from "lucide-react";
import { Github, Linkedin } from "lucide-brands";
import Reveal from "../common/Reveal";

const navigate = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const elsewhere = [
  {
    label: "GitHub",
    href: "https://github.com/SabikunEthika",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sabikun027",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:alam.sabikun04@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "Résumé (PDF)",
    href: "/resume.pdf",
    icon: FileText,
    external: false,
  },
];

function Footer() {
  return (
    <footer className="footer ft">
      <div className="ft-rule" aria-hidden="true">
        <span />
      </div>

      <div className="container">
        <div className="ft-grid">
          <Reveal className="ft-brand">
            <a href="#home" className="ft-logo">
              <Library size={26} />
              <span>The Portfolio Archive</span>
            </a>

            <p>
              A catalogue of projects, credentials and ideas. Thoughtfully
              built, continuously evolving.
            </p>

            <span className="ft-status">
              <i /> Open to opportunities
            </span>
          </Reveal>

          <Reveal delay={0.1} className="ft-col">
            <h4>Index</h4>
            <ul className="ft-list ft-list-2col">
              {navigate.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="ft-col">
            <h4>Elsewhere</h4>
            <ul className="ft-list">
              {elsewhere.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      {...(link.label.startsWith("Résumé")
                        ? { download: "Resume.pdf" }
                        : {})}
                    >
                      <Icon size={15} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} All rights reserved.</span>

          <a href="#home" className="ft-top">
            Return to shelf <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;