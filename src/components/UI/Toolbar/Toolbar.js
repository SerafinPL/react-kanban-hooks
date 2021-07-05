import React, { useContext, useState, useEffect } from "react";
import classes from "./Toolbar.module.css";

import NaviItem from "./Navi/NaviItem";
import Auth from "../../../containers/Auth/Auth";

import { FullContext } from "../../../containers/context/context";

import firebase from "firebase/app";
import "firebase/auth";

import {google} from "googleapis";

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



  const loginGoogleHandler = () => {
      // Initialize Firebase

      

      // Load the service account key JSON file.
      var serviceAccount = require("path/to/serviceAccountKey.json");
      
      // Define the required scopes.
      var scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/firebase.database"
      ];
      
      // Authenticate a JWT client with the service account.
      var jwtClient = new google.auth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        scopes
      );
      
      // Use the JWT client to generate an access token.
      jwtClient.authorize(function(error, tokens) {
        if (error) {
          console.log("Error making request to generate access token:", error);
        } else if (tokens.access_token === null) {
          console.log("Provided service account does not have permission to generate access tokens");
        } else {
          var accessToken = tokens.access_token;
      
          // See the "Using the access token" section below for information
          // on how to use the access token to send authenticated requests to
          // the Realtime Database REST API.
        }
      });
      

  // firebase.initializeApp(firebaseConfig);

  // const provider = new firebase.auth.GoogleAuthProvider();


  // provider.addScope('https://www.googleapis.com/auth/firebase.database');
  

  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
       
  //       const token = result.credential.accessToken;
        
  //       const userId = result.user.uid;
  //       const email = result.user.email;

      
  //       context.loginOn(userId, token, email, 'google');
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       const credential = error.credential;
  //       // ...
  //       console.log(error);
  //     });

  //   console.log();
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
            click={() => {
              setRegis(false);
              setShowDialog(false);
              loginGoogleHandler();
            }}
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
