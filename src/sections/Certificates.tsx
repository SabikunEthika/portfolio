
import { useEffect, useState } from "react";
import { X, ZoomIn, ExternalLink } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

type Certificate = {
  number: number;
  title: string;
  issuer: string;
  description: string;
  file: string;
  type: "image" | "pdf";
};

const certificates: Certificate[] = [
  {
    number: 1,
    title: "Think of Career",
    issuer: "STC",
    description: "Campus Ambassador recognition.",
    file: "/certificates/1.jpg",
    type: "image",
  },
  {
    number: 2,
    title: "Adventure Resumption 1.0",
    issuer: "Notre Dame Outward Bound Adventure Club",
    description: "Participation recognition.",
    file: "/certificates/2.jpg",
    type: "image",
  },
  {
    number: 3,
    title: "Echo 1.0",
    issuer: "International Speaking Contest",
    description: "Speaking contest recognition.",
    file: "/certificates/3.jpg",
    type: "image",
  },
  {
    number: 4,
    title: "Certificate 04",
    issuer: "Recognition",
    description: "Certificate of achievement and participation.",
    file: "/certificates/4.jpg",
    type: "image",
  },
  {
    number: 5,
    title: "Certificate 05",
    issuer: "Recognition",
    description: "Certificate of achievement and participation.",
    file: "/certificates/5.jpg",
    type: "image",
  },
  ...Array.from({ length: 11 }, (_, index) => ({
    number: index + 6,
    title: `Certificate ${String(index + 6).padStart(2, "0")}`,
    issuer: "Academic and extracurricular recognition",
    description: "Certificate of achievement and participation.",
    file: `/certificates/${index + 6}.pdf`,
    type: "pdf" as const,
  })),
];

function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
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
          description="A collection of certificates and recognitions from academic, extracurricular and professional activities."
        />

        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <article className="certificate-card" key={certificate.number}>
              <button
                type="button"
                className="certificate-preview"
                onClick={() => setSelected(certificate)}
                aria-label={`View ${certificate.title}`}
              >
                {certificate.type === "image" ? (
                  <img
                    src={certificate.file}
                    alt={certificate.title}
                    loading="lazy"
                  />
                ) : (
                  <iframe
                    src={`${certificate.file}#page=1&toolbar=0&navpanes=0`}
                    title={`${certificate.title} preview`}
                    loading="lazy"
                    tabIndex={-1}
                  />
                )}

                <span className="certificate-zoom">
                  <ZoomIn size={19} />
                  View certificate
                </span>
              </button>

              <div className="certificate-info">
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
                <p>{certificate.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="certificate-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
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
