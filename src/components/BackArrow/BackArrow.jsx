import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import styles from "./BackArrow.module.scss";

const BackArrow = ({arrowStyle, handleClick}) => {

   const [backHoverStyle, setBackHoverStyle] = useState("");

   return (
      <div
         className={styles.backArrowCont}
         data-test="backArrowCont"
         onMouseEnter={() => setBackHoverStyle(`backHover${arrowStyle}`)}
         onMouseLeave={() => setBackHoverStyle("")}
         onClick={handleClick}
      >
         <span
            className={`
               ${styles.backBorder} 
               ${styles[`backBorder${arrowStyle}`]} 
               ${styles[backHoverStyle]}`}
            data-test="backBorder"
         />
         <FontAwesomeIcon
            className={styles.backArrow}
            icon={faAngleLeft}
         />
         <p>BACK</p>
      </div>
   );
};

BackArrow.propTypes = {
   arrowStyle: PropTypes.string,
   handleClick: PropTypes.func.isRequired
};

export default BackArrow;
