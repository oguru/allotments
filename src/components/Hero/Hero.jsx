import "./cursor.scss";
import React, {useEffect, useState} from "react";
import HeroImage from "../HeroImage";
import PropTypes from "prop-types";
import Typist from "react-typist";
import styles from "./Hero.module.scss";
import {useStaticTxt} from "../../context/staticTxtContext";

const Hero = (props) => {
   const {
      children,
      content: {
         id,
         heroSubtitle,
         heroTitle,
         smallText,
         image,
         imageInit,
         imageTint
      }
   } = props;

   Hero.propTypes = {
      children: PropTypes.node,
      content: PropTypes.shape({
         id: PropTypes.string,
         heroSubtitle: PropTypes.string,
         heroTitle: PropTypes.string,
         imageInit: PropTypes.string,
         image: PropTypes.string,
         imageTint: PropTypes.number,
         smallText: PropTypes.string
      })
   };

   const [animationClass, setAnimationClass] = useState("");

   const {
      staticTxt: {[id]: staticTxt},
      updateStaticTxt
   } = useStaticTxt();

   useEffect(() => {
      if (!staticTxt) {
         const staticTxtTimer = setTimeout(() => {
            updateStaticTxt(id);
         }, id === "home" ? 5000 : 3000);

         return () => clearTimeout(staticTxtTimer);
      }
   }, []);

   const homeStyle = id === "home" ? "homeStyle" : "";

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
               image={image}
               imageInit={imageInit}
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
                     ${homeStyle ? styles.homeText : styles.smallText}`
                  }
                  data-test="smallText"
               >
                  {smallText}
               </h5>
               {children}
            </div>
         </div>
      </>
   );
};

export default Hero;
