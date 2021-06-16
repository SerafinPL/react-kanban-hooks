import React from "react";
import classes from "./NaviItem.module.css";

const NaviItem = (props) => {
  return (
    <div className={classes.naviItem} onClick={props.click}>
      <p>{props.text}</p>
    </div>
  );
};

export default NaviItem;
