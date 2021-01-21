import React, {useEffect} from 'react';
import About from "./pages/About";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import NavBar from "./components/NavBar"
import './App.module.scss';

function App() {

  // useEffect(() => {
    
  //   return () => {
  //     cleanup
  //   }
  // }, [])

  // const []

  return (
    <Router>
      <NavBar />
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/articles">
            <Articles />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>

  );
}

export default App;