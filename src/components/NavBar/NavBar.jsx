import React, {useEffect,
   useRef,
   useState} from "react";
import {CSSTransition} from "react-transition-group";
import NavLink from "../NavLink";
import PropTypes from "prop-types";
import burgerTexture from "../../images/burger-texture-01.png";
import styles from "./NavBar.module.scss";

const NavBar = (props) => {
   const {isActive} = props;

   NavBar.propTypes = {
      isActive: PropTypes.func
   };

   const [isNavOpen, setIsNavOpen] = useState(false);
   const [isLargeScreen, setIsLargeScreen] = useState(true);
   const [menuHeight, setMenuHeight] = useState("");

   useEffect(
      () => {
         const mediaQuery = window.matchMedia("(min-width: 768px)");

         handleMediaQueryChange(mediaQuery);
         mediaQuery.addEventListener(
            "change", (mQuery) => handleMediaQueryChange(mQuery)
         );

         return () => {
            mediaQuery.removeEventListener(handleMediaQueryChange);
         };
      }, []
   );

   const handleMediaQueryChange = mQuery => {
      if (mQuery.matches) {
         setIsLargeScreen(true);
      } else {
         setIsLargeScreen(false);
      }
   };

   const calcOpenNavHeight = () => {
      const height = navLinkGroup.current.offsetHeight;
      setMenuHeight(height);
   };

   // const mobNavHeight = isLargeScreen ? "200px" : "0";

   // const mobNavHeight =
   //  isLargeScreen ? "large" :
   //     isNavOpen ? `small nav open` :
   //        "nav closed";

   const mobNavHeight =
    isLargeScreen ? "unset" :
       isNavOpen ? `${menuHeight + 16}px` :
          0;

   const closeNav = () => {
      setIsNavOpen(false);
   };

   const navIconAnim = isNavOpen ? "navCross" : "";
   const mainMobile = isNavOpen ? "navMainOpen" : "";
   const navLinkGroup = useRef(null);

   return (
      <nav
         className={`
      ${styles.navMain}
      ${styles[mainMobile]}
      d-flex
      align-items-center`
         }
      >
         <p style={{display: "none"}} data-test="tempTest">{mobNavHeight}</p>
         <div className="
            d-flex
            justify-content-between
            align-items-center
            container"
         >
            <a
               className={`
                  ${styles.navBrandText} 
                  navbar-brand
               `}
               href="/">
            Stechford Allotments
            </a>
            <div id="testID"
               className={styles.burgerIcon}
               data-test="burgerIcon"
               onClick={() => setIsNavOpen(!isNavOpen)}
            >
               <span
                  style={{backgroundImage: `url(${burgerTexture})`}}
                  className={styles[navIconAnim]}>
               </span>
               <span
                  style={{backgroundImage: `url(${burgerTexture})`}}
                  className={styles[navIconAnim]}>
               </span>
               <span
                  style={{backgroundImage: `url(${burgerTexture})`}}
                  className={styles[navIconAnim]}>
               </span>
            </div>
            <div
               className={styles.navOverlay}
               data-test="navOverlay"
               style={{height: `${mobNavHeight}`}}
            >
               <CSSTransition
                  classNames={{...styles}}
                  in={isNavOpen}
                  nodeRef={navLinkGroup}
                  onEnter={calcOpenNavHeight}
                  timeout={500}
               >
                  <div
                     className={`${styles.navBarLinkGroup}`}
                     ref={navLinkGroup}
                  >
                     <NavLink
                        closeNav={() => closeNav()}
                        isActive={isActive("/")}
                        path="/"
                        linkText="Home"
                     />
                     <NavLink
                        closeNav={() => closeNav()}
                        isActive={isActive("/about")}
                        path="/about"
                        linkText="About"
                     />
                     <NavLink
                        closeNav={() => closeNav()}
                        isActive={isActive("/articles")}
                        path="/articles"
                        linkText="Articles"
                     />
                     <NavLink
                        closeNav={() => closeNav()}
                        isActive={isActive("/info")}
                        path="/info"
                        linkText="Info"
                     />
                  </div>
               </CSSTransition>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;