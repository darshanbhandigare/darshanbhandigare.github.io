import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsSection({ projects }) {
  return (
    <section id="projects">
      <SectionHeader number="04" title="Projects" />
      <div className="projects-layout">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
