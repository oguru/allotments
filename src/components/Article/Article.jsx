import React from "react";
import Hero from "../Hero";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {content} = props;

   const heroContent = {
      // heroTitle: content.title,
      heroSubtitle: content.title,
      image: content.mainImg,
      imageSm: content.mainImgThumb,
      imageTint: 0.4
   };

   return (
      <>
         <article className={styles.article}>
            {/* <h4>
               {content.title}
            </h4> */}
            <div className={styles.articleHead}>
               <Hero content={heroContent} />
            </div>
            <div className={styles.articleContent}>
               {content.content}
            </div>

         </article>
      </>
   );
};

export default Article;
