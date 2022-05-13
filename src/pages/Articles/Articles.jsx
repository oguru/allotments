import React, {useEffect, useRef, useState} from "react";
import Article from "../../components/Article";
import ArticleBox from "../../components/ArticleBox";
import CSSTransition from "react-transition-group/CSSTransition";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
// import {contentData} from "../../data/contentData.js";
import articlesImg from "../../images/articles-main-lg.jpg";
import articlesImgSm from "../../images/articles-main-sm.jpg";
import styles from "./Articles.module.scss";
import globalStyles from "../../global.scss";

const Articles = (props) => {
   const {
      articlesJsx,
      saveScrollPos,
      scrollToTop,
      setScrollPos,
      setStaticTxt,
      staticTxt,
      windowWidth
   } = props;

   Articles.propTypes = {
      articlesJsx: PropTypes.array,
      saveScrollPos: PropTypes.func,
      scrollToTop: PropTypes.func,
      setScrollPos: PropTypes.func,
      setStaticTxt: PropTypes.func,
      staticTxt: PropTypes.bool,
      windowWidth: PropTypes.number
   };

   const [currentArticle, setCurrentArticle] = useState(articlesJsx[0]);
   const [articleVisible, setArticleVisible] = useState(false);

   useEffect(() => {
      if (!staticTxt) {
         setTimeout(() => {
            setStaticTxt(prevState => ({
               ...prevState,
               articles: true
            }));
         }, 3000);
      }
   }, []);

   const heroContent = {
      heroTitle: "Articles & Tips",
      heroSubtitle: "Keep an eye out here for articles and tips to help you grow the most astonishing Aubergines, monstrous Marrows and the richest Rhubarb!",
      image: articlesImg,
      imageSm: articlesImgSm,
      imageTint: 0.4
   };

   const calcArticleJsx = (index) => {
      let image;

      if (windowWidth < 768) {
         image = articlesJsx[index].mainImg;
      }

      setCurrentArticle(articlesJsx[index]);
   };

   const showArticle = (index) => {
      calcArticleJsx(index);
      setArticleVisible(true);
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
         key={article.id}
         mainImg={article.mainImgBox}
         mainImgAlt={article.mainImgAlt}
         showArticle={() => showArticle(index)}
         text={article.initText}
         title={article.title}
      />
   ));

   const animDir = articleVisible ? "slideLeft" : "slideRight";

   return (
      <>
         <div className={`
            ${styles.articlesCont} 
            ${styles[animDir]}`
         }>
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
                     staticTxt={staticTxt}
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
                     content={currentArticle}
                     closeArticle={() => closeArticle()}
                  />
               </section>
            </CSSTransition>
         </div>
      </>
   );
};

export default Articles;
