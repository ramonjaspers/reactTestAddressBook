import { PropsWithChildren } from "react";

import styles from "./Card.module.css";

interface CardProps extends PropsWithChildren {}

const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
