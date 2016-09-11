import { createStore } from 'redux';

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
const store = createStore(reducer, 0);

store.subscribe(() => {
  console.log("store changed", store.getState());
})
store.dispatch({type:"INC",payload: 3})
store.dispatch({type:"INC",payload: 3})
store.dispatch({type:"INC",payload: 3})
store.dispatch({type:"INC",payload: 3})
store.dispatch({type:"DEC",payload: 56})
console.log("transaction completed");
