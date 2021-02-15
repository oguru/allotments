import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import styles from "./NavLink.module.scss";

const NavLink = (props) => {
   const {
      closeNav,
      isActive,
      linkText,
      path
   } = props;

   NavLink.propTypes = {
      closeNav: PropTypes.func,
      isActive: PropTypes.bool,
      linkText: PropTypes.string,
      path: PropTypes.string
   };

   const activeStyle = isActive ? "activeLink" : "";

   return (
      <div className={`${styles.navbarLink}`}>
         <Link
            className={`
              ${styles[activeStyle]}
              nav-link
              rounded`
            }
            data-test="navLink"
            onClick={closeNav}
            to={path}
         >
            {linkText}
         </Link>
      </div>
   );
};

export default NavLink;