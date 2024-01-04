import { useContext } from "react";
import { UsersProjectContext } from "../context/usersContext";

export const useUsersContext = () => {
    const context = useContext(UsersProjectContext);

    if (!context) {
        throw Error('useUsersContext must be used inside an UsersContextProvider')
    }
    return context
}
    