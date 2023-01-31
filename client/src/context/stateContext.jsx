import { useReducer, createContext, useContext } from 'react'

const initialState = {
    img: null,
    solution: null,
    loading: false,
    error: null,
    clearForm: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_IMG':
            return { ...state, img: action.payload }
        case 'SET_SOLUTION':
            return { ...state, solution: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        case 'SET_ERROR':
            return { ...state, error: action.payload }
        case 'RESET':
            return { initialState, clearForm: !state.clearForm }
        default:
            return state
    }
}

const StateContext = createContext()

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    )
}

const useStateContext = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useStateContext must be used within a StateProvider')
    }
    return context
}

export { StateProvider, useStateContext }