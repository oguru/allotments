import React, {useEffect, useRef, useState} from "react";
import styles from "./ArticleBox.module.scss";

const ArticleBox = (props) => {
   const {mainImg, mainImgAlt, showArticle, text, title} = props;

   const [preview, setPreview] = useState("");
   const [inAnimation, setInAnimation] = useState(false);
   const [boxStyles, setBoxStyles] = useState();

   const titleRef = useRef(null);

   useEffect(() => {
      if (titleRef.current) {
         const contSize = 300;
         const lineHeight = 20;
         const imageSize = 150;
         const readMoreHoverAddSize = 40;
         const readMoreStdAddSize = 20;
         const textHoverAddSize = 50;
         const titleHeight = titleRef.current.offsetHeight;
         const padding = 20;

         const stdLineCount =
            Math.floor((contSize
               - imageSize
               - readMoreStdAddSize
               - titleHeight
               - padding)
               / lineHeight);

         const hoverLineCount =
            Math.floor((contSize
               - imageSize
               - readMoreHoverAddSize
               + textHoverAddSize
               - titleHeight
               - padding)
               / lineHeight);

         const stdTextBoxHeight =
            Math.floor(stdLineCount * lineHeight);

         const hoverTextBoxHeight =
            Math.floor(hoverLineCount * lineHeight);

         const textBoxStyles = {
            hoverLineCount,
            hoverTextBoxHeight,
            stdLineCount,
            stdTextBoxHeight
         };

         setBoxStyles(textBoxStyles);
      }
   }, [titleRef]);

   const getBoxStyles = boxStyles ? {
      height: preview ?
         boxStyles.hoverTextBoxHeight :
         inAnimation ? boxStyles.hoverTextBoxHeight :
            boxStyles.stdTextBoxHeight,
      WebkitLineClamp: preview ?
         boxStyles.hoverLineCount :
         inAnimation ? boxStyles.hoverLineCount :
            boxStyles.stdLineCount

   } : null;

   return (
      <article
         className={`${styles.articleBox}`}
         onClick={showArticle}
         onMouseEnter={() => {
            setInAnimation(true);
            setPreview("articlePreview");
         }}
         onMouseLeave={() => {
            setInAnimation(true);
            setPreview("");
         }}
      >
         <img
            alt={mainImgAlt}
            className={`
                  ${styles[preview]} 
                  ${styles.articleImg}`
            }
            src={mainImg}/>
         <div
            onTransitionEnd={() => setInAnimation(false)}
            className={`${styles.articleBoxText} ${styles[preview]}`}>
            <h5 ref={titleRef}>{title}</h5>
            {/* <div className={styles.pTextCont}> */}
            <p
               style={getBoxStyles}>
               {text}
            </p>
            {/* </div> */}
         </div>
         <div className={`${styles.articleBoxBot} ${styles[preview]}`}>
            <p
               className={styles[preview]}
            >
               Read More
            </p>
         </div>
      </article>
   );
};

export default ArticleBox;
