import React, {useEffect, useState} from 'react';
import About from "./pages/About";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import {Route, Switch, useLocation} from "react-router-dom";
import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import styles from "./App.module.scss";

import {BrowserRouter as Router} from "react-router-dom";


function App() {

  let [pathName, setPathName] = useState("");  

  let location = useLocation();
  
  useEffect(() => {
    setPathName(location.pathname)
  }, [location]);

  const checkActive = (route) => {
    if (route === pathName) {
      return true;
    }
    return false;
  }

  return (
    <div className="d-flex flex-column h-100">
      <NavBar checkActive={checkActive}/>
      <section className="d-flex flex-column flex-grow-1">
        <Switch>
            <Route path="/about">
                <About
                  // isActive={checkActive("/about")} 
                />
            </Route>
            <Route path="/articles">
                <Articles 
                  // isActive={checkActive("/articles")}
                />
            </Route>
            <Route path="/">
                <Home isActive={checkActive("/")}>
                  {/* <Hero isActive={checkActive("/")}/> */}
                </Home>
            </Route>
          </Switch>
      </section>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className={`
      ${styles.footerStyles}
      page-footer
      font-small`
    }>
      <div class="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="/"> Stechford Allotments</a>
      </div>
    </footer>
  )
}



export default App;