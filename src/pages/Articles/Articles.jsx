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
import {pageCont} from "../../App.module.scss";

const Articles = (props) => {
   const {
      articlesJsx,
      isLargeScreen,
      setStaticTxt,
      staticTxt
   } = props;

   Articles.propTypes = {
      articlesJsx: PropTypes.array,
      isLargeScreen: PropTypes.bool,
      setStaticTxt: PropTypes.func,
      staticTxt: PropTypes.bool
   };

   const [currentArticle, setCurrentArticle] = useState(articlesJsx[0]);
   const [articleVisible, setArticleVisible] = useState(false);
   const [scrollPos, saveScrollPos] = useState(0);
   const pageContRef = useRef(null);

   const onRef = (node) => {
      if (node) {
         pageContRef.current = node;
      }
   };

   const setScrollPos = () => {
      setTimeout(() => {
         pageContRef.current.scrollTop = scrollPos;
      }, 500);
   };

   const scrollToTop = () => {
      setTimeout(() => {
         pageContRef.current.scrollTop = 0;
      }, 500);
   };

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

      if (!isLargeScreen) {
         image = articlesJsx[index].mainImg;
      }

      setCurrentArticle(articlesJsx[index]);
   };

   const handleShowArticle = (index) => {
      calcArticleJsx(index);
      setArticleVisible(true);
      saveScrollPos(pageContRef.current.scrollTop);
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
         previewImg={article.mainImgBox}
         previewImgAlt={article.mainImgAlt}
         handleShowArticle={() => handleShowArticle(index)}
         text={article.initText}
         title={article.title}
      />
   ));

   const animDir = articleVisible ? "slideLeft" : "slideRight";

   return (
      <>
         <div
            className={pageCont}
            ref={onRef}
         >
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
                        handleCloseArticle={closeArticle}
                     />
                  </section>
               </CSSTransition>
            </div>
         </div>
      </>
   );
};

export default Articles;
