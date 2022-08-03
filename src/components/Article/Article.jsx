import BackArrow from "../BackArrow";
import Hero from "../Hero";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {handleCloseArticle, content} = props;

   Article.propTypes = {
      handleCloseArticle: PropTypes.func,
      content: PropTypes.object
   };

   const heroContent = {
      heroSubtitle: content.title,
      image: content.mainImg,
      imageSm: content.mainImgBox,
      imageTint: 0.4,
      smallText: content.credit
   };

   return (
      <>
         <article
            className={styles.article}
         >
            <div className={styles.articleHead}>
               <Hero
                  content={heroContent}
                  article
                  staticTxt
               >
                  <BackArrow arrowStyle="Light" handleClick={handleCloseArticle} />
               </Hero>
            </div>
            <div className={`${styles.articleContent} container`}>
               {content.content}
               <BackArrow arrowStyle="Dark" handleClick={handleCloseArticle} />
            </div>
         </article>
      </>
   );
};

export default Article;
