import React from "react";

import $ from "./Radio.module.css";

const Radio = ({ children, id, name, onChange, value }) => {
	return (
		<div className={$.radio}>
			<input
				type="radio"
				id={id}
				name={name}
				onChange={onChange}
				value={value}
			/>
			<label htmlFor={id}>{children}</label>
		</div>
	);
};

export default Radio;
