import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import journalSlice from "./journal/journalSlice";

const Allreducer = combineReducers({
  user: authSlice,
  journal: journalSlice,
  // IF ANY REDUX STATES ARE CREATED, ADD THEM HERE
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
