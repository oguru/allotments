import React, {useEffect, useRef, useState} from "react";
import Article from "../../components/Article";
import ArticleBox from "../../components/ArticleBox";
import CSSTransition from "react-transition-group/CSSTransition";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
// import {articleData} from "../../data/articleData.js";
import articlesImg from "../../images/dana-devolk-n_0wi_oruce-unsplash.jpg";
import articlesImgSm from "../../images/dana-devolk-n_0wi_oruce-unsplash-sm.jpg";
import styles from "./Articles.module.scss";

const Articles = (props) => {
   const {articlesJsx} = props;

   const articleRef = useRef(null);
   const boxesRef = useRef(null);

   Articles.propTypes = {
      articlesJsx: PropTypes.array
   };

   // const [state, dispatch] = useReducer(reducer, {}, init);
   const [currentArticle, setCurrentArticle] = useState(articlesJsx[0]);
   const [articleVisible, setArticleVisible] = useState(false);
   const [articleHeight, setArticleHeight] = useState("unset");
   // const [articleViewed, setArticleViewed] = useState(false);

   useEffect(() => {
      if (boxesRef.current) {
         if (articleVisible) {
            setArticleHeight("unset");

         } else {
            setArticleHeight(`${boxesRef.current.offsetHeight}px`);
         }
      }
   }, [articleVisible]);

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
      articleRef.current.scrollIntoView();
      // setArticleViewed(true);
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

   console.log(currentArticle[1]);

   return (
      <>
         <div
            className={`${styles.articlesCont}`}
            ref={articleRef}
         >
            <section
               className={`
                  ${styles.articlesMain} 
                  ${articleVisible ? styles.boxesOut : styles.boxesIn}`
               }
               ref={boxesRef}
            >
               <Hero
                  content={heroContent}
                  // staticText={articleViewed}
               />
               <div className={`${styles.articleBoxes} container`}>
                  {articleBoxes}
               </div>
            </section>

            <section
               className={`
                  ${styles.articleCont}
                  ${articleVisible ? styles.articleIn : styles.articleOut}`
               }
               style={{height: articleHeight}}
            >
               <Article
                  // title={}
                  content={currentArticle[1]}
                  closeArticle={() => setArticleVisible(false)}
               />
            </section>
         </div>

      </>
   );
};

export default Articles;
