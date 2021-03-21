import React, {useEffect, useState} from "react";
import Button from "../Button";
import Hero from "../Hero";
import PropTypes from "prop-types";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {closeArticle, content} = props;

   Article.propTypes = {
      closeArticle: PropTypes.func,
      content: PropTypes.object
   };

   const heroContent = {
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
                  <Hero
                     closeArticle={closeArticle}
                     content={heroContent}
                     article
                     staticTxt
                  />
               </div>
               <div className={`${styles.articleContent} container`}>
                  {/* <Button
                     handleClick={closeArticle}
                     text="Back"
                  /> */}
                  {content.content}
               </div>

            </article> : null
         }
      </>
   );
};

export default Article;
