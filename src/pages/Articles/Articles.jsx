import Hero from "../../components/Hero";
import React from "react";
import articlesImg from "../../images/dana-devolk-n_0wi_oruce-unsplash.jpg";
import styles from "./Articles.module.scss";

const Articles = () => {

   const heroContent = {
      heroTitle: "Articles & Tips",
      heroSubtitle: "Keep an eye out here for articles and tips to help you grow the most astonishing Aubergines, monstrous Marrows and the richest Rhubarb!",
      image: articlesImg
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
