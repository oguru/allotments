import Button from "../Button";
import Hero from "../Hero";
import React from "react";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {closeArticle, content} = props;

   const heroContent = {
      // heroTitle: content.title,
      heroSubtitle: content.title,
      image: content.mainImg,
      imageSm: content.mainImgThumb,
      imageTint: 0.4,
      smallText: content.credit
   };

   return (
      <>
         {props ?
            <article
               className={styles.article}
               // onClick={closeArticle}
            >
               {/* <h4>
               {content.title}
            </h4> */}
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
