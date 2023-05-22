import React from "react";

import $ from "./Address.module.css";

const Address = ({ address }) => {
	return (
		<address className={$.address}>
			{address.street} {address.houseNumber}, {address.zipCode}, {address.city}
		</address>
	);
};

export default Address;
