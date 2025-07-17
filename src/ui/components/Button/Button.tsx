import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./Button.module.css";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      className={cx(styles.button, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
