import React from "react";
import cx from "classnames";

import styles from "./Section.module.css";

export interface SectionProps {
  children: React.ReactNode;
  variant?: string; // light or dark
}

const Section = ({ children, variant = "light" }: SectionProps) => (
  <section
    className={cx(styles.section, {
      [styles.light as string]: variant === "light",
      [styles.dark as string]: variant === "dark",
    })}
  >
    {children}
  </section>
);

export default Section; 