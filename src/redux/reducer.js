import { createStore } from "redux";


const initialState = {
  token: null,
  loggedInUser: null,
  user:[]
};
const STORE_TOKEN = 'STORE_TOKEN';
const STORE_USER = 'STORE_USER';
export const storeToken = (token) => {
  return {
    type: STORE_TOKEN,
    payload: token
  };
};
export const storeUser=(user)=>{
  return{
type: STORE_USER,
payload:user
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload
      };
      case STORE_USER:
        return {
          ...state,
          user: action.payload
        }
    default:
      return state;
  }
};
export const store = createStore(reducer);