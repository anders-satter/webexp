import { createStore } from 'redux';
import { combineReducers } from 'redux';


//the reducers should be in there own file


//the user reducer is not aware of the tweets portion of the data
//it cannot change other data than the user data.
const userReducer = (state={}, action) => {
  //always have to return something
  if (action.type === "CHANGE_NAME"){
    //we will do restructuring here
    state = {...state, name:action.payload};
  }
  if (action.type === "CHANGE_GENDER"){
    state = {...state, gender:action.payload};
  }
  return state;
}
const tweetsReducer = (state=[], action) => {
  return state;
}

//combineReducers will create one store slice for
//each reducer, user and tweets
//The userReducer can only change on the user store slice
//and the tweetsReducer only on the tweets store slice
//They can, however, act on any action type, ie changes to
//the user may impact changes to the tweets (we might need to
//change the name of the user for all tweets)

const combReducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
})

const reducer = function(state, action){
  if (action.type === "INC") {
    console.log("updating the state");
    return state + action.payload;
  }
  if (action.type === "DEC") {
    console.log("updating the state");
    return state - action.payload;
  }
  return state;
}
//const store = createStore(reducers, 0);
const store = createStore(combReducers);

store.subscribe(() => {
  console.log("store changed", store.getState());
})
store.dispatch({type:"CHANGE_NAME",payload: "Anders"})
store.dispatch({type:"CHANGE_GENDER",payload: "Male"})

store.dispatch({type:"CHANGE_NAME",payload: "Tove"})
store.dispatch({type:"CHANGE_GENDER",payload: "Female"})

console.log("transaction completed");
