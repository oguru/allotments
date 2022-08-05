import React, {useState, useEffect} from "react";
import Hero from "../../components/Hero";
import Notice from "../../components/Notice";
import PropTypes from "prop-types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import adminImg from "../../images/admin-main-lg.jpg";
import adminImgSm from "../../images/admin-main-sm.jpg";
import firebase from "firebase";
import {firestore} from "../../firebase.js";
import styles from "./Admin.module.scss";

const Admin = (props) => {
   const {loggedIn, notices, setLoggedIn} = props;

   Admin.propTypes = {
      fetchNotices: PropTypes.func,
      loggedIn: PropTypes.bool,
      notices: PropTypes.array,
      setLoggedIn: PropTypes.func
   };

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

   const buildNotices = notices.map(item => (
      <Notice
         deleteNotice={deleteNotice}
         modifyNotice={modifyNotice}
         item={item}
         key={`${item.id}`}
         loggedIn={loggedIn}
      />
   ));

   // Configure FirebaseUI.
   const uiConfig = {
   // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      callbacks: {
         signInSuccess: () => setLoggedIn(true)
      },
      // We will display Google and Facebook as auth providers.
      signInOptions: [
         firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
   };

   const loginComponent = !loggedIn ?
      <div style={{width: "250px",
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
            staticTxt
         />
         <div className="container">

            {loggedIn &&
            <>
               <button className="container my-4" onClick={() => setNewNotice(true)}>Add Notice</button>
            </>
            }
            {newNotice &&
            <Notice
               addToDb={addToDb}
               newNotice={newNotice}
               setNewNotice={setNewNotice}
            />
            }
            {buildNotices}
         </div>
      </>
   );
};

export default Admin;
