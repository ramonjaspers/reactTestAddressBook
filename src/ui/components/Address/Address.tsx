import styles from "./Address.module.css";

export type AddressType = {
  city: string;
  firstName: string;
  houseNumber: string;
  id: string;
  lastName: string;
  postcode: string;
  street: string;
};

interface AddressProps {
  address: AddressType;
}

const Address = ({ address }: AddressProps) => (
  <div className={styles.address}>
    {address.street} {address.houseNumber}, {address.postcode}, {address.city}
  </div>
);

export default Address;
