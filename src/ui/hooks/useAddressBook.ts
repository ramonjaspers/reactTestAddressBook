
import { useDispatch, useStore } from "react-redux";

import transformAddress from "../../core/models/address";
import databaseService from "../../core/services/databaseService";
import { addAddress as addAddressAction, removeAddress as removeAddressAction, addAddresses as addAddressesAction } from "../../core/reducers/addressBook";
import React from 'react';

export default function useAddressBook() {
  const dispatch = useDispatch();
  const store = useStore();
  const [loading, setLoading] = React.useState(true);

  const updateDatabase = React.useCallback(() => {
    const state = store.getState();
    databaseService.setItem("addresses", state.addressBook.addresses);
  }, [store]);

  return {
    /** Add address to the redux store */
    addAddress: (address: any) => {
      dispatch(addAddressAction(address));
      updateDatabase();
    },
    /** Remove address by ID from the redux store */
    removeAddress: (id: any) => {
      dispatch(removeAddressAction(id));
      updateDatabase();
    },
    /** Loads saved addresses from the indexedDB */
    loadSavedAddresses: async () => {
      const saved = await databaseService.getItem("addresses");
      // No saved item found, exit this function
      if (!saved || !Array.isArray(saved)) {
        setLoading(false);
        return;
      }
      dispatch(
        addAddressesAction(saved.map((address) => transformAddress(address)))
      );
      setLoading(false);
    },
    loading,
  };
}
