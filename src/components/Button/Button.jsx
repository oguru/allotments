import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {
   const {handleClick, text} = props;

   return (
      <>
         <button
            className={styles.button}
            onClick={handleClick}
         >
            {text}
         </button>
      </>
   );
};

export default Button;
