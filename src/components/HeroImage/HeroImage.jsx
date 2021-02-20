import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./HeroImage.module.scss";

const HeroImage = (props) => {
   const {
      imageTint,
      src,
      srcSm
   } = props;

   HeroImage.propTypes = {
      imageTint: PropTypes.number,
      src: PropTypes.string.isRequired,
      srcSm: PropTypes.string.isRequired
   };

   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      awaitImage();
   }, []);

   const loadImageWithPromise = () => {
      return new Promise(resolve => {
         const image = new Image();
         image.onload = resolve;
         image.src = src;
      });
   };

   const awaitImage = async () => {
      await loadImageWithPromise();
      setIsLoaded(true);
   };

   const initImgOpacity = isLoaded ? 0 : 1;

   return (
      <>
         <div
            className={`${styles.heroBg} ${styles.initImg}`}
            style={{backgroundImage:
       `linear-gradient(
          rgba(0, 0, 0, ${imageTint || 0.3}),
          rgba(0, 0, 0, ${imageTint || 0.3})
       ), url(${srcSm}) `,
            opacity: `${initImgOpacity}`}
            }
         >
         </div>
         <div
            className={`${styles.heroBg}`}
            style={{backgroundImage:
          `linear-gradient(
             rgba(0, 0, 0, ${imageTint || 0.3}),
             rgba(0, 0, 0, ${imageTint || 0.3})
          ), url(${src}) `}
            }
         >
         </div>
      </>
   );
};

export default HeroImage;