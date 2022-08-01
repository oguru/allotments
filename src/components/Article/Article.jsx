import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Hero from "../Hero";
import PropTypes from "prop-types";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import styles from "./Article.module.scss";

const Article = (props) => {
   const {closeArticle, content} = props;

   Article.propTypes = {
      closeArticle: PropTypes.func,
      content: PropTypes.object
   };

   const backHoverStyle = useRef("");

   const setBackHoverStyle = (style) => {
      backHoverStyle.current = style;
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
                  />
               </div>
               <div className={`${styles.articleContent} container`}>
                  {content.content}
                  <div
                     className={`${styles.backArrowCont}`}
                     onMouseEnter={() => setBackHoverStyle("backHover")}
                     onMouseLeave={() => setBackHoverStyle("")}
                     onClick={closeArticle}
                  >
                     <span className={`
                        ${styles.backBorder} 
                        ${styles[backHoverStyle.current]}`
                     }></span>
                     <FontAwesomeIcon
                        className={styles.backArrow}
                        icon={faAngleLeft}
                     />
                     <p>BACK</p>
                  </div>
               </div>
            </article> : null
         }

      </>
   );
};

export default Article;
