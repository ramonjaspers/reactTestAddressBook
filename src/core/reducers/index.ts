import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";

import addressBookReducer from "./addressBook";

export const store = rtkConfigureStore({
  reducer: {
    addressBook: addressBookReducer,
  },
});

export const configureStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
