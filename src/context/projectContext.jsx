import { useEffect } from "react";
import { createContext, useReducer, useState } from "react";
import { userID } from "../api/getUserId";
import makeApiRequest from "../api/apiRequest";

export const ProjectsContext = createContext();

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        projects: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        projects: [action.payload, ...state.projects],
      };
    case "DELETE_PROJECT":
      return {
        projects: state.projects.filter((p) => p._id !== action.payload._id),
      };
    case "UPDATE_PROJECT":
      return {
        projects: state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatchProjects] = useReducer(projectsReducer, {
    projects: [],
  });
  const [previousState, setPreviousState] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const boardData = await makeApiRequest(
          `board/user/${userID}/read`,
          "GET"
        );
        if (boardData) {
          dispatchProjects({ type: "SET_PROJECTS", payload: boardData });
        }
      } catch (error) {
        console.error("Error fetching JSON file:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ ...state, dispatchProjects, previousState, setPreviousState }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
