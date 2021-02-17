import Hero from "../../components/Hero";
import React from "react";
// import articlesImg from "../../images/thom-holmes-3w9aalszgo0-unsplash.jpg";
import styles from "./Info.module.scss";

const Info = ({articlesImg}) => {

   const heroContent = {
      heroTitle: "Plot Information & What's New",
      heroSubtitle: "Explore different plots to suit your needs and find updates and current news here",
      image: articlesImg,
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

export default Info;
