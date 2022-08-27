import { createContext, useReducer } from "react";

export const Usercontext = createContext();

const defaultState = {
  isLogin: false,
  user: {},
};

function reducer(user, action) {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Usercontext.Provider value={[state, dispatch]}>
      {children}
    </Usercontext.Provider>
  );
}
