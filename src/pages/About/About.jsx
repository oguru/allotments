import Hero from "../../components/Hero";
import React from "react";
import aboutImg from "../../images/about-main.jpg";
import aboutImgSm from "../../images/about-main-sm.jpg";
import styles from "./About.module.scss";

const About = () => {

   const heroContent = {
      heroTitle: "About Us",
      heroSubtitle: "Where we started and how to get involved",
      image: aboutImg,
      imageSm: aboutImgSm,
      imageTint: 0.5

   };

   return (
      <>
         <Hero
            content={heroContent}
         />
      </>
   );
};

export default About;
