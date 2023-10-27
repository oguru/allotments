import { useEffect } from "react";
import {checkAuth, firestore} from "../../services/firebase.js";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";

const AuthHandler = ({setLoggedIn, loggedIn, setLoginError}) => {
    const firebaseUiConfig = {
        signInFlow: "popup",
        callbacks: {
           signInSuccessWithAuthResult: () => false
        },
        signInOptions: [
           firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
     };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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

        return () => {
           unsubscribe();
        }
     }, []);

     return (
        <StyledFirebaseAuth
            uiConfig={firebaseUiConfig}
            firebaseAuth={firebase.auth()}
        />
     )
}

export default AuthHandler;