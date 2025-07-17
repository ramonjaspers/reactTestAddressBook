import { PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./Section.module.css";

interface SectionProps extends PropsWithChildren {
  variant?: "light" | "dark";
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
