import { InputHTMLAttributes, PropsWithChildren } from "react";

import styles from "./Radio.module.css";

interface RadioProps
  extends PropsWithChildren,
    InputHTMLAttributes<HTMLInputElement> {}

const Radio = ({ children, id, name, onChange, ...props }: RadioProps) => (
  <label htmlFor={id} className={styles.radio}>
    <input
      type="radio"
      id={id}
      name={name}
      onChange={onChange}
      value={id}
      {...props}
    />

    {children}
  </label>
);

export default Radio;
