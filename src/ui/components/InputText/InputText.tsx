import React from "react";

import styles from "./InputText.module.css";

export interface InputTextProps {
  name?: string;
  onChange: any;
  placeholder?: string;
  value?: string;
}

const InputText = ({ name, onChange, placeholder, value }: InputTextProps) => {
  return (
    <input
      className={styles.inputText}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  );
};

export default InputText;
