import React, {
   useEffect, Suspense, useState, useRef
} from "react";
import About from "./pages/About";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import {Route} from "react-router-dom";
import styles from "./App.module.scss";
import homeImg from "./images/randy-fath-ey6g0z_fs0-unsplash.jpg";
import articlesImg from "./images/dana-devolk-n_0wi_oruce-unsplash.jpg";
import aboutImg from "./images/prince-abid-iy1k44aa4uq-unsplash.jpg";
import infoImg from "./images/thom-holmes-3w9aalszgo0-unsplash.jpg";
import articlesImgSm from "./images/dana-devolk-n_0wi_oruce-unsplash-sm.jpg";
import aboutImgSm from "./images/prince-abid-iy1k44aa4uq-unsplash-sm.jpg";
import infoImgSm from "./images/thom-holmes-3w9aalszgo0-unsplash-sm.jpg";

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

   const imagesInitial = [
      {src: homeImg,
         alt: "home"},
      {src: infoImgSm,
         alt: "info"},
      {src: articlesImgSm,
         alt: "articles"},
      {src: aboutImgSm,
         alt: "about"}
   ];

   const imagesLg = [
      {src: infoImg,
         alt: "info"},
      {src: articlesImg,
         alt: "articles"},
      {src: aboutImg,
         alt: "about"}
   ];

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
      <div className="
         d-flex
         flex-column
         h-100"
      >
         <NavBar
            isLargeScreen={isLargeScreen}
            routes={routes}
         />
         <section className="
            d-flex
            flex-column
            flex-grow-1
            justify-content-center
            align-items-center
            position-relative"
         >
            <div style={{
               display: "none"
            }}>
               {imagesInitial.map(img => <img src={img.src} onLoad={imageLoaded} key={img.src} alt="" />)}

               {isLoading ? null :
                  imagesLg.map(img => <img src={img.src} key={img.src} alt="" />)
               }
            </div>
            {isLoading ?
               <div
                  className={styles.loaderCont}
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
                           className="
                     d-flex
                     flex-column
                     position-absolute
                     w-100
                     h-100"
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
            className={`
               ${styles.footerStyles}
               `
            }
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