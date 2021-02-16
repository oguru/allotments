import About from "./pages/About";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import React from "react";
import {Route} from "react-router-dom";
import styles from "./App.module.scss";

const App = () => {

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

   return (
      <div className="
         d-flex
         flex-column
         h-100"
      >
         <NavBar routes={routes}/>
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
                           timeout={400}
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
               page-footer
               font-small`
            }
            data-test="footer"
         >
            <div className="
               footer-copyright
               text-center
               py-3"
            >
               © 2020 Copyright:
               <a href="/"> Stechford Allotments</a>
            </div>
         </footer>
      </div>
   );
};

export default App;