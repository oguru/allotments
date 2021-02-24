import Hero from "../../components/Hero";
import React from "react";
import infoImg from "../../images/thom-holmes-3w9aalszgo0-unsplash.jpg";
import infoImgSm from "../../images/thom-holmes-3w9aalszgo0-unsplash-sm.jpg";
import styles from "./Info.module.scss";

const Info = () => {

   const heroContent = {
      heroTitle: "Plot Information & What's New",
      heroSubtitle: "Explore different plots to suit your needs and find updates and current news here",
      image: infoImg,
      imageSm: infoImgSm,
      imageTint: 0.45
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
