import React, {useState} from "react";
import styles from "./ArticleBox.module.scss";

const ArticleBox = (props) => {
   const {mainImg, mainImgAlt, text, title} = props;

   const [preview, setPreview] = useState("");

   return (
      <article
         className={`${styles.articleBox}`}
         onMouseEnter={() => setPreview("articlePreview")}
         onMouseLeave={() => setPreview("")}
      >
         <img
            alt={mainImgAlt}
            className={`
                  ${styles[preview]} 
                  ${styles.articleImg}`
            }
            src={mainImg}/>
         <div className={`${styles.articleBoxText} ${styles[preview]}`}>
            <h5>{title}</h5>
            {text}
         </div>
         <div className={`${styles.articleBoxBot} ${styles[preview]}`}>
            <p className={styles[preview]}>Read More</p>
         </div>
      </article>
   );
};

export default ArticleBox;
