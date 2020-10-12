// @flow
import * as React from "react";

import styles from "./Title.module.css";

type Props = {
  text: string,
  primary?: boolean,
};

function Title({ text, primary = false }: Props): React.Node {
  return <h2 className={primary ? styles.title : styles.subtitle}>{text}</h2>;
}

export default Title;
