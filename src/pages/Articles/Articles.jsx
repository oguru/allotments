import Hero from "../../components/Hero";
import React from "react";
import articlesImg from "../../images/dana-devolk-n_0wi_oruce-unsplash.jpg";
import articlesImgSm from "../../images/dana-devolk-n_0wi_oruce-unsplash-sm.jpg";
import styles from "./Articles.module.scss";

const Articles = () => {

   const heroContent = {
      heroTitle: "Articles & Tips",
      heroSubtitle: "Keep an eye out here for articles and tips to help you grow the most astonishing Aubergines, monstrous Marrows and the richest Rhubarb!",
      image: articlesImg,
      imageSm: articlesImgSm,
      imageTint: 0.4
   };

   return (
      <>
         <Hero
            content={heroContent}
         />
      </>
   );
};

export default Articles;
