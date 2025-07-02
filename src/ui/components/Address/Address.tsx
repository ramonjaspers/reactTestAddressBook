import React from "react";

import styles from './Address.module.css'

export interface AddressProps {
  address: any;
}

const Address = ({ address }: AddressProps) => (
  <div className={styles.address}>
    {address.street} {address.houseNumber}, {address.postcode}, {address.city}
  </div>
);

export default Address;