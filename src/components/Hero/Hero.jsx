import React from "react";
import styles from "./Hero.module.scss";

const Hero = (image) => {

  const {
    heroSubtitle,
    heroTitle,
    homepageText,
    image
  } = props;
  
  // Model.Name == "Home" ? "flex-grow-1" : null
  return (
    <>
      <div 
        className="
          hero-img
          jumbotron
          jumbotron-fluid
          my-2"
        style={`background-image:url(${image})`}
      >
        <div class="container">
            <h1>{heroTitle}</h1>
            <h4>{heroSubtitle}</h4>
            <p class="mt-5">{homepageText || ""}</p>
        </div>
    </div>
    </>
  );
};

export default Hero;
