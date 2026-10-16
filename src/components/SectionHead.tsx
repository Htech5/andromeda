import Reveal from "./Reveal";

export default function SectionHead({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="sectionHead">
        <span className="sectionIndex">{index}</span>
        <h2 className="sectionTitle">{title}</h2>
      </div>
    </Reveal>
  );
}
