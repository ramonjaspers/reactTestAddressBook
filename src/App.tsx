import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormFields";

import "./App.css";
import Form from "./ui/components/Form/Form";
import FormRow from "./ui/components/Form/FormRow";
import ErrorMessage from "./ui/components/Form/ErrorMessage";

function App() {
  const { fields, handleChange, resetFields } = useFormFields({
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });

  const [error, setError] = React.useState<string | undefined>(undefined);
  const [addresses, setAddresses] = React.useState<any[]>([]);

  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e: any) => {
    console.log("handleAddressSubmit", fields);
    e.preventDefault();

    // Voeg loading state toe (bonus uit TODO)
    setError(undefined);

    try {
      const response = await fetch(
        `https://postcode.tech/api/v1/postcode?postcode=${fields.zipCode}&number=${fields.houseNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer 9d8e8c4b-881c-4de2-8e27-54bdbbe3b5b7", // Vervang met je echte API key
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

  const handlePersonSubmit = (e: any) => {
    e.preventDefault();
    if (!fields.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }
    const foundAddress = addresses.find(
      (address) => address.id === fields.selectedAddress
    );
    addAddress({
      ...foundAddress,
      firstName: fields.firstName,
      lastName: fields.lastName,
    });
  };
  console.log("addresses", addresses);
  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by zipcode add personal info and done! 👏
          </small>
        </h1>
        <Form
          onSubmit={handleAddressSubmit}
          legend="🏠 Find an address"
          submitText="Find"
        >
          <FormRow>
            <InputText
              name="zipCode"
              onChange={handleChange}
              placeholder="Zip Code"
              value={fields.zipCode}
            />
          </FormRow>
          <FormRow>
            <InputText
              name="houseNumber"
              onChange={handleChange}
              value={fields.houseNumber}
              placeholder="House number"
            />
          </FormRow>
        </Form>
        {addresses.length > 0 &&
          addresses.map((address) => (
            <Radio
              name="selectedAddress"
              id={address.id}
              key={address.id}
              onChange={handleChange}
            >
              <Address address={address} />
            </Radio>
          ))}
        {fields.selectedAddress && (
          <Form
            onSubmit={handlePersonSubmit}
            legend="✏️ Add personal info to address"
            submitText="Add to addressbook"
          >
            <FormRow>
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                value={fields.firstName}
              />
            </FormRow>
            <FormRow>
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                value={fields.lastName}
              />
            </FormRow>
          </Form>
        )}
        {error && <ErrorMessage message={error} />}
      </Section>

      <Section variant="dark">
        <Button variant="secondary" onClick={resetFields}>
          Reset
        </Button>
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
