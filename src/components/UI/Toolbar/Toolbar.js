import React, { useContext, useState, useEffect } from "react";
import classes from "./Toolbar.module.css";

import NaviItem from "./Navi/NaviItem";
import Auth from "../../../containers/Auth/Auth";

import { FullContext } from "../../../containers/context/context";

const Toolbar = () => {
  // Firebase Google Login Section
  const firebaseConfig = {
    apiKey: "AIzaSyCE9iNHzKkGA9SWX9TD4JvTXBEtyCxovdA",
    authDomain: "kanban-hooks.firebaseapp.com",
    databaseURL: "https://kanban-hooks-default-rtdb.firebaseio.com",
    projectId: "kanban-hooks",
    storageBucket: "kanban-hooks.appspot.com",
    messagingSenderId: "51899761000",
    appId: "1:51899761000:web:aa995441094c388608d6dd",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const provider = new firebase.auth.GoogleAuthProvider();

  const loginGoogleHandler = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const userFirebaseID = result.user.uid;
        // ...

        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        console.log(error);
      });

    console.log();
  };


  const context = useContext(FullContext);

  const [regis, setRegis] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const loginOff = () => {
    context.loginOff();
  };

  useEffect(() => {
    if (context.expirationDate) {
      setTimeout(() => {
        context.loginOff();
      }, context.expirationDate.getTime() - new Date().getTime());
    }
  }, [context.expirationDate, context]);

  return (
    <div className={classes.toolbar}>
      <span className={classes.kanban}>KANBAN</span>
      {context.isAuth ? (
        <React.Fragment>
          <NaviItem text="Wyloguj" click={loginOff}></NaviItem>
          <span className={classes.right}>{context.email}</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
        <NaviItem
            text="Zaloguj z Google"
            click={loginGoogleHandler}
          ></NaviItem>
          <NaviItem
            text="Zaloguj"
            click={() => {
              setRegis(false);
              setShowDialog(true);
            }}
          ></NaviItem>
          <NaviItem
            text="Zarejestruj"
            click={() => {
              setRegis(true);
              setShowDialog(true);
            }}
          ></NaviItem>
        </React.Fragment>
      )}
      {showDialog && (
        <Auth registration={regis} clickX={() => setShowDialog(false)} />
      )}
    </div>
  );
};

export default Toolbar;
