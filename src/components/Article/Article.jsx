import BackArrow from "../BackArrow";
import Hero from "../Hero";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Article.module.scss";
import {useScreenSize} from "../../context/screenSizeContext";

const Article = (props) => {
   const {handleCloseArticle, content} = props;

   const {screenSize: imgSize} = useScreenSize();

   const heroContent = {
      id: "article",
      heroSubtitle: content.title,
      image: content.mainImg[imgSize],
      imageInit: imgSize === "sm" ? null : content.mainImg.sm,
      imageTint: 0.4,
      smallText: content.credit
   };

   return (
      <>
         <article
            className={styles.article}
            data-test="article"
         >
            <div className={styles.articleHead}>
               <Hero
                  content={heroContent}
               >
                  <BackArrow
                     arrowStyle="Light"
                     handleClick={handleCloseArticle}
                  />
               </Hero>
            </div>
            <div className={`${styles.articleContent} container`}>
               {content.content}
               <BackArrow
                  arrowStyle="Dark"
                  handleClick={handleCloseArticle}
               />
            </div>
         </article>
      </>
   );
};

Article.propTypes = {
   handleCloseArticle: PropTypes.func,
   content: PropTypes.object
};

export default Article;
