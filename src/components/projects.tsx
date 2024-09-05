import { ChevronDown, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type Project } from "./@types";
import { useFirebase } from "./firebase";
import { Link } from "lucide-react";
import Badge from "./badge";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1025 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  laptop: {
    breakpoint: { max: 1024, min: 769 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function Project({
  name,
  images,
  link,
  onClick,
}: Project & {
  onClick: () => void;
}) {
  return (
    <li className="project-item active">
      <a>
        <figure className="project-img">
          <div
            className="project-item-icon-box z-20"
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            <Eye size={20} />
          </div>

          <img src={images[0]} alt={name} loading="lazy" />
        </figure>
      </a>
      <a
        className="flex items-center justify-center w-full gap-1"
        href={link || "#"}
      >
        <h3 className="text-lg text-bold">{name}</h3>
        {/* <Link className="text-orange-yellow-crayola" size={15} /> */}
      </a>
    </li>
  );
}

function ProjectModal({
  name,
  link,
  images,
  description,
  tags,
  technologies,
  handleClose,
}: Project & {
  handleClose: () => void;
}) {
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <div className="modal-container active" onClick={handleClose}>
      <div className="overlay"></div>
      <div
        className="modal flex-col overflow-auto has-scrollbar max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between items-baseline">
          <button className="modal-close-btn" onClick={handleClose}>
            <span className="sr-only">Close</span>
            <X size={15} />
          </button>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>

        <div className="">
          <ul className="flex gap-2">
            {tags.map((tag, idx) => (
              <li key={idx} className="">
                #{tag.replace(" ", "-")}
              </li>
            ))}
          </ul>
          <Carousel
            swipeable
            draggable={false}
            showDots={true}
            responsive={responsive}
            infinite={false}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px p-2"
          >
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                className="w-96 h-auto rounded-sm"
                alt={name}
              />
            ))}
          </Carousel>

          <div className="modal-content">
            <h6 className="font-bold mt-2">Technologies</h6>
            <ul className="flex flex-wrap gap-2 mt-1 mb-4">
              {technologies.map((technology, idx) => (
                <Badge key={idx}>{technology}</Badge>
              ))}
            </ul>
            <h6 className="font-bold mt-2">Description</h6>
            <div
              className="mt-1 mb-4 text-sm space-y-2 project-description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <button className="text-black bg-[#ffdb70] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2">
              <a
                href={link}
                target="_blank"
                className="btn btn-primary flex gap-2 items-center"
              >
                View Project
                <Eye size={15} />
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterList({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}) {
  return (
    <ul className={"filter-list text-nowrap flex-wrap"}>
      {categories.map((category, idx) => (
        <li className="filter-item" key={idx}>
          <button
            className={
              "capitalize px-1" +
              (category === selectedCategory ? " active" : "")
            }
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}

function FilterSelectBox({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="filter-select-box">
      <button
        className={"filter-select" + (isOpen ? " active" : "")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="select-value">
          {selectedCategory === null ? "Select category" : selectedCategory}
        </div>

        <div className="select-icon">
          <ChevronDown size={24} />
        </div>
      </button>

      <ul className="select-list">
        {categories.map((category, idx) => (
          <li className="select-item" key={idx}>
            <button
              className={
                "capitalize" + (category === selectedCategory ? " active" : "")
              }
              onClick={() => {
                setSelectedCategory(category);
                setIsOpen(false);
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Projects({ isActive }: { isActive: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const firebase = useFirebase();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    firebase.getAllProjects().then((projects): void => {
      setProjects(projects);
      const categories = Array.from(
        new Set(projects.map((project) => project.tags).flat())
      );
      categories.unshift("All");
      setCategories(categories);
    });
  }, []);

  return (
    <article className={"portfolio" + (isActive ? " active" : "")}>
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>
      {activeProject && (
        <ProjectModal
          {...activeProject}
          handleClose={() => setActiveProject(null)}
        />
      )}
      <section className="projects">
        <FilterList
          {...{
            categories: categories,
            selectedCategory,
            setSelectedCategory,
          }}
        />
        <FilterSelectBox
          {...{
            categories: categories,
            selectedCategory,
            setSelectedCategory,
          }}
        />
        <ul className="project-list">
          {projects
            .filter(
              (project) =>
                selectedCategory === "All" ||
                selectedCategory === null ||
                project.tags.includes(selectedCategory)
            )
            .map((project, idx) => (
              <Project
                key={idx}
                {...project}
                onClick={() => setActiveProject(project)}
              />
            ))}
        </ul>
      </section>
    </article>
  );
}
