import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>

        <h2>{title}</h2>

        {description && <p className="section-description">{description}</p>}
      </div>
    </Reveal>
  );
}

export default SectionHeading;