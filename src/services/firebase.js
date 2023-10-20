import "firebase/firestore";
import "firebase/installations";
import firebase from "firebase/app";

const firebaseConfig = {
   apiKey: "AIzaSyC9XCkfNBsB44QNXwY3PalSKSz8tFBdWd8",
   authDomain: "allotments-31a31.firebaseapp.com",
   projectId: "allotments-31a31",
   storageBucket: "allotments-31a31.appspot.com",
   messagingSenderId: "194458161758",
   appId: "1:194458161758:web:ed38e7dc0f74cb0b5c9acf",
   measurementId: "G-0SPTQ86DCE"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const userName = () => firebase.auth().currentUser.displayName;

export const signOut = () => firebase.auth().signOut();

export const checkAuth = ({uid, handleSuccess, handleFail}) => {
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