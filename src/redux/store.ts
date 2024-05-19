import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import journalSlice from "./journal/journalSlice";
import todoSlice from "./todo/todoSlice";

const Allreducer = combineReducers({
  user: authSlice,
  journal: journalSlice,
  todos: todoSlice,
  // IF ANY REDUX STATES ARE CREATED, ADD THEM HERE
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
