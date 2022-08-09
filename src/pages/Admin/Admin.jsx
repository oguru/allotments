import React, {useState, useEffect} from "react";
import AdminNotice from "../../components/AdminNotice";
import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import adminImg from "../../images/admin-main-lg.jpg";
import adminImgSm from "../../images/admin-main-sm.jpg";
import firebase from "firebase";
import {firestore} from "../../firebase.js";
import styles from "./Admin.module.scss";

const Admin = ({notices}) => {
   Admin.propTypes = {
      notices: PropTypes.array
   };

   const [loggedIn, setLoggedIn] = useState(false);
   const [newNotice, setNewNotice] = useState(false);

   useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            setLoggedIn(true);
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
         signInSuccess: () => setLoggedIn(true)
      },
      signInOptions: [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
   };

   const loginComponent = !loggedIn ?
      <div className={styles.loginContainer} style={{width: "250px",
         margin: "0"}}>
         <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
         />
      </div> :
      <div>
         <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
         <button
            onClick={() => {
               firebase.auth().signOut();
               setLoggedIn(false);
            }}
         >
            Sign-out
         </button>
      </div>;

   return (
      <>
         <Hero
            content={heroContent}
            component={loginComponent}
         />
         <section className="container">
            <div className={`${styles.noticeSection}`}>
               {loggedIn && (
                  <>
                     <h4>Add New Notice</h4>
                     {!newNotice ?
                        <div
                           className={`${styles.addButtonGroup} rounded mt-3`}
                           onClick={() => setNewNotice(true)}
                        >
                           <button
                              className={`${styles.addButton}`}></button>
                           <span>Add Notice</span>
                        </div> :
                        (
                           <AdminNotice
                              handleSave={addToDb}
                              newNotice={true}
                              handleCancel={() => setNewNotice(false)}
                           />)
                     }
                  </>
               )}
            </div>
            <div className={`${styles.noticeSection}`}>
               {loggedIn && <h4>Edit Notices</h4>}
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
