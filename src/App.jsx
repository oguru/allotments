// import "./global.scss";
import React, {useEffect, useState, useRef} from "react";
import {mainImagesInit, mainImagesLg} from "./images/imageImports.js";
import About from "./pages/About";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import {Route} from "react-router-dom";
import {articleData} from "./data/articleData.js";
import articleStyles from "./components/Article/Article.module.scss";
import styles from "./App.module.scss";

const App = () => {

   const [articlesJsx, setArticlesJsx] = useState([]);
   const [isLargeScreen, setIsLargeScreen] = useState(true);
   const [isLoading, setIsLoading] = useState(true);
   // const [routes, setRoutes] = useState();
   const [scrollPos, saveScrollPos] = useState(0);
   const [staticTxt, setStaticTxt] = useState({
      about: false,
      articles: false,
      home: false,
      info: false
   });
   const [windowWidth, setWindowWidth] = useState();

   const pageContRef = useRef(null);

   const onRef = (node) => {
      if (node) {
         pageContRef.current = node;
      }
   };

   useEffect(() => {
      getArticlesJsx();
      // getRoutes();
   }, []);

   // useEffect(() => {
   //    const getWidth = () => setWindowWidth(window.innerWidth);

   //    window.addEventListener("resize", getWidth);
   //    getWidth();
   // }, []);

   useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");

      handleMediaQueryChange(mediaQuery);
      mediaQuery.addEventListener("change", (mQuery) => handleMediaQueryChange(mQuery));

      return () => {
         mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
   }, []);

   const handleMediaQueryChange = mQuery => {
      if (mQuery.matches) {
         setIsLargeScreen(true);
      } else {
         setIsLargeScreen(false);
      }
   };

   const buildEl = el => {
      const imgCaption = el.caption ? `${articleStyles.imgCaption}` : "";

      if (el.floatImage) {
         return (
            <>
               <img alt={el.alt} className={`${articleStyles[el.floatDir]} ${imgCaption}`} src={el.floatImage} />
               {el.content.map(subEl =>
                  // <div key={subEl.text || subEl.li}>
                  buildEl(subEl)
                  // </div>
               )}
            </>
         );
      }

      return (
         <>
            {el.subHeading &&
               <h5>{el.subHeading}</h5>
            }
            {el.bold &&
               <p className={`
                  ${articleStyles.bold} 
                  ${articleStyles.articleTxt}`
               }>
                  {el.bold}
               </p>
            }
            {el.li &&
               <ul>
                  {el.li.map(li => <li key={li}>{li}</li>)}
               </ul>
            }
            {el.liText &&
               <ul className={articleStyles.liText}>
                  {el.liText.map(liText => <li key={liText}>{liText}</li>)}
               </ul>
            }
            {el.imageSm && el.imageLg &&
                  <img
                     alt={el.alt}
                     className={`${articleStyles.blockImg} ${imgCaption}`}
                     srcSet={`${el.imageSm} 300w, ${el.imageLg} 1024w`}
                     src={el.imageSm} />
            }
            {el.splitImage &&
               <div className={`
                  ${articleStyles.splitImgCont} 
                  ${imgCaption}`
               }>
                  <img
                     alt={el.splitImage.img1.alt}
                     className={articleStyles.splitImage}
                     src={el.splitImage.img1.img}
                  />
                  <img
                     alt={el.splitImage.img2.alt}
                     className={articleStyles.splitImage}
                     src={el.splitImage.img2.img}
                  />
               </div>
            }
            {el.text &&
               <p className={`
                  ${imgCaption} 
                  ${articleStyles.articleTxt}`
               }>
                  {el.text}
               </p>
            }
            {el.link &&
               <a
                  className={articleStyles.articleLink}
                  href={el.link}
                  rel="noreferrer"
                  target="_blank"
               >
                  {el.link}
               </a>
            }
         </>
      );
   };

   const getArticlesJsx = () => {
      const articles = articleData.map(article => {
         return {
            credit: article.credit,
            id: article.id,
            mainImg: article.mainImg,
            mainImgBox: article.mainImgBox,
            mainImgAlt: article.mainImgAlt,
            path: article.path,
            title: article.title,
            initText: article.content[0].text,
            content: article.content.map(el =>
               // <div key={el.id}>
               buildEl(el)
               // </div>
            )
         };
      });
      setArticlesJsx(articles);
   };

   const routes = [
      {
         path: "/",
         name: "Home"
      },
      {
         path: "/about",
         name: "About"
      },
      {
         path: "/info",
         name: "Info"
      },
      {
         path: "/articles",
         name: "Articles"
      }
   ];

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

   const saveScrollVal = () => {
      saveScrollPos(pageContRef.current.scrollTop);
   };

   const components = {
      "About":
         <About
            setStaticTxt={setStaticTxt}
            staticTxt={staticTxt.about}
         />,
      "Articles":
         <Articles
            articlesJsx={articlesJsx}
            saveScrollPos={() => saveScrollVal()}
            scrollToTop={() => scrollToTop()}
            setScrollPos={() => setScrollPos()}
            setStaticTxt={setStaticTxt}
            staticTxt={staticTxt.articles}
            windowWidth={windowWidth}
         />,
      "Home":
         <Home
            setStaticTxt={setStaticTxt}
            staticTxt={staticTxt.home}
         />,
      "Info":
         <Info
            setStaticTxt={setStaticTxt}
            staticTxt={staticTxt.info}
         />
   };

   const counter = useRef(0);

   const imageLoaded = () => {
      counter.current += 1;

      if (counter.current >= mainImagesInit.length) {
         setIsLoading(false);
      }
   };

   const transitionTime = isLargeScreen ? 400 : 800;

   // const checkScrollPos = () => {
   //    return pageContRef.current.scrollTop;
   // };

   return (
      <div className={styles.app}>
         <NavBar
            isLargeScreen={isLargeScreen}
            routes={routes}
         />
         {/* {articlesJsx.map(el => {
            return <>
               {el[1].title}
               {el[1].content}
            </>;
         })} */}
         <section className={styles.mainBody}>
            <div
               className={styles.preCacheHidden}
               data-test="preCacheHidden"
            >
               {mainImagesInit.map(img => (
                  <img
                     src={img.src}
                     onLoad={imageLoaded}
                     key={img.src}
                     alt={img.alt}
                  />
               ))}

               {/* {isLoading ?
                  null :
                  mainImagesLg.map(img => (
                     <img
                        src={img.src}
                        key={img.src}
                        alt={img.alt}
                     />
                  ))
               } */}
            </div>
            {isLoading ?
               <div
                  className={styles.loaderCont}
                  data-test="loaderCont"
               >
                  <span className={styles.loader}>
                     <span></span>
                     <span></span>
                  </span>
               </div> :
               routes.map(route => (
                  <Route
                     key={route.path}
                     exact path={route.path}
                  >
                     {({match}) => (
                        <div
                           className={styles.mainPage}
                           data-test="pageComponent"
                        >
                           <CSSTransition
                              classNames={{...styles}}
                              in={match != null}
                              // nodeRef={pageContRef}
                              timeout={transitionTime}
                              unmountOnExit
                           >
                              <div
                                 className={styles.pageCont}
                                 ref={onRef}
                              >
                                 {components[route.name]}
                              </div>
                           </CSSTransition>
                        </div>
                     )}
                  </Route>
               ))
            }
         </section>
         <footer
            className={styles.footerStyles}
            data-test="footer"
         >
            <p>
               © 2021 Copyright:
               <a href="/"> Stechford Allotments</a>
            </p>
         </footer>
      </div>
   );
};

export default App;