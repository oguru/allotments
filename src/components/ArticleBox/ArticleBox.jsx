import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import styles from "./ArticleBox.module.scss";

const ArticleBox = (props) => {
   const {previewImg, previewImgAlt, handleShowArticle, text = "", title} = props;

   ArticleBox.propTypes = {
      previewImg: PropTypes.string.isRequired,
      previewImgAlt: PropTypes.string,
      handleShowArticle: PropTypes.func.isRequired,
      text: PropTypes.string,
      title: PropTypes.string.isRequired
   };

   const [textLineCounts, setLineCounts] = useState(null);
   const [inAnimation, setInAnimation] = useState(false);
   const [preview, setPreviewClass] = useState("");
   const titleRef = useRef(null);

   // Dimension calculations for dynamic inline line-clamp style
   useEffect(() => {
      if (titleRef.current) {
         // textBoxHeight = box container height - image height - padding
         const textBoxHeight = 300 - 150 - 20;
         const lineHeight = 20;
         const expandedReadMoreHeight = 40;
         const readMoreHeight = 20;
         const expandedTextHeight = 50;
         const titleHeight = titleRef.current.offsetHeight;

         const lineCount =
            Math.floor((textBoxHeight
               - readMoreHeight
               - titleHeight)
               / lineHeight);

         const expandedLineCount =
            Math.floor((textBoxHeight
               - expandedReadMoreHeight
               + expandedTextHeight
               - titleHeight)
               / lineHeight);

         setLineCounts({
            expandedLineCount,
            lineCount
         });
      }
   }, [titleRef]);

   const calculatedBoxStyles = {
      WebkitLineClamp: preview || inAnimation ?
         textLineCounts?.expandedLineCount :
         textLineCounts?.lineCount
   };

   return (
      <article
         className={`${styles.articleBox}`}
         onClick={handleShowArticle}
         onMouseEnter={() => {
            setInAnimation(true);
            setPreviewClass("articlePreview");
         }}
         onMouseLeave={() => {
            setInAnimation(true);
            setPreviewClass("");
         }}
      >
         <img
            alt={previewImgAlt}
            className={`
                  ${styles[preview]} 
                  ${styles.articleImg}`
            }
            src={previewImg}
         />
         <div
            onTransitionEnd={() => setInAnimation(false)}
            className={`
               ${styles.articleBoxText} 
               ${styles[preview]}`
            }
         >
            <h5 ref={titleRef}>{title}</h5>
            <p style={textLineCounts && calculatedBoxStyles}>{text}</p>
         </div>
         <div className={`${styles.articleBoxBot} ${styles[preview]}`}>
            <FontAwesomeIcon
               className={`
                  ${styles.arrowUp} 
                  ${styles[preview]}`
               }
               icon={faAngleUp}
            />
            <p className={styles[preview]}>
               Read More
            </p>
         </div>
      </article>
   );
};

export default ArticleBox;
