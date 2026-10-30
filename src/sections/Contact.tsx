import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="LET'S CONNECT"
          title="Have an idea? Let's build something."
          description="I'm interested in meaningful projects, thoughtful collaboration and opportunities to keep learning."
        />

        <div className="contact-grid">
          <a href="mailto:alam.sabikun04@gmail.com" className="contact-item">
            <Mail size={20} />
            <div>
              <span>Email</span>
              <p>alam.sabikun04@gmail.com</p>
            </div>
            <ArrowUpRight size={17} />
          </a>

          <a href="tel:+8801895654284" className="contact-item">
            <Phone size={20} />
            <div>
              <span>Phone</span>
              <p>+880 1895-654284</p>
            </div>
            <ArrowUpRight size={17} />
          </a>

          <div className="contact-item">
            <MapPin size={20} />
            <div>
              <span>Location</span>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <a
          href="https://linkedin.com/in/sabikun027"
          target="_blank"
          rel="noreferrer"
          className="button-primary contact-button"
        >
          Connect on LinkedIn
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

export default Contact;