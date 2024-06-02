import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubscriptionType, User } from "../../../types";

type initialStateType = {
  subscription: SubscriptionType;
  expirationDate: string | null;
};
const initailState: initialStateType = {
  subscription: "free",
  expirationDate: null,
};
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: initailState,
  reducers: {
    upgradePro: (state) => {
      state.subscription = "pro";
    },
    upgradeUnlimited: (state) => {
      state.subscription = "unlimited";
    },

    subExpired: (state) => {
      state.subscription = "free";
    },
  },
});

export const { upgradePro, upgradeUnlimited, subExpired } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
