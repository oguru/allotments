import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import ImageSizeProvider from "./context/imageSizeContext";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import ScreenSizeProvider from "./context/screenSizeContext";

ReactDOM.render(
   <React.StrictMode>
      <Router>
         <ScreenSizeProvider>
            <ImageSizeProvider>
               <App />
            </ImageSizeProvider>
         </ScreenSizeProvider>
      </Router>
   </React.StrictMode>,
   document.getElementById("root")
);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
