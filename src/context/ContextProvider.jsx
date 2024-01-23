'use client'

import { createContext, useContext, useReducer } from "react";

const initialState = {
    user: true,
}


const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return { ...state, user: true };
        case 'REMOVE_USER':
            return { ...state, user: false };
        default:
            return state
    }
}

export let Context = createContext()

export const useUserContext = () => {
    return useContext(Context)
}

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <Context.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </Context.Provider>
    )
}