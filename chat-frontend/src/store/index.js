import {createStore} from "redux"


const initialState = {
    username: "",
    roomId: ""
}

const reducer = (state = initialState, action) => {
    if(action.type === "ADD_POST"){
        return Object.assign({}, state, {
            username: action.payload
        })
    }

    if(action.type === "CHANGE_ROOM"){
        return Object.assign({}, state, {
            roomId: action.payload
        })
    }

    return state
}


const store = createStore(reducer)

export default store