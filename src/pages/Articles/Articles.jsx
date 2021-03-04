import React, {useState} from "react";
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

   Articles.propTypes = {
      articlesJsx: PropTypes.array
   };

   // const [state, dispatch] = useReducer(reducer, {}, init);
   const [currentArticle, setCurrentArticle] = useState([articlesJsx[0]]);
   const [articleVisible, setArticleVisible] = useState(false);

   // const reducer = (state, action) => {

   // };

   const heroContent = {
      heroTitle: "Articles & Tips",
      heroSubtitle: "Keep an eye out here for articles and tips to help you grow the most astonishing Aubergines, monstrous Marrows and the richest Rhubarb!",
      image: articlesImg,
      imageSm: articlesImgSm,
      imageTint: 0.4
   };

   const showArticle = (index) => {
      setArticleVisible(true);
      setCurrentArticle(articlesJsx[index]);
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

   return (
      <>
         <Hero
            content={heroContent}
         />
         <div className={`${styles.articlesCont} container`}>
            <section
               onClick={() => setArticleVisible(true)}
               className={`
                  ${styles.articleBoxes} 
                  ${articleVisible ? styles.boxesOut : styles.boxesIn}
                  container`
               }
            >
               {articleBoxes}
            </section>
            <section
               className={`
                  ${styles.articleCont}
                  ${articleVisible ? styles.articleIn : styles.articleOut}`
               }
               // onClick={() => setArticleVisible(false)}
            >
               <Article
                  // title={}
                  content={currentArticle[0][1]}
               />
            </section>
         </div>

      </>
   );
};

export default Articles;
