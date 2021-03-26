import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import React, {useState} from "react";
import adminImg from "../../images/admin-main-lg.jpg";
import adminImgSm from "../../images/admin-main-sm.jpg";
import {firestore} from "../../firebase.js";
import styles from "./Admin.module.scss";

const Admin = (props) => {
   const {fetchNotices, loggedIn, notices, setLoggedIn} = props;

   Admin.propTypes = {
      fetchNotices: PropTypes.func,
      loggedIn: PropTypes.bool,
      notices: PropTypes.array,
      setLoggedIn: PropTypes.func
   };

   const [newNotice, setNewNotice] = useState(false);

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

   const addToDb = (newDesc, newTitle) => {

      const newDoc = {
         desc: newDesc,
         title: newTitle,
         date: new Date()
      };

      firestore
         .collection("notices")
         .doc()
         .set(newDoc)
         .then(() => {
            fetchNotices();
         });
   };

   const modifyNotice = (newDesc, newTitle, id) => {

      const newDetails = {
         desc: newDesc,
         title: newTitle
      };

      firestore
         .collection("notices")
         .doc(id)
         .update(newDetails)
         .then(() => {
            fetchNotices();
         });
   };

   const deleteNotice = (id) => {
      firestore
         .collection("notices")
         .doc(id)
         .delete()
         .then(() => fetchNotices());
   };

   const buildNotices = notices.map(item => (
      <Notice
         deleteNotice={deleteNotice}
         modifyNotice={modifyNotice}
         item={item}
         key={`${item.id}`}
         loggedIn={loggedIn}
      />
   ));

   return (
      <>
         <Hero
            content={heroContent}
            staticTxt
         />
         {loggedIn &&
         <div className="container">
            <button className="container my-4" onClick={() => setNewNotice(true)}>Add Notice</button>
         </div>
         }
         {newNotice &&
            <Notice
               addToDb={addToDb}
               newNotice={newNotice}
               setNewNotice={setNewNotice}
            />
         }
         {buildNotices}
      </>
   );
};

export default Admin;
