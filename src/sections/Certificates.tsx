import { useEffect, useState } from "react";
import { X, ZoomIn, ExternalLink, ChevronDown } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import PdfThumb from "../components/common/PdfThumb";

type Certificate = {
  number: number;
  title: string;
  issuer: string;
  file: string;
  type: "image" | "pdf";
};

const certificates: Certificate[] = [
  {
    number: 1,
    title: "Think of Career",
    issuer: "STC",
    file: "/certificates/1.jpg",
    type: "image",
  },
  {
    number: 2,
    title: "Adventure Resumption 1.0",
    issuer: "Notre Dame Outward Bound Adventure Club",
    file: "/certificates/2.jpg",
    type: "image",
  },
  {
    number: 3,
    title: "Echo 1.0",
    issuer: "International Speaking Contest",
    file: "/certificates/3.jpg",
    type: "image",
  },
  {
    number: 4,
    title: "Certificate 04",
    issuer: "Recognition",
    file: "/certificates/4.jpg",
    type: "image",
  },
  {
    number: 5,
    title: "Certificate 05",
    issuer: "Recognition",
    file: "/certificates/5.jpg",
    type: "image",
  },
  ...Array.from({ length: 11 }, (_, index) => ({
    number: index + 6,
    title: `Certificate ${String(index + 6).padStart(2, "0")}`,
    issuer: "Academic and extracurricular",
    file: `/certificates/${index + 6}.pdf`,
    type: "pdf" as const,
  })),
];

const INITIAL_COUNT = 12;

function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll
    ? certificates
    : certificates.slice(0, INITIAL_COUNT);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="section certificates-section" id="certificates">
      <div className="container">
        <SectionHeading
          eyebrow="LEARNING AND RECOGNITION"
          title="Certificates and credentials."
          description="Filed in the drawer: recognitions from academic and extracurricular activities."
        />

        <div className="cert-grid">
          {visible.map((certificate, index) => (
            <Reveal
              key={certificate.number}
              delay={(index % 6) * 0.06}
              className="fill"
            >
              <article className="cert-card">
                <button
                  type="button"
                  className="cert-preview"
                  onClick={() => setSelected(certificate)}
                  aria-label={`View ${certificate.title}`}
                >
                  <span className="cert-tab">
                    No. {String(certificate.number).padStart(2, "0")}
                  </span>

                  {certificate.type === "image" ? (
                    <img
                      src={certificate.file}
                      alt={certificate.title}
                      loading="lazy"
                    />
                                 ) : (
                    <PdfThumb
                      file={certificate.file}
                      title={certificate.title}
                    />
                  )}

                  <span className="cert-zoom">
                    <ZoomIn size={16} />
                  </span>
                </button>

                <div className="cert-info">
                  <h3>{certificate.title}</h3>
                  <p>{certificate.issuer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {certificates.length > INITIAL_COUNT && (
          <Reveal>
            <button
              type="button"
              className="cert-toggle"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
            >
              {showAll
                ? "Close the drawer"
                : `Open the full drawer (${certificates.length})`}
              <ChevronDown
                size={16}
                className={showAll ? "cert-chevron flip" : "cert-chevron"}
              />
            </button>
          </Reveal>
        )}
      </div>

      {selected && (
        <div
          className="certificate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="certificate-modal">
            <div className="certificate-modal-header">
              <span>{selected.title}</span>

              <div className="certificate-modal-actions">
                <a
                  href={selected.file}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open original certificate"
                  title="Open original"
                >
                  <ExternalLink size={19} />
                </a>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close certificate"
                  title="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="certificate-modal-content">
              {selected.type === "image" ? (
                <img src={selected.file} alt={selected.title} />
              ) : (
                <iframe
                  src={`${selected.file}#toolbar=1&navpanes=0`}
                  title={selected.title}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificates;