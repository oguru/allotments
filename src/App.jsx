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
import {articlesData} from "./data/contentData.js";
import {firestore} from "./firebase.js";
import {getContentJsx} from "./util/articleBuilder.jsx";
import styles from "./App.module.scss";
import {formatDate} from "./util/utils.js";
import StaticTxtProvider from "./context/staticTxtContext.js";

const App = () => {

   // const [aboutJsx, setAboutJsx] = useState();
   const [articlesJsx, setArticlesJsx] = useState([]);
   const [loggedIn, setLoggedIn] = useState(false);
   const [notices, setNotices] = useState([]);
   const [isLargeScreen, setIsLargeScreen] = useState(true);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (!isLoading) {
         const articles = getContentJsx(articlesData, true);
         setArticlesJsx(articles);

         // const about = getContentJsx(aboutData);
         // setAboutJsx(about);

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
         <About
            // aboutJsx={aboutJsx}
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
         {/* {articlesJsx.map(el => {
            return <>
               {el[1].title}
               {el[1].content}
            </>;
         })} */}
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
                  <div
                     className={styles.loaderCont}
                     data-test="loaderCont"
                  >
                     <span className={styles.loader}>
                        <span></span>
                        <span></span>
                     </span>
                  </div>
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