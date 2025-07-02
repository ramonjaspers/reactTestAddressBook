import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressBookState {
  addresses: any[];
}

const initialState: AddressBookState = {
  addresses: [],
};

const addressBookSlice = createSlice({
  name: "addressBook",
  initialState,
  reducers: {
    /** TODO: Prevent duplicate addresses */
    addAddress(state: AddressBookState, action: PayloadAction<any>) {
      state.addresses.push(action.payload);
    },
    /** TODO: Write a state update which removes an address from the addresses array. */
    removeAddress(state: AddressBookState, action: PayloadAction<any>) {
      state.addresses = state.addresses.filter(
        (addr: any) => addr.id !== action.payload
      );
    },
    addAddresses(state: AddressBookState, action: PayloadAction<any[]>) {
      state.addresses = action.payload;
    },
  },
});

export const { addAddress, removeAddress, addAddresses } = addressBookSlice.actions;

export default addressBookSlice.reducer;
