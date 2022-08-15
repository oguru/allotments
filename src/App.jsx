// import "./global.scss";
import "./firebaseui-styling.global.css";
import React, {useEffect, useState, useRef} from "react";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import {Route} from "react-router-dom";
import StaticTxtProvider from "./context/staticTxtContext.js";
import {articlesData} from "./data/contentData.js";
import {firestore} from "./services/firebase.js";
import {formatDate} from "./util/utils.js";
import {getContentJsx} from "./util/articleBuilder.jsx";
import {mainImagesInit} from "./images/imageImports.js";
import styles from "./App.module.scss";

const App = () => {
   const [articlesJsx, setArticlesJsx] = useState([]);
   const [notices, setNotices] = useState([]);
   const [isLargeScreen, setIsLargeScreen] = useState(true);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (!isLoading) {
         const articles = getContentJsx(articlesData, true);
         setArticlesJsx(articles);

         firestore
            .collection("notices")
            .orderBy("date", "desc").onSnapshot(snapshot => {
               const items = [];

               snapshot.forEach(item => {
                  const itemDate = formatDate(item
                     .data()
                     .date
                     .toDate());

                  const id = item.id;

                  items.push({
                     ...item.data(),
                     date: itemDate,
                     id
                  });
               });
               setNotices(items);
            });
      }
   }, [isLoading]);

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

   const components = {
      "About":
         <About />,
      "Admin":
         <Admin notices={notices} />,
      "Articles":
         <Articles
            articlesJsx={articlesJsx}
            isLargeScreen={isLargeScreen}
         />,
      "Home":
         <Home />,
      "Info":
         <Info notices={notices} />
   };

   const counter = useRef(0);

   const imageLoaded = () => {
      counter.current += 1;

      if (counter.current >= mainImagesInit.length) {
         setIsLoading(false);
      }
   };

   return (
      <div className={styles.app}>
         <NavBar
            isLargeScreen={isLargeScreen}
            routes={routes}
         />
         <section className={styles.mainBody}>
            {isLoading ?
               <>
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
                  </div>
                  <LoadingSpinner isPrimary={true} />
               </> :
               <StaticTxtProvider>
                  {routes.map(route => (
                     <Route
                        key={route.path}
                        exact path={route.path}
                     >
                        {({match}) => (
                           <CSSTransition
                              classNames={{...styles}}
                              in={match != null}
                              timeout={isLargeScreen ? 400 : 800}
                              unmountOnExit
                           >
                              <div
                                 className={styles.mainPage}
                                 data-test="pageComponent"
                              >
                                 {route.name === "Articles" ?
                                    components[route.name] :
                                    (
                                       <div
                                          className={styles.pageCont}
                                       >
                                          {components[route.name]}
                                       </div>

                                    )}
                              </div>
                           </CSSTransition>
                        )}
                     </Route>
                  ))}
               </StaticTxtProvider>
            }
         </section>
         <footer
            className={styles.footerStyles}
            data-test="footer"
         >
            <p>
               © 2021 Copyright:
               <a href="/"> Francis Road Allotments</a>
            </p>
         </footer>
      </div>
   );
};

export default App;