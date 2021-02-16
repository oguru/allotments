import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import styles from "./NavLink.module.scss";

const NavLink = (props) => {
   const {
      closeNav,
      linkType,
      linkText,
      path
   } = props;

   NavLink.propTypes = {
      closeNav: PropTypes.func.isRequired,
      linkType: PropTypes.string,
      linkText: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
   };

   return (
      <div className={`${styles.navbarLink}`}>
         <Link
            className={`
              ${styles[linkType]}
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