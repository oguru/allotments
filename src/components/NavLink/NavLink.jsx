import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import styles from "./NavLink.module.scss";

const NavLink = (props) => {
   const {
      handleCloseNav,
      linkStyle,
      linkText,
      path
   } = props;

   NavLink.propTypes = {
      handleCloseNav: PropTypes.func.isRequired,
      linkStyle: PropTypes.string,
      linkText: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
   };

   return (
      <div
         className={styles.navbarLink}
         data-test="navLinkCont"
      >
         <Link
            className={`
              ${styles[linkStyle]}
              nav-link
              rounded`
            }
            data-test="navLink"
            onClick={handleCloseNav}
            to={path}
         >
            {linkText}
         </Link>
      </div>
   );
};

export default NavLink;