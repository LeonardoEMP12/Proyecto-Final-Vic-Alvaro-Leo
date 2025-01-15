import React from "react";
import "../../styles/generos.css";
import { Link } from "react-router-dom";

const Card = ({ href, iconClass, title, description }) => (
  <div  className="col-12 col-sm-6 col-md-3 col-lg-3 mt-4">
    <div id="tarjetaGen" className="card d-flex align-items-center justify-content-center">
      <div className="face face1">
        <div className="content">
          <div className="icon">
            <i className={iconClass} aria-hidden="true" aria-label={title}></i>
          </div>
        </div>
      </div>
      <div className="face face2">
        <div className="content">
          <h3>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const CardGen = () => {
  const profiles = [
    {
      href: "https://www.linkedin.com/in/adamdipinto/",
      iconClass: "",
      title: "_adamdipinto",
      description: "This is where I network and build my professional portfolio.",
    },
    {
      href: "https://twitter.com/AdamDipinto",
      iconClass: "",
      title: "@AdamDipinto",
      description: "This is where I read news and network with different social groups.",
    },
    {
      href: "https://github.com/atom888",
      iconClass: "",
      title: "atom888",
      description: "This is where I share code and work on projects.",
    },
    {
      href: "https://github.com/atom888",
      iconClass: "",
      title: "atom888",
      description: "This is where I share code and work on projects.",
    },
    {
        href: "https://www.linkedin.com/in/adamdipinto/",
        iconClass: "",
        title: "_adamdipinto",
        description: "This is where I network and build my professional portfolio.",
      },
      {
        href: "https://www.linkedin.com/in/adamdipinto/",
        iconClass: "",
        title: "_adamdipinto",
        description: "This is where I network and build my professional portfolio.",
      },
      {
        href: "https://www.linkedin.com/in/adamdipinto/",
        iconClass: "",
        title: "_adamdipinto",
        description: "This is where I network and build my professional portfolio.",
      },
      {
        href: "https://www.linkedin.com/in/adamdipinto/",
        iconClass: "fa fa-linkedin-square",
        title: "_adamdipinto",
        description: "This is where I network and build my professional portfolio.",
      },
  ];

  return (
    <div id="Generos" className="container-fluid">
      <div className="row">
        {profiles.map((profile, index) => (
          <Card
            key={index}
            href={profile.href}
            iconClass={profile.iconClass}
            title={profile.title}
            description={profile.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGen;