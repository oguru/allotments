import React, {useEffect, useState} from "react";
import About from "./pages/About";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import {Route} from "react-router-dom";
import styles from "./App.module.scss";
import homeImg from "./images/randy-fath-ey6g0z_fs0-unsplash.jpg";
import articlesImg from "./images/thom-holmes-3w9aalszgo0-unsplash.jpg";
import aboutImg from "./images/prince-abid-iy1k44aa4uq-unsplash.jpg";

const App = () => {

   const [isLargeScreen, setIsLargeScreen] = useState(true);

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
      "About": <About aboutImg={aboutImg} />,
      "Articles": <Articles articlesImg={articlesImg}/>,
      "Home": <Home homeImg={homeImg} />,
      "Info": <Info infoImg={infoImg} />
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
            position-relative"
         >
            {routes.map(route => (
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
            ))}
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