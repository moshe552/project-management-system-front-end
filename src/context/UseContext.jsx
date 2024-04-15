import { useContext } from "react";

export const UseContext = (context) => {
  const myContext = useContext(context);

  if (!myContext) {
    throw Error(
      "useProjectsContext must be used inside an ProjectsContextProvider"
    );
  }
  return myContext;
};
