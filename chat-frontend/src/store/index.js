import {createStore} from "redux"


const initialState = {
    username: ""
}

const reducer = (state = initialState, action) => {
    if(action.type === "ADD_POST"){
        return Object.assign({}, state, {
            username: action.payload
        })
    }

    return state
}


const store = createStore(reducer)

export default store