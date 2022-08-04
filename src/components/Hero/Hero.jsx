import "./cursor.scss";
import React, {useState} from "react";
import HeroImage from "../HeroImage";
import PropTypes from "prop-types";
import Typist from "react-typist";
import styles from "./Hero.module.scss";

const Hero = (props) => {
   const {
      children,
      content: {
         heroSubtitle,
         heroTitle,
         smallText,
         image,
         imageSm,
         imageTint
      },
      component,
      homeHero,
      staticTxt
   } = props;

   const [animationClass, setAnimationClass] = useState("");

   Hero.propTypes = {
      children: PropTypes.object,
      component: PropTypes.object,
      content: PropTypes.shape({
         heroSubtitle: PropTypes.string,
         heroTitle: PropTypes.string.isRequired,
         image: PropTypes.string.isRequired,
         imageSm: PropTypes.string,
         imageTint: PropTypes.number,
         smallText: PropTypes.string
      }),
      article: PropTypes.bool,
      homeHero: PropTypes.bool,
      staticTxt: PropTypes.bool
   };

   const homeStyle = homeHero ? "homeStyle" : "";

   return (
      <>
         <div
            className={`
               ${styles.heroCont}
               ${styles[homeStyle]}
            `}
            data-test="heroCont"
         >
            <HeroImage
               homeStyle={homeStyle}
               imageTint={imageTint}
               src={image}
               srcSm={imageSm}
            />
            <div className={`
               ${styles.heroText} 
               container`}
            >
               {!staticTxt ? (
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
                        onTypingDone={() => setAnimationClass("fadeIn")}
                        startDelay={500}
                     >
                        <h1 data-test="heroHeadText">
                           {heroTitle}
                        </h1>
                     </Typist>
                  </div>
               ) :
                  <h1 data-test="heroHeadText">
                     {heroTitle}
                  </h1>
               }
               <h4
                  className={
                     staticTxt ? styles.staticTxt : styles[animationClass]
                  }
                  data-test="heroSubText"
               >
                  {heroSubtitle}
               </h4>
               <h5
                  className={`
                     ${staticTxt ? styles.staticTxt : styles[animationClass]} 
                     ${homeHero ? styles.homeText : styles.smallText}`
                  }
                  data-test="smallText"
               >
                  {smallText}
               </h5>
               {component}
               {/* Article BackArrow */}
               {children}
            </div>
         </div>
      </>
   );
};

export default Hero;
