import "./firebaseui-styling.global.css";
import React, {useEffect, useState, useRef} from "react";
import {homeImages, mainImagesInit} from "./images/imageExports.js";
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
import styles from "./App.module.scss";
import {useImageSize} from "./context/imageSizeContext";
import {useScreenSize} from "./context/screenSizeContext";

const App = () => {
   const [articlesJsx, setArticlesJsx] = useState([]);
   const [notices, setNotices] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const {isMobileNav} = useScreenSize();
   const {getImageSize} = useImageSize();
   const aboutRef = useRef(null);
   const infoRef = useRef(null);
   const articlesRef = useRef(null);
   const homeRef = useRef(null);

   const homeImgSize = getImageSize("home");
   const homeImage = homeImages.mainImg[homeImgSize];
   const updatedInitImages = [
      ...mainImagesInit,
      {src: homeImage,
         id: "home"}
   ];
   const pageRefs = {
      about: aboutRef,
      info: infoRef,
      articles: articlesRef,
      home: homeRef
   };

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
         <Articles articlesJsx={articlesJsx} />,
      "Home":
         <Home image={homeImage} />,
      "Info":
         <Info notices={notices} />
   };

   const counter = useRef(0);

   const imageLoaded = () => {
      counter.current += 1;

      if (counter.current >= updatedInitImages.length) {
         setIsLoading(false);
      }
   };

   return (
      <div className={styles.app}>
         <NavBar routes={routes} />
         <section className={styles.mainBody}>
            {isLoading ?
               <>
                  <div
                     className={styles.preCacheHidden}
                     data-test="preCacheHidden"
                  >
                     {updatedInitImages.map(img => (
                        <img
                           src={img.src}
                           onLoad={imageLoaded}
                           key={img.id}
                           alt="hidden initialiser"
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
                              nodeRef={pageRefs[route.name.toLowerCase()]}
                              timeout={isMobileNav ? 800 : 400}
                              unmountOnExit
                           >
                              <div
                                 className={styles.mainPage}
                                 data-test="pageComponent"
                                 ref={pageRefs[route.name.toLowerCase()]}
                              >
                                 {route.name === "Articles" ?
                                    components[route.name] :
                                    (
                                       <div className={styles.pageCont}>
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