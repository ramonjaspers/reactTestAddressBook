import React from "react";
import cx from "classnames";

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
                <div className={$.formRow}>
                    {children}
                </div>
                <Button type="submit">{button}</Button>
            </fieldset>
        </form>
    );
};

export default Form;