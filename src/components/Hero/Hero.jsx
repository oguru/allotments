import React from "react";
import styles from "./Hero.module.scss";

const Hero = (props) => {

  const {
    // heroSubtitle,
    // heroTitle,
    // homepageText,
    content: {
      heroSubtitle,
      heroTitle,
      homepageText,
      image
    },
    // image,
    isActive
  } = props;
  

  const heroSize = isActive ? "flex-grow-1" : "";

  return (
    <>
      <div
        className={`
          ${heroSize}
          ${styles.hero}
          hero-img
          jumbotron
          jumbotron-fluid
          overflow-hidden
          my-2`}
        style={{backgroundImage:`url(${image})`}}
      >
        <div class="container">
            <h1>{heroTitle}</h1>
            <h4>{heroSubtitle}</h4>
            <p class="mt-5">{homepageText || ""}</p>
        </div>
        {/* <p style={{border: "red solid 10px", color: "white"}}>{heroSize}</p> */}
      </div>
    </>
  );
};

export default Hero;
