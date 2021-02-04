import React from "react";
import styles from "./Hero.module.scss";

const Hero = (props) => {

  const {
    content: {
      heroSubtitle,
      heroTitle,
      homepageText,
      image
    },
    isActive
  } = props;
  

  const heroSize = isActive ? "flex-grow-1" : "";

  return (
    <>
      <div
        className={`
          ${heroSize}
          ${styles.heroCont}
          
          my-2
          `}
        // style={{backgroundImage:`linear-gradient(
        //   rgba(0, 0, 0, 0.2),
        //   rgba(0, 0, 0, 0.2)
        // ), url(${image}) `}}
      >
        <div 
          className={`
            ${styles.heroBg}
          `}
          style={{backgroundImage:`linear-gradient(
           rgba(0, 0, 0, 0.2),
           rgba(0, 0, 0, 0.2)
          ), url(${image}) `}}>
        </div>
        <div className={`${styles.heroText} container`}>
            <h1>{heroTitle}</h1>
            <h4>{heroSubtitle}</h4>
            <p className="mt-5">{homepageText || ""}</p>
        </div>
        {/* <p style={{border: "red solid 10px", color: "white"}}>{heroSize}</p> */}
      </div>
    </>
  );
};

export default Hero;
