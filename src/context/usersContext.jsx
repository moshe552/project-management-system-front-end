import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { api, headers } from "../api/posts";
import axios from "axios";

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((p) => p._id !== action.payload._id),
      };
    case "UPDATE_USER":
      return {
        users: state.users.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};

export const UsersContextProvider = ({ children }) => {
  const [state, dispatchUsers] = useReducer(usersReducer, {
    users: [],
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users/all`, headers);
      dispatchUsers({ type: "SET_USERS", payload: response.data.result });
    } catch (error) {
      console.error("Error fetching JSON file:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ ...state, dispatchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
