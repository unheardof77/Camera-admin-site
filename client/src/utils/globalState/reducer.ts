import { useReducer } from "react";

interface stateTypes {
    loggedIn: boolean;
}

interface actionTypes {
    type:string;
}

export const reducer = (state:stateTypes, action:actionTypes) =>{
    switch(action.type){
        case "LOGIN": return {...state, loggedIn:true}
        case "LOGOUT": return {...state, loggedIn: false}
        default: return state;
    }
}

export function useStateReducer(initialState:stateTypes){
    return useReducer(reducer, initialState)
}