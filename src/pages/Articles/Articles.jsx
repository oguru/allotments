import React, {useEffect, useRef, useState} from "react";
import Article from "../../components/Article";
import ArticleBox from "../../components/ArticleBox";
import CSSTransition from "react-transition-group/CSSTransition";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
// import {articleData} from "../../data/articleData.js";
import articlesImg from "../../images/dana-devolk-n_0wi_oruce-unsplash.jpg";
import articlesImgSm from "../../images/dana-devolk-n_0wi_oruce-unsplash-sm.jpg";
import styles from "./Articles.module.scss";

const Articles = (props) => {
   const {articlesJsx, saveScrollPos, scrollToTop, setScrollPos} = props;

   Articles.propTypes = {
      articlesJsx: PropTypes.array,
      saveScrollPos: PropTypes.func,
      scrollToTop: PropTypes.func,
      setScrollPos: PropTypes.func
   };

   const [currentArticle, setCurrentArticle] = useState(articlesJsx[0]);
   const [articleVisible, setArticleVisible] = useState(false);
   const [articleViewed, setArticleViewed] = useState(false);

   const heroContent = {
      heroTitle: "Articles & Tips",
      heroSubtitle: "Keep an eye out here for articles and tips to help you grow the most astonishing Aubergines, monstrous Marrows and the richest Rhubarb!",
      image: articlesImg,
      imageSm: articlesImgSm,
      imageTint: 0.4
   };

   const showArticle = (index) => {
      setCurrentArticle(articlesJsx[index]);
      setArticleVisible(true);
      setArticleViewed(true);
      saveScrollPos();
      setTimeout(() => {
         scrollToTop();
      }, 500);
   };

   const closeArticle = () => {
      setArticleVisible(false);
      setTimeout(() => {
         setScrollPos();
      }, 500);
   };

   const articleBoxes = articlesJsx.map((article, index) => (
      <ArticleBox
         key={article[1].id}
         mainImg={article[1].mainImgThumb}
         mainImgAlt={article[1].mainImgAlt}
         showArticle={() => showArticle(index)}
         text={article[1].initText}
         title={article[1].title}
      />
   ));

   const animDir = articleVisible ? "slideLeft" : "slideRight";

   return (
      <>
         <div
            className={`${styles.articlesCont} ${styles[animDir]}`}
         >

            <CSSTransition
               classNames={{...styles}}
               in={!articleVisible}
               timeout={1000}
            >
               <section
                  className={`${styles.articlesMain}`}
               >
                  <Hero
                     content={heroContent}
                     staticTxt={articleViewed}
                  />
                  <div className={`${styles.articleBoxes} container`}>
                     {articleBoxes}
                  </div>
               </section>
            </CSSTransition>

            <CSSTransition
               classNames={{...styles}}
               in={articleVisible}
               timeout={1500}
               unmountOnExit
            >
               <section
                  className={`${styles.articleCont}`}
               >
                  <Article
                     content={currentArticle[1]}
                     closeArticle={() => closeArticle()}
                  />
               </section>
            </CSSTransition>

         </div>

      </>
   );
};

export default Articles;
