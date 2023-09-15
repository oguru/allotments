import LoadingSpinner from "../LoadingSpinner";
import PropTypes from "prop-types";
import React from "react";
import globalStyles from "../../global.scss";
import styles from "./GhostImageWrapper.module.scss";

const GhostImageWrapper = (props) => {
   const {
      alt,
      classes,
      srcSet,
      src
   } = props;

   const [isLoading, setIsLoading] = React.useState(true);

   return (
      <>
         {isLoading &&
          <div
             className={`${classes} ${styles.skeletonLoader}`}
             data-test="imageWrapperBackground"
          >
             <LoadingSpinner isPrimary={false} />
          </div>
         }
         <img
            alt={alt}
            className={`
               ${classes} 
               ${styles.wrapperImage} 
               ${isLoading ? styles.wrapperImageInit : styles.wrapperImageLoaded}
            `}
            data-test="wrapperImage"
            onLoad={() => setIsLoading(false)}
            srcSet={srcSet}
            src={src}
         />
      </>
   );
};

GhostImageWrapper.propTypes = {
   alt: PropTypes.string,
   classes: PropTypes.string,
   srcSet: PropTypes.string,
   src: PropTypes.string
};

export default GhostImageWrapper;
