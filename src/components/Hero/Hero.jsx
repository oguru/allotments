import "./cursor.scss";
import React, {useState} from "react";
import HeroImage from "../HeroImage";
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
         imageSm,
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
      imageSm: PropTypes.string,
      imageTint: PropTypes.number
   };

   const homeStyles = homeHero ? "homeStyles" : "";

   return (
      <>
         <div className={`
            ${styles.heroCont}
            ${styles[homeStyles]}`}
         >
            <HeroImage
               imageTint={imageTint}
               src={image}
               srcSm={imageSm}
            />
            <div className={`
               ${styles.heroText} 
               container`}
            >
               <div className={styles.typistCont}>
                  <h1 className={styles.hiddenText}>
                     {heroTitle}
                  </h1>
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
               <h4 className={styles[typingDone]}>
                  {heroSubtitle}
               </h4>
               <h5 className={`${styles[typingDone]}`}>
                  {homepageText || ""}
               </h5>
            </div>
         </div>
      </>
   );
};

export default Hero;
