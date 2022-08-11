import React, {useRef, useState, useMemo} from "react";
import Article from "../../components/Article";
import ArticleBox from "../../components/ArticleBox";
import CSSTransition from "react-transition-group/CSSTransition";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import articlesImg from "../../images/articles-main-lg.jpg";
import articlesImgSm from "../../images/articles-main-sm.jpg";
import {pageCont} from "../../App.module.scss";
import styles from "./Articles.module.scss";

const Articles = ({articlesJsx}) => {
   Articles.propTypes = {
      articlesJsx: PropTypes.arrayOf(PropTypes.object)
   };

   const pageContRef = React.useRef(null);
   const currentArticle = useRef(articlesJsx[0]);
   const scrollPos = useRef(0);
   const [articleVisible, setArticleVisible] = useState(false);

   const heroContent = {
      id: "articles",
      heroTitle: "Articles & Tips",
      heroSubtitle: "Keep an eye out here for articles and tips to help you grow the most astonishing Aubergines, monstrous Marrows and the richest Rhubarb!",
      image: articlesImg,
      imageSm: articlesImgSm,
      imageTint: 0.4
   };

   const articleBoxes = useMemo(() => articlesJsx.map((article, index) => (
      <ArticleBox
         key={article.id}
         previewImg={article.mainImgBox}
         previewImgAlt={article.mainImgAlt}
         handleShowArticle={() => handleShowArticle(index)}
         index={index}
         text={article.initText}
         title={article.title}
      />
   )), [articlesJsx]);

   const setScrollPos = () => {
      setTimeout(() => {
         pageContRef.current.scrollTop = scrollPos.current;
      }, 500);
   };

   const scrollToTop = () => {
      setTimeout(() => {
         pageContRef.current.scrollTop = 0;
      }, 500);
   };

   const handleShowArticle = (index) => {
      currentArticle.current = articlesJsx[index];
      scrollPos.current = pageContRef.current.scrollTop;
      setArticleVisible(true);
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

   return (
      <>
         <div
            className={pageCont}
            data-test="articlesPageContainer"
            ref={pageContRef}
         >
            <div className={`
               ${styles.articlesCont} 
               ${styles[articleVisible ? "slideLeft" : "slideRight"]}`}
            data-test="articlesContainer"
            >
               <CSSTransition
                  classNames={{...styles}}
                  in={!articleVisible}
                  timeout={1000}
               >
                  <section
                     className={`${styles.articlesMain}`}
                     data-test="articlesMain"
                  >
                     <Hero
                        content={heroContent}
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
                        content={currentArticle.current}
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
