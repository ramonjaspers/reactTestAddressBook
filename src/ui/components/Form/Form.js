import React from "react";

import "./Form.module.css";

const Form = ({ legend, onSubmit, children }) => {
	return (
		<form onSubmit={onSubmit}>
			<fieldset>
				{legend && <legend>{legend}</legend>}
				{children}
			</fieldset>
		</form>
	);
};

export default Form;
