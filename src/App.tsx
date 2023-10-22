import "./firebaseui-styling.global.css";
import React, {useEffect, useState, useRef, ReactNode, RefObject, MutableRefObject} from "react";
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
import StaticTxtProvider from "./context/staticTxtContext.tsx";
import {articlesData} from "./data/contentData.js";
import {firestore} from "./services/firebase.js";
import {formatDate} from "./util/utils.js";
import {getContentJsx} from "./util/articleBuilder.jsx";
import styles from "./App.module.scss";
import {useImageSize} from "./context/imageSizeContext.tsx";
import {useScreenSize} from "./context/screenSizeContext.tsx";
import { MainImageTypes } from "./images/main/mainImages";
import { ComponentObject as JSXElementsObject, FirestoreNoticeType, LocalNoticeType, RouteData, PageRef as DivRefsObject } from "./types";

const App = () => {
   const [articlesJsx, setArticlesJsx] = useState([]);
   const [notices, setNotices] = useState<LocalNoticeType[] | []>([]);
   const [isLoading, setIsLoading] = useState(true);
   const {mobileNav} = useScreenSize();
   const {handleImageSize: handleImageSize} = useImageSize();
   const aboutRef = useRef<HTMLDivElement>(null);
   const infoRef = useRef<HTMLDivElement>(null);
   const articlesRef = useRef<HTMLDivElement>(null);
   const homeRef = useRef<HTMLDivElement>(null);

   const homeImgSize: keyof MainImageTypes["mainImg"] = handleImageSize("home");
   const homeImage = homeImages.mainImg[homeImgSize];
   const updatedInitImages = [
      ...mainImagesInit,
      {src: homeImage,
         id: "home"}
   ];

   const pageRefs: DivRefsObject = {
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
               const items = [] as LocalNoticeType[];

               snapshot.forEach(item => {
                  const itemDate = formatDate(item
                     .data()
                     .date
                     .toDate());

                  const id = item.id;

                  items.push({
                     ...(item.data() as FirestoreNoticeType),
                     date: itemDate,
                     id
                  } as LocalNoticeType);
               });
               setNotices(items);
            });
      }
   }, [isLoading]);

   const counter = useRef(0);

   const imageLoaded = () => {
      counter.current += 1;

      if (counter.current >= updatedInitImages.length) {
         setIsLoading(false);
      }
   };

   const routes: RouteData[] | JSX.Element[] = [
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

   const components: JSXElementsObject = {
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

   return (
      <div className={styles.app}>
         <NavBar routes={routes} />
         <section className={styles.mainBody}>
            {isLoading ? (
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
               </> 
            ) : (
               <StaticTxtProvider>
                  {routes.map((route: RouteData): JSX.Element => (
                     <Route
                        key={route.path}
                        exact path={route.path}
                     >
                        {({match}) => (
                           <CSSTransition
                              classNames={{...styles}}
                              in={match != null}
                              nodeRef={pageRefs[route.name.toLowerCase()]}
                              timeout={mobileNav ? 800 : 400}
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
            )}
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