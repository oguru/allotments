import Button from "../Button";
import Hero from "../Hero";
import React, {useEffect, useState} from "react";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {closeArticle, content} = props;

   const heroContent = {
      // heroTitle: content.title,
      heroSubtitle: content.title,
      image: content.MainImg,
      imageSm: content.MainImgSm,
      imageTint: 0.4,
      smallText: content.credit
   };

   return (
      <>
         {props ?
            <article
               className={styles.article}
            >
               <div className={styles.articleHead}>
                  <Hero content={heroContent} staticTxt/>
               </div>
               <div className={`${styles.articleContent} container`}>
                  <Button
                     handleClick={closeArticle}
                     text="Back"
                  />
                  {content.content}
               </div>

            </article> : null
         }
      </>
   );
};

export default Article;
