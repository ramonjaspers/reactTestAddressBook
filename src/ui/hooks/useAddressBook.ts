
import { useDispatch, useStore, useSelector } from "react-redux";

import databaseService from "../../core/services/databaseService";
import { 
  addAddress as addAddressAction, 
  removeAddress as removeAddressAction, 
  loadAddresses as loadAddressesAction,
  selectAllAddresses
} from "../../core/reducers/addressBook";
import { RootState } from "../../core/reducers";
import React from 'react';
import { AddressType } from "components/Address/Address";

type AddAddressResult = 
  | { success: true }
  | { success: false; reason: 'duplicate_id' };

export default function useAddressBook() {
  const dispatch = useDispatch();
  const store = useStore();
  const [loading, setLoading] = React.useState(true);
  
  const addresses = useSelector(selectAllAddresses);

  const updateDatabase = React.useCallback(() => {
    const state = store.getState() as RootState;
    databaseService.setItem("addresses", state.addressBook.addresses);
  }, [store]);

  return {
    addresses,
    /** Add address to the redux store */
    addAddress: (address: AddressType): AddAddressResult => {
      const existingAddresses = (store.getState() as RootState).addressBook.addresses;
      const hasId = existingAddresses.some((a: AddressType) => a.id === address.id);
      
      if (hasId) {
        return { success: false, reason: 'duplicate_id' };
      }
      
      dispatch(addAddressAction(address));
      updateDatabase();
      return { success: true };
    },
    /** Remove address by ID from the redux store */
    removeAddress: (id: string) => {
      dispatch(removeAddressAction(id));
      updateDatabase()
    },
    /** Loads saved addresses from the indexedDB */
    loadSavedAddresses: async () => {
      const saved = await databaseService.getItem("addresses");
      if (!saved || !Array.isArray(saved)) {
        setLoading(false);
        return;
      }

      dispatch(loadAddressesAction(saved));
      setLoading(false);
    },
    loading,
  };
}
