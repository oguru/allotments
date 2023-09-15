import PropTypes from "prop-types";
import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({isPrimary}) => (
   <div
      className={`
         ${styles.loaderCont} 
         ${!isPrimary ? styles.imageLoaderCont : ""}
      `}
      data-test="loaderCont"
   >
      <span className={`
         ${styles.loader} 
         ${!isPrimary ? styles.imageLoader : ""}
      `}>
         <span></span>
         <span></span>
      </span>
   </div>
);

LoadingSpinner.propTypes = {
   isPrimary: PropTypes.bool
};

export default LoadingSpinner;
