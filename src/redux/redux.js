import {combineReducers, createStore} from "redux";
let reducers = combineReducers({
catched: catchedReducer,
})

let store = createStore(reducers);


export default store;