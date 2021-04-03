import React, {
   useEffect,
   useRef,
   useState
} from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import NavLink from "../NavLink";
import PropTypes from "prop-types";
import styles from "./NavBar.module.scss";
import {useLocation} from "react-router-dom";

const NavBar = (props) => {
   const {isLargeScreen, routes} = props;

   NavBar.propTypes = {
      isLargeScreen: PropTypes.bool,
      routes: PropTypes.array.isRequired
   };

   const [isNavOpen, setIsNavOpen] = useState(false);
   const [menuHeight, setMenuHeight] = useState("");
   const [pathName, setPathName] = useState("");

   const location = useLocation();

   useEffect(() => {
      setPathName(location.pathname);
   }, [location]);

   const calcOpenNavHeight = () => {
      const height = navLinkGroup.current.offsetHeight;
      setMenuHeight(height);
   };

   const mobNavHeight = isLargeScreen ?
      "unset" : isNavOpen ?
         `${menuHeight + 16}px` : 0;

   const closeNav = () => {
      setIsNavOpen(false);
   };

   const checkIsActive = (route) => {
      return route === pathName ? "activeLink" : "";
   };

   const navIconAnim = isNavOpen ? "navCross" : "";
   const navLinkGroup = useRef(null);

   return (
      <nav
         className={`
            ${styles.navMain}
            d-flex
            align-items-center`
         }
         data-test="navbar"
      >
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
               data-test="navBrand"
               href="/"
            >
               Francis Rd Allotments
            </a>
            <div
               className={styles.burgerIcon}
               data-test="burgerIcon"
               onClick={() => setIsNavOpen(!isNavOpen)}
            >
               <span
                  className={styles[navIconAnim]}>
               </span>
               <span
                  className={styles[navIconAnim]}>
               </span>
               <span
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
                     data-test="navBarLinkGroup"
                     ref={navLinkGroup}
                  >
                     {routes.map((route, index) => {
                        return route.name !== "Admin" ? (
                           <NavLink
                              closeNav={() => closeNav()}
                              linkType={checkIsActive(route.path)}
                              key={`${index}_${route.name}`}
                              path={route.path}
                              linkText={route.name}
                           />
                        ) : null;
                     })}
                  </div>
               </CSSTransition>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;