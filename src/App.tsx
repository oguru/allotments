import {useEffect, useState, useRef} from "react";
import {homeImages, mainImagesInit} from "./images/imageExports.js";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Articles from "./pages/Articles";
import CSSTransition from "react-transition-group/CSSTransition";
import Home from "./pages/Home";
import Info from "./pages/Info";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/NavBar";
import StaticTxtProvider from "./context/staticTxtContext";
import routes from "./data/routes";
import styles from "./App.module.scss";
import {Route} from "react-router-dom";
import {articlesData} from "./data/contentData.js";
import {firestore} from "./services/firebase.js";
import {formatDate} from "./util/utils.js";
import {getContentJsx} from "./util/articleBuilder.jsx";
import {useImageSize} from "./context/imageSizeContext";
import {useScreenSize} from "./context/screenSizeContext";
import { MainImageTypes } from "./images/main/mainImages";
import { JSXElementsObject, FirestoreNoticeType, LocalNoticeType, RouteData, PageLower } from "./types";

type RouteContentProps = {
   route: RouteData, 
   component: JSX.Element
}

const App = () => {
   const [articlesJsx, setArticlesJsx] = useState([]);
   const [notices, setNotices] = useState<LocalNoticeType[] | []>([]);
   const [isLoading, setIsLoading] = useState(true);
   const {handleImageSize} = useImageSize();

   const homeImgSize: keyof MainImageTypes["mainImg"] = handleImageSize("home");
   const homeImage = homeImages.mainImg[homeImgSize];
   const updatedInitImages = [
      ...mainImagesInit,
      {src: homeImage,
         id: "home"}
   ];

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
                  {routes.map((route) => (
                     <RouteContent
                        component={components[route.name]} 
                        key={route.name} 
                        route={route} 
                     />
                  )) as JSX.Element[]}
               </StaticTxtProvider>
            )}
         </section>
         <footer
            className={styles.footerStyles}
            data-test="footer"
         >
            <p>
               © 2023 Copyright:
               <a href="/"> Francis Road Allotments</a>
            </p>
         </footer>
      </div>
   );
};

function RouteContent({route, component}: RouteContentProps) {
   const pageRef = useRef<HTMLDivElement>(null);
   const {mobileNav} = useScreenSize();

   return (
      <Route
         key={route.path}
         exact path={route.path}
      >
         {({match}) => (
            <CSSTransition
               classNames={{...styles}}
               in={match != null}
               nodeRef={pageRef}
               timeout={mobileNav ? 800 : 400}
               unmountOnExit
            >
               <div
                  className={styles.mainPage}
                  data-test="pageComponent"
                  ref={pageRef}
               >
                  {route.name === "Articles" ?
                     component :
                     (
                        <div className={styles.pageCont}>
                           {component}
                        </div>
                     )}
               </div>
            </CSSTransition>
         )}
      </Route>
   )
}

export default App;