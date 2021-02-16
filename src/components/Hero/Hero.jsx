import "./cursor.scss";
import PropTypes from "prop-types";
import React, {useState} from "react";
import Typist from "react-typist";
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

   const [typingDone, setTypingDone] = useState("");

   Hero.propTypes = {
      content: PropTypes.object,
      heroSubtitle: PropTypes.string,
      heroTitle: PropTypes.string,
      homepageText: PropTypes.string,
      image: PropTypes.string,
      homeHero: PropTypes.bool
   };

   const heroSize = homeHero ? "flex-grow-1" : "";

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
               <div className={styles.typistCont}>
                  <h1 className={styles.hiddenText}>{heroTitle}</h1>
                  <Typist
                     avgTypingDelay={70}
                     className={styles.typistEl}
                     cursor={{
                        hideWhenDone: true,
                        hideWhenDoneDelay: 1500
                     }}
                     onTypingDone={() => setTypingDone("fadeIn")}
                     startDelay={0}
                  >
                     <h1>{heroTitle}</h1>
                  </Typist>
               </div>
               <h4 className={styles[typingDone]}>{heroSubtitle}</h4>
               <p className={`${styles[typingDone]} mt-5`}>{homepageText || ""}</p>
            </div>
         </div>
      </>
   );
};

export default Hero;
