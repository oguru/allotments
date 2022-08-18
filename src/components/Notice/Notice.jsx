import PropTypes from "prop-types";
import React from "react";
import styles from "./Notice.module.scss";

const Notice = ({children, item}) => {

   Notice.propTypes = {
      children: PropTypes.node,
      item: PropTypes.object
   };

   return (
      <>
         <div
            className="card border shadow-sm mt-5"
            data-test="noticeComponent"
         >
            <div className={`${styles.noticeHeader} card-header d-flex justify-between`}>
               <p className="flex-grow-1 m-auto">
                  {item.title}
               </p>
               <p className="card-text m-auto text-muted small">
                  {item.date}
               </p>
            </div>
            <div className="card-body">
               <p className={`${styles.textWrap} info-item-text card-text`}>
                  {item.desc}
               </p>
               {item.link &&
                  <a
                     href={item.link.href}
                     target={item.link.href.charAt(0) === "/" ? "_self" : "_blank"} rel="noreferrer">
                     {item.link.text}
                  </a>}
            </div>
            {/* Buttons for admin edit/delete notice */}
            {children}
         </div>
      </>
   );
};

export default Notice;
