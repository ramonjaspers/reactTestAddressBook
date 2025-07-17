import { PropsWithChildren } from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return <div className={styles.error}>{children}</div>;
};

export default ErrorMessage;
