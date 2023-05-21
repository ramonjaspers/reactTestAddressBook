import React from "react";

import $ from "./Form.module.css";
import Button from "../Button/Button";


const Form = ({
    onSubmit,
    children,
    legend,
    button
}) => {

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>✏️ {legend}</legend>
                {children}
                <Button type="submit">{button}</Button>
            </fieldset>
        </form>
    );
};

export default Form;