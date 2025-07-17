import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

import addressBookReducer from "./addressBook";

enableMapSet();

export const store = rtkConfigureStore({
  reducer: {
    addressBook: addressBookReducer,
  },
});

export const configureStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
