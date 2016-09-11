import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from "redux-logger";

//1. Import thunk (thunk is a subroutine that is created,
//often automatically, to assist a call to another subroutine.)
import thunk from "redux-thunk";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "USER_FETCH_START": {
      return {...state, fetching: true};
      break;
    }

    case "USER_FETCH_ERROR": {
      return {...state, fetching: false, error: action.payload};
      break;
    }
    case "USER_RECEIVED": {
      return {
        ...state,
        fetching: false,
        fetched:true,
        users: action.payload};
      break;
    }

  }
  return state;
}

//2. Add the thunk to the middleware chain
const middleware = applyMiddleware(thunk, logger());
//const middleware = applyMiddleware( logger());
const store = createStore(reducer, middleware);

// store.dispatch({
//   type: "FOO"
// })

//instead of dispatching the object with a type and a payload,
//we want to dispatch a function
//for redux and react, async actions is just a handful of
//synchronous actions
store.dispatch((dispatch) => {
  //console.log("calling the dispatch function", dispatch)
  //dispatch({type: "FOO"});
  //dispatch({type: "FOO"});

  dispatch({type: "USER_FETCH_START"});

  setTimeout(() => {
    const userList = ["Tove", "Anders"];
    dispatch({type: "USER_RECEIVED", payload: userList});
  }, 3000);

  var throwError = false;
  if (throwError){
    dispatch({type: "USER_FETCH_ERROR", payload:"An error was thrown"});
  }

})

//
// //1. Import the applyMiddleware from Redux
//
// const userReducer = (state={}, action) => {
//   //always have to return something
//   if (action.type === "CHANGE_NAME"){
//     //we will do restructuring here
//     state = {...state, name:action.payload};
//   }
//   if (action.type === "CHANGE_GENDER"){
//     state = {...state, gender:action.payload};
//   }
//   return state;
// }
// const tweetsReducer = (state=[], action) => {
//   return state;
// }
// const errorTestReducer = (state={}, action) => {
//   if (action.type === "ERROR_STATE"){
//     throw new Error("AAAAAAAA!");
//   }
//   return state;
//
// }
//
// const combReducers = combineReducers({
//   user: userReducer,
//   tweets: tweetsReducer,
//   errorTest: errorTestReducer
// })
//
// const reducer = function(state, action){
//   if (action.type === "INC") {
//     console.log("updating the state");
//     return state + action.payload;
//   }
//   if (action.type === "DEC") {
//     console.log("updating the state");
//     return state - action.payload;
//   }
//   return state;
// }
//
// //==============================================================
// // 2. We create the middleware with this pattern...
// const loggerMiddleware = (store) => (next) => (action) => {
//   console.log("action fired", action);
//   //NB remember to call the next action, otherwise we terminate
//   // the call chain
//   next(action);
//
// }
// // 5. We create the middleware with this pattern...
// const errorHandlerMiddleware = (store) => (next) => (action) => {
//   console.log("in the exceptionHandlerMiddleware", action);
//   //NB remember to call the next action, otherwise we terminate
//   // the call chain
//
//   try {
//     next(action);
//   } catch (error){
//     console.error("AHHHHH!", error);
//   }
// }
//
// //3. Create an middlewareApplication...
//
// //4. Add the middleware to the store at creation time

//
// //===============================================================
//
// store.subscribe(() => {
//   console.log("store changed", store.getState());
// })
// store.dispatch({type:"CHANGE_NAME",payload: "Anders"})
// store.dispatch({type:"CHANGE_GENDER",payload: "Male"})
//
// store.dispatch({type:"CHANGE_NAME",payload: "Tove"})
// store.dispatch({type:"CHANGE_GENDER",payload: "Female"})
// store.dispatch({type:"ERROR_STATE"});
//
// console.log("transaction completed");
