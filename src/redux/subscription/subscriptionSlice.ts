import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BackendSubscriptionType,
  SubscriptionType,
  User,
} from "../../../types";

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
    loadSubscription: (
      state,
      action: PayloadAction<BackendSubscriptionType>
    ) => {
      state.subscription = action.payload.subscription;
      state.expirationDate = action.payload.expirationDate;
    },
    upgradePro: (state, action: PayloadAction<string>) => {
      state.subscription = "pro";
      state.expirationDate = action.payload;
    },
    upgradeUnlimited: (state) => {
      state.subscription = "unlimited";
    },

    subExpired: (state) => {
      state.subscription = "free";
    },
  },
});

export const { upgradePro, upgradeUnlimited, subExpired, loadSubscription } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
