import PropTypes from "prop-types";
import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {
   const {handleClick, text} = props;

   Button.propTypes = {
      handleClick: PropTypes.func.isRequired,
      text: PropTypes.string
   };
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
