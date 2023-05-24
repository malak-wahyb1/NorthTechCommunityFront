import { createStore } from "redux";

const initialState = {
  token: null,
  loggedInUser: null,
  user: [],
  chat: [],
  newChat:[],
  notification:[],
  selectedChat: null,
};
const STORE_TOKEN = "STORE_TOKEN";
const STORE_USER = "STORE_USER";
const STORE_CHAT = "STORE_CHAT";
const STORE_NEWCHAT = "STORE_NEWCHAT";
const STORE_SELECTEDCHAT = "STORE_SELECTEDCHAT";
const STORE_NOTIFICATION="STORE_NOTIFICATION";

export const storeToken = (token) => {
  return {
    type: STORE_TOKEN,
    payload: token,
  };
};
export const storeUser = (user) => {
  return {
    type: STORE_USER,
    payload: user,
  };
};
export const storeChat = (chat) => {
  return {
    type: STORE_CHAT,
    payload: chat,
  };
};
export const storeNewChat=(newChat)=>{
  return{
    type:STORE_NEWCHAT,
    payload: newChat
  }
}
export const storeSelectedChat=(selectedChat)=>{
return {
  type:STORE_SELECTEDCHAT,
  payload:selectedChat
}
}
export const storeNotification=(notification)=>{
  return {
    type:STORE_NOTIFICATION,
    payload:notification
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case STORE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case STORE_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
      case STORE_NEWCHAT:
        return {
          ...state,
        newChat: action.payload,
        }
        case STORE_SELECTEDCHAT:
          return{
            ...state,
            selectedChat: action.payload
          }
          case STORE_NOTIFICATION:
            return{
              ...state,
              notification: action.payload
            }  
    default:
      return state;
  }
};
export const store = createStore(reducer);
