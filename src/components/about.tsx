import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFirebase } from "./firebase";
import { Client, MyInfo, Service, Testimonial } from "./@types";
import { Quote } from "lucide-react";

function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getAllServices().then(setServices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="service">
      <h3 className="text-2xl font-bold service-title">What I'm Doing</h3>

      <ul className="service-list">
        {services.map((service, idx) => (
          <li className="service-item" key={idx}>
            <div className="service-icon-box">
              <img src={service.icon} alt={service.name} width="40" />
            </div>

            <div className="service-content-box">
              <h4 className="h4 service-item-title">{service.name}</h4>

              <p className="service-item-text">{service.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getAllTestimonials().then(setTestimonials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="testimonials">
      {activeTestimonial && (
        <TestimonialModal
          {...activeTestimonial}
          handleClose={() => {
            setActiveTestimonial(null);
          }}
        />
      )}
      <h3 className="h3 testimonials-title">Testimonials</h3>

      <ul className="testimonials-list has-scrollbar">
        {testimonials.map((testimonial, idx) => (
          <li className="testimonials-item" key={idx}>
            <div
              className="content-card"
              onClick={(e) => {
                setActiveTestimonial(testimonial);
                e.stopPropagation();
              }}
            >
              <figure className="testimonials-avatar-box shadow-lg absolute top-2 left-0 rounded-2xl flex justify-center items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-[80px] rounded-xl"
                />
              </figure>
              <div className="testimonials-item-title">
                <h4 className="text-xl font-bold">{testimonial.name}</h4>
                <p className="text-xs font-mono font-bold text-orange-yellow-crayola">
                  {testimonial.title}
                </p>
              </div>
              <div className="testimonials-text">
                <p>{testimonial.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TestimonialModal({
  image: avatar,
  name,
  text,
  title,
  handleClose,
}: Testimonial & {
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

      <section className="modal">
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={15} />
        </button>

        <div className="modal-img-wrapper">
          <figure className="modal-avatar-box flex justify-center items-center rounded-2xl mb-2">
            <img src={avatar} alt={name} className="w-[80px] rounded-xl" />
          </figure>
          <Quote size={40} className="mt-4 text-orange-yellow-crayola"/>
        </div>

        <div className="modal-content">
          <h4 className="h3 modal-title">{name}</h4>
          <p className="text-xs font-mono font-bold text-orange-yellow-crayola mb-2">
            {title}
          </p>

          <div>
            <p>{text}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getAllClients().then(setClients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="clients">
      <h3 className="h3 clients-title">Clients</h3>

      <ul className="clients-list has-scrollbar">
        {clients.map((client, idx) => (
          <li className="clients-item" key={idx}>
            <a href={client.link}>
              <img src={client.logo} alt="client logo" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function About({
  isActive,
  info,
}: {
  isActive: boolean;
  info: MyInfo | null;
}) {
  return (
    <article
      className={"about" + (isActive ? " active" : "")}
    >
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section
        className="about-text"
        dangerouslySetInnerHTML={{ __html: info?.about || "loading..." }}
      />

      <Services />
      {/* <Testimonials /> */}
      <Clients />
    </article>
  );
}
