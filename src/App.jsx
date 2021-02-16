import React, {useEffect, useState} from "react";
import {
   Route,
   Switch,
   useLocation
} from "react-router-dom";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import styles from "./App.module.scss";

const App = () => {
   const [pathName, setPathName] = useState("");

   const location = useLocation();

   useEffect(() => {
      setPathName(location.pathname);
   }, [location]);

   const isActive = (route) => {
      if (route === pathName) {
         return true;
      }

      return false;
   };

   return (
      <div className="d-flex flex-column h-100">
         <NavBar isActive={isActive}/>
         <section className="d-flex flex-column flex-grow-1">
            <Switch>
               <Route path="/about">
                  <About
                  // isActive={isActive("/about")}
                  />
               </Route>
               <Route path="/articles">
                  <Articles
                  // isActive={isActive("/articles")}
                  />
               </Route>
               <Route path="/info">
                  <Info
                  />
               </Route>
               <Route path="/">
                  <Home isActive={isActive("/")}>
                     {/* <Hero isActive={isActive("/")}/> */}
                  </Home>
               </Route>
            </Switch>
         </section>
         <footer className={`
            ${styles.footerStyles}
            page-footer
            font-small`
         }>
            <div className="
            footer-copyright
            text-center
            py-3"
            >© 2020 Copyright:
               <a href="/">
                  Stechford Allotments
               </a>
            </div>
         </footer>
      </div>
   );
};

export default App;