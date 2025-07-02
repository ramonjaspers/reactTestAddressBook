import React from "react";

import styles from "./Card.module.css";

export interface CardProps {
  children: string;
}

const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card; 