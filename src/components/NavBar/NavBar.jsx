import {CSSTransition} from "react-transition-group";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInfoCircle, faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import burgerTexture from "../../images/burger-texture-01.png";
import styles from "./NavBar.module.scss";

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

  const calcHeight = () => {
    const height = navLinkGroup.current.offsetHeight;
    setMenuHeight(height);
  }

  const mobNavHeight = 
    isLargeScreen ? "unset" 
    : isNavOpen ? `${menuHeight+16}px` 
    : 0;
    
    const closeNav = () => {
      setIsNavOpen(false);
    }
    
    const navIconAnim = isNavOpen ? "navCross" : "";
    const mainMobile = isNavOpen ? "navMainOpen" : "";
    const navLinkGroup = useRef(null);

  return (
    <nav
      className={`${styles.navMain} ${styles[mainMobile]} d-flex align-items-center`}
    >
        <div className="d-flex justify-content-between align-items-center container">
          <a className={`${styles.navBrandText} navbar-brand`} href="/">
            Stechford Allotments
          </a>
          {/* {navToggle} */}
          <div 
            className={`${styles.burgerIcon}`}
            onClick={
              () => setIsNavOpen(!isNavOpen)
            } 
          >
            <span style={{backgroundImage: `url(${burgerTexture})`}} className={styles[navIconAnim]}></span>
            <span style={{backgroundImage: `url(${burgerTexture})`}} className={styles[navIconAnim]}></span>
            <span style={{backgroundImage: `url(${burgerTexture})`}} className={styles[navIconAnim]}></span>
          </div>
          <div className={styles.navOverlay} 
          style={{height: `${mobNavHeight}`}}
          >
          <CSSTransition
            classNames={{...styles}}
            in={isNavOpen}
            nodeRef={navLinkGroup}
            onEnter={calcHeight}
            timeout={500}
          >
            <div 
              className={`${styles.navBarLinkGroup}`}
              ref={navLinkGroup}
            >
              <NavLink
                closeNav={() => closeNav()}
                checkActive={checkActive("/")}
                icon={faHome}
                path="/"
                linkText="Home"
              />
              <NavLink
                closeNav={() => closeNav()}
                checkActive={checkActive("/about")}
                icon={faInfoCircle}
                path="/about"
                linkText="About"
              />
              <NavLink
                closeNav={() => closeNav()}
                checkActive={checkActive("/articles")}
                icon={faNewspaper}
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
  const {checkActive, closeNav, icon, linkText, path} = props;

  const activeStyle = checkActive ? "activeLink" : "";

  return (
    <div className={`${styles.navbarLink}`}>
      <Link
        className={`${styles[activeStyle]} nav-link
        rounded`}
        onClick={closeNav}
        to={path}
        >
          {linkText}
      </Link>
    </div>
  );
};

export default NavBar;
