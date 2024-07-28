import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  GithubIcon,
  Twitter,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { MyInfo } from "./@types";

export default function Sidebar({info}: {info: MyInfo | null}) {
  const [isOpen, setIsOpen] = useState(false);
  const fullName = info ? `${info.firstName} ${info.lastName}` : undefined;
  
  

  return (
    <aside className={"sidebar" + (isOpen ? " active" : "")}>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={info?.displayPic} alt={fullName} width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title={fullName}>
            {fullName || "Loading..."}
          </h1>

          <p className="title">{info?.title}</p>
        </div>

        <button className="info_more-btn flex gap-2" onClick={() => setIsOpen(!isOpen)}>
          <span>Show Contacts</span>
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <Mail size={24} />
            </div>

            <div className="contact-info">
              <p className="contact-title">Email</p>

              <a href={`mailto:${info?.email}`} className="contact-link">
                {info?.email}
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Phone size={24} />
            </div>

            <div className="contact-info">
              <p className="contact-title">Phone</p>

              <a href={`tel:${info?.phoneNumber}`} className="contact-link">
                {info?.phoneNumber}
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <MapPin size={24} />
            </div>

            <div className="contact-info">
              <p className="contact-title">Location</p>

              <address>{info?.location}</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a href={info?.linkedin} className="social-link">
              <Linkedin size={15} />
            </a>
          </li>

          <li className="social-item">
            <a href={info?.twitter} className="social-link">
              <Twitter size={15} />
            </a>
          </li>

          <li className="social-item">
            <a href={info?.instagram} className="social-link">
              <Instagram size={15} />
            </a>
          </li>

          <li className="social-item">
            <a href={info?.github} className="social-link">
              <GithubIcon size={15} />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
