import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";


const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",  // or 'secondary'
}) => {

  const checkClassName = () => {
    if (variant === 'primary')
      return $.primary
    else if (variant === 'secondary')
      return $.secondary
  }

  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      variant={variant}
      className={cx($.button, checkClassName())}
      type={type}
      onClick={onClick}

    >
      {children}
    </button>
  );
};

export default Button;
