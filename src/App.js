import React from "react";
import axios from "axios";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Form from "./ui/components/Form/Form";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";

const API_KEY = "fe221d79-b3a3-4339-9ddd-130d44cad0c4";

function App() {
	/**
	 * Form fields states
	 * TODO: Write a custom hook to set form fields in a more generic way:
	 * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
	 * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
	 * - Remove all individual React.useState
	 * - Remove all individual onChange handlers, like handleZipCodeChange for example
	 */

	// Laurie: de algemene hook zou er zo uitzien:
	// const [userInput, setUserInput] = useState({
	// 	setZipCode: ``,
	// 	setHouseNumber: ``,
	// 	setFirstName: ``,
	// });
	// etc.
	// De handler zou handleUserInputChange kunnen zijn, maar het lukte me niet om dat 100% goed te krijgen, dus ik heb hier even de individuele onChange handlers laten staan.
	const [zipCode, setZipCode] = React.useState("");
	const [houseNumber, setHouseNumber] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [selectedAddress, setSelectedAddress] = React.useState("");
	const [buttonChecked, setButtonChecked] = React.useState(false);
	/**
	 * Results states
	 */
	const [error, setError] = React.useState(undefined);
	// const [loading, setLoading] = React.useState(false);
	const [addresses, setAddresses] = React.useState([]);
	const [showComponent, setShowComponent] = React.useState(false);

	/**
	 * Redux actions
	 */
	const { addAddress } = useAddressBook();

	/**
	 * Text fields onChange handlers
	 */
	const handleZipCodeChange = (e) => setZipCode(e.target.value);

	const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

	const handleFirstNameChange = (e) => setFirstName(e.target.value);

	const handleLastNameChange = (e) => setLastName(e.target.value);

	const handleSelectedAddressChange = (e) => {
		setButtonChecked(true);
		setShowComponent(true);
		setSelectedAddress(JSON.parse(e.target.value));
	};

	console.log(selectedAddress);
	// Laurie: selectedAddress is nu een object met de juiste waardes, maar het lukt me niet om dit toe te voegen aan het adresboek.

	const handleAddressSubmit = async (e) => {
		e.preventDefault();
		// setLoading(true);

		axios({
			url: `https://postcode.tech/api/v1/postcode/full?postcode=${zipCode}&number=${houseNumber}`,
			method: "GET",
			headers: {
				authorization: `Bearer ${API_KEY}`,
			},
		})
			.then((response) => {
				transformAddress(addresses);
				{
					const fullStreet = `${response.data.street} ${houseNumber}`;
					setAddresses([
						...addresses,
						{
							street: fullStreet,
							zipCode: zipCode,
							city: response.data.city,
						},
						// setLoading(false),
					]);
				}
			})

			.catch((err) => {
				if (err.response.status === 404) {
					alert(err.response.data.message);
				} else {
					alert(
						`${err.response.data.message} Please provide a zip code in the format "1234AB" and a house number without a suffix. Please try again!`
					);
				}
				console.log(err);
			});

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
			setError("No address selected, try to select an address or find one if you haven't");
			return;
		}

		const foundAddress = addresses.find((address) => address.id === selectedAddress);

		addAddress({ ...foundAddress, firstName, lastName });
	};

	const handleClearForm = () => {
		setZipCode("");
		setHouseNumber("");
		setFirstName("");
		setLastName("");
		setSelectedAddress("");
		setAddresses("");
	};

	return (
		<main>
			<Section>
				<h1>
					Create your own address book!
					<br />
					<small>Enter an address by zipcode add personal info and done! 👏</small>
				</h1>
				{/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
				<Form
					legend="🏠 Find an address"
					onSubmit={handleAddressSubmit}
				>
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
					<Button
						type="submit"
						variant="primary"
					>
						Find this address
					</Button>
				</Form>
				{addresses.length > 0 &&
					addresses.map((address, id) => {
						return (
							<div>
								<Radio
									name="selectedAddress"
									id={address.id}
									key={id}
									value={JSON.stringify({ street: address.street, zipCode: address.zipCode, city: address.city })}
									checked={buttonChecked}
									onChange={handleSelectedAddressChange}
								>
									<Address address={address} />
								</Radio>
							</div>
						);
					})}
				{/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}

				{showComponent && (
					<Form
						legend="✏️ Add personal info to address"
						onSubmit={handlePersonSubmit}
					>
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
						<Button
							type="submit"
							variant="primary"
						>
							Add to address book
						</Button>
					</Form>
				)}

				{/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
				{error && <div className="error">{error}</div>}
				{/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
				<Button
					onClick={() => {
						handleClearForm();
					}}
					variant="tertiary"
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
