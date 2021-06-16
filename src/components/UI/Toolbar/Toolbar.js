import React, { useContext, useState, useEffect } from "react";
import classes from "./Toolbar.module.css";

import NaviItem from "./Navi/NaviItem";
import Auth from "../../../containers/Auth/Auth";

import {FullContext} from "../../../containers/context/context";

const Toolbar = () => {
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
