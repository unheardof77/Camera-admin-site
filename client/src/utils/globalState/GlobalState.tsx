import { ActionDispatch, createContext, useContext } from "react";
import { useStateReducer } from "./reducer";

interface StateContextInt {

}

const StateContext = createContext<StateContextInt|null>(null);
const {Provider} = StateContext

const StateProvider = ({value=[], ...props}) =>{
    const [state, dispatch] = useStateReducer({
        loggedIn:false
    })
    return <Provider value={[state, dispatch]} {...props}/>
}

const useStateContext = () =>(
    useContext(StateContext)
)

export {StateProvider, useStateContext}