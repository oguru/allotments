import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import React from "react";
import adminImg from "../../images/admin-main-lg.jpg";
import adminImgSm from "../../images/admin-main-sm.jpg";
import styles from "./Admin.module.scss";

const Admin = (props) => {
   const {loggedIn, notices, setLoggedIn} = props;

   Admin.propTypes = {
      loggedIn: PropTypes.bool,
      notices: PropTypes.array,
      setLoggedIn: PropTypes.func
   };

   const subtitle = loggedIn ?
      "Edit and add new notices to the info page here." :
      "Please log in to continue";

   const heroContent = {
      heroTitle: "Admin",
      heroSubtitle: subtitle,
      image: adminImg,
      imageSm: adminImgSm,
      imageTint: 0.1
   };

   const buildNotices = notices.map(item => {
      return <>
         <div className="card border shadow-sm my-5" key={`${item.title}2`}>
            <div className="card-header d-flex justify-between mdb-color lighten-5">
               <input className="flex-grow-1 m-auto">{item.title}</input>
               <p className="card-text m-auto text-muted small">{item.stringDate}</p>
            </div>
            <div className="card-footer rgba-white-strong border-0 ">
               <p className="info-item-text card-text">{item.desc}</p>
            </div>
         </div>
      </>;
   });

   return (
      <>
         <Hero
            content={heroContent}
            staticTxt
         />
         {buildNotices}
      </>
   );
};

export default Admin;
