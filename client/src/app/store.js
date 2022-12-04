import { configureStore } from "@reduxjs/toolkit";
import triggerReducer from "../features/popuptrigger/triggerSlice";
import loginReducer from "../features/loginstate/loginSlice";
import forceUpdateReducer from "../features/forceUpdate/forceUpdateSlice";
import userNameReducer from "../features/userName/userNameSlice";

export const store = configureStore({
  reducer: {
    trigger: triggerReducer,
    login: loginReducer,
    forceUpdate: forceUpdateReducer,
    userName: userNameReducer,
  },
});
