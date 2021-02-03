import React, {useEffect, useState} from "react";
import styles from "./NavBar.module.scss";
import Link from "react-router-dom/Link";
import { CSSTransition } from "react-transition-group";

const NavBar = (props) => {
  const {checkActive} = props;

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  const [menuHeight, setMenuHeight] = useState("")

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", (mQuery) => handleMediaQueryChange(mQuery));

    return () => {
      mediaQuery.removeEventListener(handleMediaQueryChange)
    }
  }, []);

  const handleMediaQueryChange = mQuery => {
    if (mQuery.matches) {
      setIsLargeScreen(true)
    } else {
      setIsLargeScreen(false);
    }
  };

  // useEffect(() => {
  //   calcHeight();
  // }, [isNavOpen]);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const mobNavHeight = isNavOpen ? `${menuHeight+16}px` : 0;

  const navIconAnim = isNavOpen ? "navCross" : "";
  const mainMobile = isNavOpen ? "navMainOpen" : "";

  const closeNav = () => {
    setIsNavOpen(false);
  }

  return (
    <nav
      className={`${styles.navMain} ${styles[mainMobile]} d-flex align-items-center`}
      collapseOnSelect
      expand="md"
      variant="dark"
    >
        <div className="d-flex justify-content-between align-items-center container">
          <a className={"navbar-brand"} href="/">
            Stechford Allotments
          </a>
          {/* {navToggle} */}
          <div 
            className={`${styles.burgerIcon}`}
            onClick={
              () => setIsNavOpen(!isNavOpen)
            } 
          >
            <span className={styles[navIconAnim]}></span>
            <span className={styles[navIconAnim]}></span>
            <span className={styles[navIconAnim]}></span>
          </div>
          <div className={styles.navOverlay} 
          style={{height: `${mobNavHeight}`}}
          >
          <CSSTransition
            classNames={{...styles}}
            in={isNavOpen || isLargeScreen}
            onEnter={calcHeight}
            timeout={500}
            // classNames={{
            //   enter: "navEnter",
            //   enterActive: "navEnterActive",
            //   exit: "navExit",
            //   exitActive: "navExitActive",
            //   exitDone: "nav-exit-done"
            // }}
          >
            <div 
              className={`${styles.navBarLinkGroup}`}
            >
              <NavLink
                closeNav={() => closeNav()}
                checkActive={checkActive("/")}
                path="/" 
                linkText="Home" 
              />
              <NavLink
                closeNav={() => closeNav()}
                checkActive={checkActive("/about")}
                path="/about"
                linkText="About"
              />
              <NavLink
                closeNav={() => closeNav()}
                checkActive={checkActive("/articles")}
                path="/articles"
                linkText="Articles"
              />
          </div>
        </CSSTransition></div>
      </div>
    </nav>
  );
};

function NavLink(props) {
  const {checkActive, closeNav, linkText, path} = props;

  const activeStyle = checkActive ? "activeLink" : "";

  return (
    <div className={`p-1 ml-2 rounded ${styles.navbarLink}`}>
      <Link
        className={`${styles[activeStyle]} nav-link`}
        onClick={closeNav}
        to={path}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default NavBar;
