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
      content: PropTypes.shape({
         heroSubtitle: PropTypes.string,
         heroTitle: PropTypes.string.isRequired,
         homepageText: PropTypes.string,
         image: PropTypes.string.isRequired,
         imageSm: PropTypes.string,
         imageTint: PropTypes.number
      }),
      homeHero: PropTypes.bool
   };

   const homeStyles = homeHero ? "homeStyles" : "";

   return (
      <>
         <div
            className={`
               ${styles.heroCont}
               ${styles[homeStyles]}
            `}
            data-test="heroCont"
         >
            <HeroImage
               homeStyle={homeHero ? "homeStyle" : ""}
               imageTint={imageTint}
               src={image}
               srcSm={imageSm}
            />
            <div className={`
               ${styles.heroText} 
               container`}
            >
               <div className={styles.typistCont}>
                  <h1
                     className={styles.hiddenText}
                     data-test="hiddenText"
                  >
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
                     <h1 data-test="heroHeadText">
                        {heroTitle}
                     </h1>
                  </Typist>
               </div>
               <h4
                  className={styles[typingDone]}
                  data-test="heroSubText"
               >
                  {heroSubtitle}
               </h4>
               <h5
                  className={styles[typingDone]}
                  data-test="heroHomeText"
               >
                  {homepageText}
               </h5>
            </div>
         </div>
      </>
   );
};

export default Hero;
