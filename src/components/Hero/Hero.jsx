import PropTypes from "prop-types";
import React from "react";
import styles from "./Hero.module.scss";

const Hero = (props) => {

   const {
      content: {
         heroSubtitle,
         heroTitle,
         homepageText,
         image
      },
      homeHero
   } = props;

   Hero.propTypes = {
      content: PropTypes.object,
      heroSubtitle: PropTypes.string,
      heroTitle: PropTypes.string,
      homepageText: PropTypes.string,
      image: PropTypes.string,
      homeHero: PropTypes.bool
   };

   const heroSize = homeHero ? "flex-grow-1" : "";

   /*
    * values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
    * let i = 0;
    * let a = 0;
    * let isBackspacing = false;
    * let isParagraph = false;
    */

   // const textArray = [

   // ]

   return (
      <>
         <div
            className={`
          ${heroSize}
          ${styles.heroCont}
          my-2`
            }
         >
            <div
               className={`
            ${styles.heroBg}
          `}
               style={{backgroundImage: `linear-gradient(
           rgba(0, 0, 0, 0.2),
           rgba(0, 0, 0, 0.2)
          ), url(${image}) `}}>
            </div>
            <div className={`${styles.heroText} container`}>
               <h1 className={styles.cursor}>{heroTitle}</h1>
               <h4>{heroSubtitle}</h4>
               <p className="mt-5">{homepageText || ""}</p>
            </div>
         </div>
      </>
   );
};

export default Hero;
