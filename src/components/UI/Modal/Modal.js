import React from "react";
import classes from "./Modal.module.css";

import Button from "../Button/Button";
import BackDrop from "../BackDrop/BackDrop";

const Modal = (props) => {
  return (
    <div>
      <BackDrop click={props.cancel} />
      <div className={classes.modal}>
        <h1>{props.alert}</h1>
        <div>
          <Button classes={props.clLeft} click={props.ok}>
            {props.left}
          </Button>
          <Button classes={props.clRight} click={props.cancel}>
            {props.right}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
