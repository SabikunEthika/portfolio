
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Certificates from "../sections/Certificates";
import Contact from "../sections/Contact";
import Achievements from "../sections/Achievements";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Achievements />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default Home;
