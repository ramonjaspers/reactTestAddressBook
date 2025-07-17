import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressType } from "components/Address/Address";
import { RootState } from "./index";

interface AddressBookState {
  addresses: AddressType[];
}

const initialState: AddressBookState = {
  addresses: [],
};


const addressBookSlice = createSlice({
  name: "addressBook",
  initialState,
  reducers: {
    addAddress(state, { payload }: PayloadAction<AddressType>) {
      const hasId = state.addresses.some(a => a.id === payload.id);
      if (hasId) return;
      
      state.addresses.push(payload);
    },

    removeAddress(state, { payload }: PayloadAction<string>) {
      state.addresses = state.addresses.filter(a => a.id !== payload);
    },

    loadAddresses(state, { payload }: PayloadAction<AddressType[]>) {
      state.addresses = payload;
    },
  },
});

export const selectAllAddresses = (state: RootState) => state.addressBook.addresses;

export const { addAddress, removeAddress, loadAddresses } = addressBookSlice.actions;

export default addressBookSlice.reducer;
