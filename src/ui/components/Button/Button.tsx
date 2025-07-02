import React from "react";
import cx from "classnames";

import styles from "./Button.module.css";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: any; // "button" or "submit" or "reset"
  variant?: string; // 'primary' or 'secondary'
}

const Button = ({ children, onClick, type = "button", variant = "primary" }: ButtonProps) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={styles.button}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 