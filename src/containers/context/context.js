import React, {useState} from "react";

export const FullContext = React.createContext({});

// eslint-disable-next-line
export default (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [email, setEmail] = useState(null);

  const loginOnHandler = (userId, token, email, expirationDate) => {
    setIsAuth(true);
    setUserId(userId);
    setToken(token);
    setExpirationDate(expirationDate);
    setEmail(email);
  };

  const loginOffHandler = () => {
    setIsAuth(false);
    setUserId(null);
    setToken(null);
    setExpirationDate(null);
    setEmail(null);
  };

  return (
    <FullContext.Provider
      value={{
        isAuth: isAuth,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        email: email,
        loginOn: loginOnHandler,
        loginOff: loginOffHandler,
      }}
    >
      {props.children}
    </FullContext.Provider>
  );
};
