import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";

const slips = [
  {
    label: "Correspondence",
    value: "alam.sabikun04@gmail.com",
    href: "mailto:alam.sabikun04@gmail.com",
    icon: Mail,
  },
  {
    label: "Telephone",
    value: "+880 1895-654284",
    href: "tel:+8801895654284",
    icon: Phone,
  },
  {
    label: "Reading room",
    value: "Dhaka, Bangladesh",
    icon: MapPin,
  },
];

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="LET'S CONNECT"
          title="Have an idea? Let's build something."
          description="I'm interested in meaningful projects, thoughtful collaboration and opportunities to keep learning."
        />

        <div className="ct-grid">
          {slips.map((slip, index) => {
            const Icon = slip.icon;

            const content = (
              <>
                <span className="ct-tape" aria-hidden="true" />
                <span className="ct-icon">
                  <Icon size={20} />
                </span>
                <span className="ct-label">{slip.label}</span>
                <span className="ct-value">{slip.value}</span>
                {slip.href && (
                  <ArrowUpRight size={18} className="ct-arrow" />
                )}
              </>
            );

            return (
              <Reveal
                key={slip.label}
                delay={index * 0.12}
                direction="up"
                className="fill"
              >
                {slip.href ? (
                  <a href={slip.href} className="ct-slip">
                    {content}
                  </a>
                ) : (
                  <div className="ct-slip">{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <a
            href="https://linkedin.com/in/sabikun027"
            target="_blank"
            rel="noreferrer"
            className="button-primary contact-button"
          >
            Connect on LinkedIn
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;