import React from "react";
import { useSelector } from "react-redux";

import Address from "../Address/Address";
import Button from "../Button/Button";
import Card from "../Card/Card";
import useAddressBook from "../../hooks/useAddressBook";

import styles from "./AddressBook.module.css";

const AddressBook = () => {
  const addresses = useSelector((state: any) => state.addressBook.addresses);
  const { removeAddress, loadSavedAddresses, loading } = useAddressBook();

  React.useEffect(() => {
    loadSavedAddresses();
  }, []);

  return (
    <section className={styles.addressBook}>
      <h2>📓 Address book ({addresses.length})</h2>
      {!loading && (
        <>
          {addresses.length === 0 && <p>No addresses found, try add one 😉</p>}
          {addresses.map((address: any) => {
            return (
              <Card key={address.id}>
                <div className={styles.item}>
                  <div>
                    <h3>
                      {address.firstName} {address.lastName}
                    </h3>
                    <Address address={address} />
                  </div>
                  <div className={styles.remove}>
                    <Button
                      variant="secondary"
                      onClick={() => removeAddress(address.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </>
      )}
    </section>
  );
};

export default AddressBook;
