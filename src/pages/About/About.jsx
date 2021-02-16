import Hero from "../../components/Hero";
import React from "react";
import aboutImg from "../../images/prince-abid-iy1k44aa4uq-unsplash.jpg";
import styles from "./About.module.scss";

const About = () => {

   const heroContent = {
      heroTitle: "About Stechford Allotments",
      heroSubtitle: "Where we started and how to get involved",
      image: aboutImg
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
