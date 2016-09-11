import { createStore } from 'redux';
import { combineReducers } from 'redux';

//1. Import the applyMiddleware from Redux
import { applyMiddleware } from 'redux';

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
const errorTestReducer = (state={}, action) => {
  if (action.type === "ERROR_STATE"){
    throw new Error("AAAAAAAA!");
  }
  return state;

}

const combReducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
  errorTest: errorTestReducer
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

//==============================================================
// 2. We create the middleware with this pattern...
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action fired", action);
  //NB remember to call the next action, otherwise we terminate
  // the call chain
  next(action);

}
// 5. We create the middleware with this pattern...
const errorHandlerMiddleware = (store) => (next) => (action) => {
  console.log("in the exceptionHandlerMiddleware", action);
  //NB remember to call the next action, otherwise we terminate
  // the call chain

  try {
    next(action);
  } catch (error){
    console.error("AHHHHH!", error);
  }
}

//3. Create an middlewareApplication...
const middleware = applyMiddleware(loggerMiddleware, errorHandlerMiddleware);

//4. Add the middleware to the store at creation time
const store = createStore(combReducers, middleware);

//===============================================================

store.subscribe(() => {
  console.log("store changed", store.getState());
})
store.dispatch({type:"CHANGE_NAME",payload: "Anders"})
store.dispatch({type:"CHANGE_GENDER",payload: "Male"})

store.dispatch({type:"CHANGE_NAME",payload: "Tove"})
store.dispatch({type:"CHANGE_GENDER",payload: "Female"})
store.dispatch({type:"ERROR_STATE"});

console.log("transaction completed");
