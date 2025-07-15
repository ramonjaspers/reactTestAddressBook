import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import Form from "./ui/components/Form/Form";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormFields";

import "./App.css";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import Button from "./ui/components/Button/Button";

function App() {
  const { fields, onChange, reset: resetFields } = useFormFields({
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });


  const [error, setError] = React.useState<string | undefined>(undefined);
  const [addresses, setAddresses] = React.useState<any[]>([]);
  const { addAddress } = useAddressBook();
  const [savedAddresses, setSavedAddresses] = React.useState<any[]>([]);

  const handleAddressSubmit = async (e: any) => {
    console.log("handleAddressSubmit", fields);
    e.preventDefault();
    setError(undefined);

    try {
      const response = await fetch(
        `https://postcode.tech/api/v1/postcode?postcode=${fields.zipCode}&number=${fields.houseNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_POSTCODES_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Parsed data:", data);

      const transformedAddress = transformAddress(data, fields.houseNumber);

      setAddresses([transformedAddress]);
      setError(undefined);
    } catch (error) {
      console.error("Full error:", error);
      setError(`Failed to fetch address data: ${error}`);
    }
  };

  const handlePersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fields.selectedAddress || !addresses.length) {
      setError("Please select an address first");
      return;
    }

    const selectedAddress = addresses.find(addr => addr.id === fields.selectedAddress);

    if (!selectedAddress) {
      setError("Selected address not found");
      return;
    }

    console.log("handlePersonSubmit", fields, selectedAddress);
  
    addAddress({
      ...selectedAddress,
      firstName: fields.firstName,
      lastName: fields.lastName,
    });
    console.log("addresses", addresses);
    // Reset form and clear addresses
    resetFields();
    setAddresses([]);
    setError(undefined);
  };

  const clearAll = () => {
    resetFields();
    setAddresses([]);
    setError(undefined);
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>Enter an address by zipcode add personal info and done! 👏</small>
        </h1>

        <Form legend="🏠 Find an address" onSubmit={handleAddressSubmit} submitLabel="Find">
          <div className="form-row">
            <InputText
              name="zipCode"
              onChange={onChange}
              placeholder="Zip Code"
              value={fields.zipCode}
            />
          </div>
          <div className="form-row">
            <InputText
              name="houseNumber"
              onChange={onChange}
              value={fields.houseNumber}
              placeholder="House number"
            />
          </div>
        </Form>

        {addresses.length > 0 && (
          <div className="address-selection">
            {addresses.map((address) => (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={onChange}
              >
                <Address address={address} />
              </Radio>
            ))}
          </div>
        )}

        {fields.selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            onSubmit={handlePersonSubmit}
            submitLabel="Add to addressbook"
          >
            <div className="form-row">
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={onChange}
                value={fields.firstName}
              />
            </div>
            <div className="form-row">
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={onChange}
                value={fields.lastName}
              />
            </div>
          </Form>
        )}

        <ErrorMessage message={error} onClose={() => setError(undefined)} />

        {(fields.zipCode || fields.houseNumber || fields.firstName || fields.lastName || addresses.length > 0) && (
          <Button variant="secondary" onClick={clearAll}>
            Clear all fields
          </Button>
        )}
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
