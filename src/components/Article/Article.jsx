import BackArrow from "../BackArrow";
import Hero from "../Hero";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {closeArticle, content} = props;

   Article.propTypes = {
      closeArticle: PropTypes.func,
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
         {props ?
            <article
               className={styles.article}
            >
               <div className={styles.articleHead}>
                  <Hero
                     closeArticle={closeArticle}
                     content={heroContent}
                     article
                     staticTxt
                  >
                     <BackArrow arrowStyle="Light" handleClick={closeArticle} />
                  </Hero>
               </div>
               <div className={`${styles.articleContent} container`}>
                  {content.content}
                  <BackArrow arrowStyle="Dark" handleClick={closeArticle} />
               </div>
            </article> : null
         }
      </>
   );
};

export default Article;
