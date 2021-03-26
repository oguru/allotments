// import "./global.scss";
import React, {useEffect, useState, useRef} from "react";
import {mainImagesInit, mainImagesLg} from "./images/imageImports.js";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import {Route} from "react-router-dom";
import {articleData} from "./data/articleData.js";
import firebase from "./firebase";
import getArticlesJsx from "./pages/Articles/articleBuilder.jsx";
import getNoticesJsx from "./pages/Info/noticeBuilder.jsx";
import styles from "./App.module.scss";

const App = () => {

   const [articlesJsx, setArticlesJsx] = useState([]);
   const [loggedIn, setLoggedIn] = useState(true);
   const [notices, setNotices] = useState([]);
   const [isLargeScreen, setIsLargeScreen] = useState(true);
   const [isLoading, setIsLoading] = useState(true);
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
      if (!isLoading) {
         const articles = getArticlesJsx(articleData);
         setArticlesJsx(articles);

         getNoticesJsx(setNotices);
      }
   }, [isLoading]);

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
         path: "/admin",
         name: "Admin"
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
      "Admin":
         <Admin
            loggedIn={loggedIn}
            notices={notices}
            setLoggedIn={setLoggedIn}
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
            notices={notices}
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
                        <CSSTransition
                           classNames={{...styles}}
                           in={match != null}
                           // nodeRef={pageContRef}
                           timeout={transitionTime}
                           unmountOnExit
                        >
                           <div
                              className={styles.mainPage}
                              data-test="pageComponent"
                           >
                              <div
                                 className={styles.pageCont}
                                 ref={onRef}
                              >
                                 {components[route.name]}
                              </div>
                           </div>
                        </CSSTransition>
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