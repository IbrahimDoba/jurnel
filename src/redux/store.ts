import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import journalSlice from "./journal/journalSlice";
import todoSlice from "./todo/todoSlice";
import subscriptionSlice from "./subscription/subscriptionSlice";

const Allreducer = combineReducers({
  user: authSlice,
  journal: journalSlice,
  todos: todoSlice,
  subscription: subscriptionSlice,
  // IF ANY REDUX STATES ARE CREATED, ADD THEM HERE
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
