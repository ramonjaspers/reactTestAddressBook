import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage"

import "./App.css";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */
  const [zipCode, setZipCode] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");
  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();


  const clearAddress = () => {
    setError('')
    setAddresses('');
  }
  /**
   * Text fields onChange handlers
   */
  const handleZipCodeChange = (e) => setZipCode(e.target.value);

  const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => { setSelectedAddress(JSON.parse(localStorage.getItem(e.target.value))[0]) };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    clearAddress()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer a2cb5ff3-ca75-4616-9783-d1930c7006c0");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch('https://postcode.tech/api/v1/postcode/full?postcode=' + zipCode + "&number=" + houseNumber, requestOptions);
    const json = await response.text();
    let data = JSON.parse(json)

    if (!data.postcode) {
      setError(data.message)
    }
    else {
      let array = []
      array.push(data)
      var ID = GetNewId()
      data.id = ID
      data.houseNumber = data.number
      setAddresses(array)
      localStorage.setItem(ID, JSON.stringify(array))
    }

    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }
    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress.id
    );
    addAddress({ ...foundAddress, firstName, lastName });
  };

  const GetNewId = () => {
    return Math.floor(Math.random() * 100)
  }

  const clearAllFields = () => {
    setZipCode('');
    setHouseNumber('');
    setFirstName('')
    setLastName('')
    setSelectedAddress('')
    setAddresses('')
    clearAddress()
  }

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
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form onSubmit={handleAddressSubmit} legend="🏠 Find an address" button="Find">
          <div className="form-row">
            <InputText
              name="zipCode"
              onChange={handleZipCodeChange}
              placeholder="Zip Code"
              value={zipCode}
            />
          </div>
          <div className="form-row">
            <InputText
              name="houseNumber"
              onChange={handleHouseNumberChange}
              value={houseNumber}
              placeholder="House number"
            />
          </div>
        </Form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <Form onSubmit={handlePersonSubmit} legend="Add personal info to address" button="Add to addressbook">
            <div className="form-row">
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={handleFirstNameChange}
                value={firstName}
              />
            </div>
            <div className="form-row">
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={handleLastNameChange}
                value={lastName}
              />
            </div>
          </Form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage Error={error} />}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button
          variant="outline"
          onClick={() => {
            clearAllFields()
          }}
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
