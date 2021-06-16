import axios from "axios";

import { useCallback, useReducer } from "react";

const initState = {
  sending: false,
  fatching: false,
  resSend: null,
  errSend: null,
  resFatch: null,
  errFatch: null,
};

const reducer = (curState, action) => {
  switch (action.type) {
    case "SAVE":
      return {
        sending: true,
        fatching: false,
        resSend: null,
        errSend: null,
        resFatch: null,
        errFatch: null,
      };
    case "FETCH":
      return {
        sending: false,
        fatching: true,
        resSend: null,
        errSend: null,
        resFatch: null,
        errFatch: null,
      };
    case "SAVE_DONE":
      return {
        sending: false,
        fatching: false,
        resSend: action.data,
        errSend: null,
        resFatch: null,
        errFatch: null,
      };
    case "FETCH_DONE":
      return {
        sending: false,
        fatching: false,
        resSend: null,
        errSend: null,
        resFatch: action.data,
        errFatch: null,
      };
    case "ERROR_SAVE":
      return {
        sending: false,
        fatching: false,
        resSend: null,
        errSend: action.err,
        resFatch: null,
        errFatch: null,
      };
    case "ERROR_FETCH":
      return {
        sending: false,
        fatching: false,
        resSend: null,
        errSend: null,
        resFatch: null,
        errFatch: action.err,
      };

    default:
      return;
  } // switch
};

const useData = () => {
  //   const [sending, setSending] = useState(false);
  //   const [fatching, setFatching] = useState(false);
  //   const [resSend, setResSend] = useState(null);
  //   const [errSend, setErrSend] = useState(null);

  //   const [resFatch, setResFatch] = useState(null);
  //   const [errFatch, setErrFatch] = useState(null);

  const [dataReducer, dispatchData] = useReducer(reducer, initState);

  const saveData = useCallback((userId, data, token) => {
    dispatchData({ type: "SAVE" });
    axios
      .put(
        `https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
        data
      )
      .then((response) => {
        dispatchData({
          type: "SAVE_DONE",
          data: response,
        });
        // setResSend(response);
        // setSending(false);
      })
      .catch((err) => {
        dispatchData({
          type: "ERROR_SAVE",
          err: err,
        });
        // setErrSend(err);
        // setSending(false);
      });
  }, []);

  const fatchData = useCallback((userId, token) => {
    dispatchData({ type: "FETCH" });
    axios
      .get(
        `https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`
      )
      .then((response) => {
        dispatchData({
          type: "FETCH_DONE",
          data: response,
        });
        // setResFatch(response);
        // setFatching(false);
      })
      .catch((err) => {
        dispatchData({
          type: "ERROR_FETCH",
          err: err,
        });
        // setErrFatch(err);
        // setFatching(false);
      });
  }, []);

  return {
    saveData: saveData,
    fatchData: fatchData,
    responseSend: dataReducer.resSend,
    errorSend: dataReducer.errSend,
    responseFatch: dataReducer.resFatch,
    errorFatch: dataReducer.errFatch,
    sending: dataReducer.sending,
    fatching: dataReducer.fatching,
  };
};

export default useData;
