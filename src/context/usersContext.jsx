import { createContext, useReducer, useState } from "react";


export const UsersProjectContext = createContext();

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'ADD_USER':
            return {
                users: [action.payload, ...state.users]
            }
        case 'DELETE_USER':
            return {
                users: state.users.filter((p) => p._id !== action.payload._id)
            }
        case 'UPDATE_USER':
            return {
                users: state.users.map((p) => p._id === action.payload._id ? action.payload : p)
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatchUsers] = useReducer(usersReducer, {
        users: []
    })
    const [allUsers, setAllUsers] = useState([])
    return (
        <UsersProjectContext.Provider value={{...state, dispatchUsers, allUsers, setAllUsers }}>
            { children }
        </UsersProjectContext.Provider>
    )
}