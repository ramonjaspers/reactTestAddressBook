import { FormEvent, useState } from "react";

import Address, { type AddressType } from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import Form from "./ui/components/Form/Form";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import { AddressApiResponseSchema } from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import { useFormFields } from "./ui/hooks/useFormFields";

import "./App.css";
import { useMutation } from "@tanstack/react-query";

function App() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  const { addAddress } = useAddressBook();

  const {
    values: formFields,
    error: formError,
    handleChange,
    reset,
    setFormError,
  } = useFormFields({
    firstName: "",
    lastName: "",
    selectedAddress: "",
    zipCode: "",
    houseNumber: "",
  });

  const {
    mutate: fetchAddresses,
    isPending,
    error: apiError,
  } = useMutation({
    mutationFn: async ({
      zipCode,
      houseNumber,
    }: {
      zipCode: string;
      houseNumber: string;
    }) => {
      setAddresses([]);

      const corsProxy = "https://corsproxy.io/?";
      const apiUrl = `http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json&userip=123.123.123.123`;

      const response = await fetch(corsProxy + encodeURIComponent(apiUrl), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return AddressApiResponseSchema.parse({
        ...data,
        houseNumber: houseNumber,
      });
    },
    onSuccess: (data) => {
      setAddresses(data);

      setFormError(undefined);
    },
    onError: () => {
      setFormError(
        "Failed to fetch addresses. Please try again or check your input."
      );
    },
  });

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formFields.zipCode && formFields.houseNumber) {
      fetchAddresses({
        zipCode: formFields.zipCode,
        houseNumber: formFields.houseNumber,
      });
    }
  };

  const handlePersonSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formFields.selectedAddress || !addresses?.length) {
      setFormError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === formFields.selectedAddress
    );

    if (foundAddress) {
      const result = addAddress({
        ...foundAddress,
        firstName: formFields.firstName,
        lastName: formFields.lastName,
      });

      if (!result.success) {
        setFormError("This address is already in your address book!");

        return;
      }

      reset();
      setAddresses([]);
      setFormError(undefined);
    }
  };

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
          isSubmitting={isPending}
        >
          <InputText
            name="zipCode"
            placeholder="Zip Code"
            value={formFields.zipCode}
            onChange={handleChange("zipCode")}
          />

          <InputText
            name="houseNumber"
            placeholder="House number"
            value={formFields.houseNumber}
            onChange={handleChange("houseNumber")}
          />
        </Form>

        {addresses &&
          addresses.length > 0 &&
          addresses.map((address) => (
            <Radio
              name="selectedAddress"
              id={address.id}
              key={address.id}
              onChange={handleChange("selectedAddress")}
            >
              <Address address={address} />
            </Radio>
          ))}

        {formFields.selectedAddress && (
          <Form
            onSubmit={handlePersonSubmit}
            legend="✏️ Add personal info to address"
            submitText="Add to addressbook"
          >
            <InputText
              name="firstName"
              placeholder="First name"
              value={formFields.firstName}
              onChange={handleChange("firstName")}
            />

            <InputText
              name="lastName"
              placeholder="Last name"
              value={formFields.lastName}
              onChange={handleChange("lastName")}
            />
          </Form>
        )}

        <ErrorMessage>{formError || apiError?.message}</ErrorMessage>

        <Button
          onClick={() => {
            reset();
            setAddresses([]);
          }}
          variant="secondary"
        >
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
