import "firebase/auth";
import React, {useState, useEffect} from "react";
import {checkAuth, firestore, signOut, userName} from "../../services/firebase.js";
import AdminNotice from "../../components/AdminNotice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import {adminImages} from "../../images/imageExports";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import styles from "./Admin.module.scss";
import {useImageSize} from "../../context/imageSizeContext.tsx";
import AuthHandler from "../../components/AuthHandler/AuthHandler.tsx";

const Admin = ({notices}) => {
   const [loggedIn, setLoggedIn] = useState(false);
   const [newNotice, setNewNotice] = useState(false);
   const [loginError, setLoginError] = useState(null);

   const img = adminImages;
   const {handleImageSize} = useImageSize();
   const imgSize = handleImageSize("admin");

   useEffect(() => {
      return firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            checkAuth({
               uid: user.uid,
               handleSuccess: () => {
                  if (!loggedIn) {
                     setLoggedIn(true);
                  }
               },
               handleFail: () => {
                  if (firebase.auth().currentUser) {
                     setLoginError(true);
                     firebase.auth().signOut();
                  } else {
                     setLoggedIn(false);
                  }
               }
            });
         }
      });
   }, []);

   const subtitle = loggedIn ?
      "Edit and add new notices to the info page here." :
      "Please log in to continue";

   const heroContent = {
      id: "admin",
      heroTitle: "Admin",
      heroSubtitle: subtitle,
      image: img.mainImg[imgSize],
      imageInit: imgSize === "sm" ? null : img.mainImg.sm,
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
         .set(newDoc);

      setNewNotice(false);
   };

   const modifyNotice = (newDesc, newTitle, id) => {
      const newDetails = {
         desc: newDesc,
         title: newTitle
      };

      firestore
         .collection("notices")
         .doc(id)
         .update(newDetails);
   };

   const deleteNotice = (id) => {
      firestore
         .collection("notices")
         .doc(id)
         .delete();
   };

   return (
      <>
         <Hero content={heroContent}>
            {!loggedIn || loginError ? (
               <div className="login-container">
                  <AuthHandler
                     data-test="loginHandler"
                     setLoggedIn={setLoggedIn} 
                     loggedIn={loggedIn} 
                     setLoginError={setLoginError} 
                  />
                  {loginError && (
                     <p 
                        className={styles.loginErrorText}
                        data-test="loginError"
                     >
                        There was an error, please contact an Admin to sign in.
                     </p>
                  )}
               </div>
            ) : (
               <div>
                  <p data-test="loginWelcomeText">Welcome {userName()}, you are now signed in.</p>
                  <button
                     onClick={() => {
                        signOut();
                        setLoggedIn(false);
                     }}
                     className={styles.signOutBtn}
                  >
                     <FontAwesomeIcon
                        className={styles.signOutIcon}
                        icon={faSignOutAlt}
                     />
                     Sign-out
                  </button>
               </div>
            )}
         </Hero>
         <section className="container">
            <div className={styles.noticeSection}>
               {loggedIn && (
                  <>
                     <h4>Add New Notice</h4>
                     {!newNotice ? (
                        <div
                           className={`${styles.addButtonGroup} rounded mt-3`}
                           onClick={() => setNewNotice(true)}
                        >
                           <button
                              data-test="addNoticeBtn"
                              className={styles.addButton}></button>
                           <span>Add Notice</span>
                        </div>
                     ) : (
                        <AdminNotice
                           handleSave={addToDb}
                           newNotice={true}
                           handleCancel={() => setNewNotice(false)}
                        />
                     )}
                  </>
               )}
            </div>
            <div className={styles.noticeSection}>
               {loggedIn &&
                  <h4>Edit Notices</h4>
               }
               {notices.map(item => loggedIn ? (
                  <AdminNotice
                     handleDelete={deleteNotice}
                     handleSave={modifyNotice}
                     item={item}
                     key={item.id}
                  />
               ) : (
                  <Notice
                     data-test="readOnlyNotice"
                     item={item}
                     key={item.id}
                  />))}
            </div>
         </section>
      </>
   );
};

Admin.propTypes = {
   notices: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      desc: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string
   }))
};

export default Admin;
