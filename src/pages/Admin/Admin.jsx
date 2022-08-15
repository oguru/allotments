import React, {useState, useEffect} from "react";
import AdminNotice from "../../components/AdminNotice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import adminImg from "../../images/admin-main-lg.jpg";
import adminImgSm from "../../images/admin-main-sm.jpg";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import {firestore} from "../../services/firebase.js";
import styles from "./Admin.module.scss";

const checkAuth = ({uid, handleSuccess, handleFail}) => {
   firestore
      .collection("users")
      .doc(uid)
      .get()
      .then(() => {
         handleSuccess();
      })
      .catch(err => {
         console.log("catch error: ", err);
         handleFail(err);
      });
};

const Admin = ({notices}) => {
   Admin.propTypes = {
      notices: PropTypes.arrayOf(PropTypes.shape({
         date: PropTypes.string,
         desc: PropTypes.string,
         id: PropTypes.string,
         title: PropTypes.string
      }))
   };

   const [loggedIn, setLoggedIn] = useState(false);
   const [newNotice, setNewNotice] = useState(false);
   const [loginError, setLoginError] = useState(null);

   useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
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

   // Configure FirebaseUI.
   const uiConfig = {
      signInFlow: "popup",
      callbacks: {
         signInSuccess: () => false
      },
      signInOptions: [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
   };

   return (
      <>
         <Hero content={heroContent}>
            {!loggedIn || loginError ? (
               <div
                  className={"login-container"
                  }
               >
                  <StyledFirebaseAuth
                     uiConfig={uiConfig}
                     firebaseAuth={firebase.auth()}
                  />
                  {loginError && <p className={styles.loginErrorText}>There was an error, please contact an Admin to sign in.</p>}
               </div>
            ) : (
               <div>
                  <p>Welcome {firebase.auth().currentUser.displayName}, you are now signed in.</p>
                  <button
                     onClick={() => {
                        firebase.auth().signOut();
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
            <div className={`${styles.noticeSection}`}>
               {loggedIn && (
                  <>
                     <h4>Add New Notice</h4>
                     {!newNotice ? (
                        <div
                           className={`${styles.addButtonGroup} rounded mt-3`}
                           onClick={() => setNewNotice(true)}
                        >
                           <button
                              className={`${styles.addButton}`}></button>
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
            <div className={`${styles.noticeSection}`}>
               {loggedIn &&
                  <h4>Edit Notices</h4>
               }
               {notices.map(item => loggedIn ? (
                  <AdminNotice
                     handleDelete={deleteNotice}
                     handleSave={modifyNotice}
                     item={item}
                     key={`${item.id}`}
                  />
               ) : (
                  <Notice
                     item={item}
                     key={`${item.id}`}
                  />))}
            </div>
         </section>
      </>
   );
};

export default Admin;
