import React from "react";
import cx from "classnames";

import $ from "./Form.module.css";


const Form = ({

}) => {

    return (
        <form
            // TODO: Add conditional classNames
            // - Must have a condition to set the '.primary' className
            // - Must have a condition to set the '.secondary' className
            variant={variant}
            className={cx($.button, checkClassName())}
            type={type}
            onClick={onClick}
        >
            {children}
        </form>
    );
};

export default Form;