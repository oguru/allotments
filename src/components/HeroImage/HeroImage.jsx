import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./HeroImage.module.scss";

const HeroImage = (props) => {
   const {
      homeStyle,
      imageTint,
      image,
      imageInit
   } = props;

   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      awaitImage();
   }, []);

   const loadImageWithPromise = () => {
      return new Promise(resolve => {
         const mainImage = new Image();
         mainImage.onload = resolve;
         mainImage.src = image;
      });
   };

   const awaitImage = async () => {
      await loadImageWithPromise();
      setIsLoaded(true);
   };

   const initImgOpacity = isLoaded ? 0 : 1;

   return (
      <>
         {imageInit &&
         <div
            className={`
               ${styles.heroBg} 
               ${styles[homeStyle]}
               ${styles.initImg}`
            }
            data-test="heroImage"
            style={
               {backgroundImage: `linear-gradient(
                  rgba(0, 0, 0, ${imageTint || 0.3}),
                  rgba(0, 0, 0, ${imageTint || 0.3})
               ), url(${imageInit})`,
               opacity: `${initImgOpacity}`}
            }
         >
         </div>}
         <div
            className={`
               ${styles.heroBg}
               ${styles[homeStyle]}`
            }
            data-test="heroImage"
            style={
               {backgroundImage: `linear-gradient(
                  rgba(0, 0, 0, ${imageTint || 0.3}),
                  rgba(0, 0, 0, ${imageTint || 0.3})
               ), url(${image})`}
            }
         >
         </div>
      </>
   );
};

HeroImage.propTypes = {
   homeStyle: PropTypes.string,
   imageTint: PropTypes.number,
   image: PropTypes.string,
   imageInit: PropTypes.string
};

export default HeroImage;