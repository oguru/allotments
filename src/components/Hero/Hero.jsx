import "./cursor.scss";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Typist from "react-typist";
import styles from "./Hero.module.scss";

const Hero = (props) => {

   const {
      content: {
         heroSubtitle,
         heroTitle,
         homepageText,
         image,
         imageTint
      },
      homeHero
   } = props;

   const [typingDone, setTypingDone] = useState("");

   Hero.propTypes = {
      content: PropTypes.object,
      heroSubtitle: PropTypes.string,
      heroTitle: PropTypes.string,
      homepageText: PropTypes.string,
      homeHero: PropTypes.bool,
      image: PropTypes.string,
      imageTint: PropTypes.number
   };

   const homeStyles = homeHero ? "homeStyles" : "";

   return (
      <>
         <div className={`
            ${styles.heroCont}
            ${styles[homeStyles]}`}
         >
            <div
               className={`${styles.heroBg}`}
               style={{backgroundImage: `linear-gradient(
                  rgba(0, 0, 0, ${imageTint || 0.3}),
                  rgba(0, 0, 0, ${imageTint || 0.3})
                  ), url(${image}) `}
               }
            >
            </div>
            <div className={`${styles.heroText} container`}>
               <div className={styles.typistCont}>
                  <h1 className={styles.hiddenText}>{heroTitle}</h1>
                  <Typist
                     avgTypingDelay={70}
                     className={styles.typistEl}
                     cursor={{
                        hideWhenDone: true,
                        hideWhenDoneDelay: 1400
                     }}
                     onTypingDone={() => setTypingDone("fadeIn")}
                     startDelay={500}
                  >
                     <h1>{heroTitle}</h1>
                  </Typist>
               </div>
               <h4 className={styles[typingDone]}>{heroSubtitle}</h4>
               <h5 className={`${styles[typingDone]}`}>{homepageText || ""}</h5>
            </div>
         </div>
      </>
   );
};

export default Hero;
