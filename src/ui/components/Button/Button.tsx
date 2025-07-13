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
      className={cx(styles.button, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary"
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;