import { useEffect } from "react";
import { createContext, useReducer } from "react";
import makeApiRequest from "../api/apiRequest";

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

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await makeApiRequest("users/all", "GET");
        if (data && data.result) {
          dispatchUsers({ type: "SET_USERS", payload: data.result });
        }
      } catch (error) {
        console.error("Couldn't get all users:", error.message);
      }
    }
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ ...state, dispatchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
