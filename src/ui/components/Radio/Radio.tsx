import React from "react";

import styles from "./Radio.module.css";

export interface RadioProps {
  children: React.ReactNode;
  id: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Radio = ({ children, id, name, onChange }: RadioProps) => (
  <div className={styles.radio}>
    <input type="radio" id={id} name={name} onChange={onChange} value={id} />
    <label htmlFor={id}>{children}</label>
  </div>
);

export default Radio; 