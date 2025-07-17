import { InputHTMLAttributes } from "react";

import styles from "./InputText.module.css";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputText = ({ ...props }: InputTextProps) => {
  return <input className={styles.inputText} type="text" {...props} />;
};

export default InputText;
