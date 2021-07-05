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
  const [dataReducer, dispatchData] = useReducer(reducer, initState);

  const saveData = useCallback((userId, data, token, prov) => {
    dispatchData({ type: "SAVE" });

    let typeAccess = '';
    if (prov === 'mail'){
      typeAccess = 'auth'; 
    } else {
      typeAccess = 'access_token'; 
    }
    console.log(typeAccess);
    axios
      .put(
        `https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?${typeAccess}=${token}`,
        data,
        {
          headers: {'Authorization': `Bearer ${token}`}
        }
      )
      .then((response) => {
        dispatchData({
          type: "SAVE_DONE",
          data: response,
        });
      })
      .catch((err) => {
        dispatchData({
          type: "ERROR_SAVE",
          err: err,
        });
      });
  }, []);

  const fatchData = useCallback((userId, token, prov) => {
    dispatchData({ type: "FETCH" });

    let typeAccess = '';
    if (prov === 'mail'){
      typeAccess = 'auth'; 
    } else {
      typeAccess = 'access_token'; 
    }
    console.log(typeAccess, token);



    axios
      .get(
        `https://kanban-hooks-default-rtdb.firebaseio.com/users/${userId}.json?${typeAccess}=${token}`,
        {
          headers: {'Authorization': `Bearer ${token}`}
        }
      )
      .then((response) => {
        dispatchData({
          type: "FETCH_DONE",
          data: response,
        });
      })
      .catch((err) => {
        dispatchData({
          type: "ERROR_FETCH",
          err: err,
        });
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
