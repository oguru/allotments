import React, {useEffect, useState, useRef} from "react";
import {imagesInitial, imagesLg} from "./images/mainImages.js";
import About from "./pages/About";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import {Route} from "react-router-dom";
import styles from "./App.module.scss";

const App = () => {

   const [isLargeScreen, setIsLargeScreen] = useState(true);
   const [isLoading, setIsLoading] = useState(true);

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
         path: "/articles",
         name: "Articles"
      }
   ];

   const components = {
      "About": <About />,
      "Articles": <Articles />,
      "Home": <Home />,
      "Info": <Info />
   };

   const counter = useRef(0);

   const imageLoaded = () => {
      counter.current += 1;

      if (counter.current >= imagesInitial.length) {
         setIsLoading(false);
      }
   };

   const transitionTime = isLargeScreen ? 400 : 800;

   return (
      <div className={styles.app}>
         <NavBar
            isLargeScreen={isLargeScreen}
            routes={routes}
         />
         <section>
            <div
               className={styles.preCacheHidden}
               data-test="preCacheHidden"
            >
               {imagesInitial.map(img => (
                  <img
                     src={img.src}
                     onLoad={imageLoaded}
                     key={img.src}
                     alt={img.alt}
                  />
               ))}

               {isLoading ?
                  null :
                  imagesLg.map(img => (
                     <img
                        src={img.src}
                        key={img.src}
                        alt={img.alt}
                     />
                  ))
               }
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
                           className={styles.mainBody}
                           data-test="pageComponent"
                        >
                           <CSSTransition
                              classNames={{...styles}}
                              in={match != null}
                              timeout={transitionTime}
                              unmountOnExit
                           >
                              {components[route.name]}
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