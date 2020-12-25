import {createStore} from "redux"


const initialState = {
    username: "",
    userInfo: null,
    roomId: ""
}

const reducer = (state = initialState, action) => {
    if(action.type === "ADD_POST"){
        return Object.assign({}, state, {
            username: action.payload.username,
            userInfo: action.payload.userInfo
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