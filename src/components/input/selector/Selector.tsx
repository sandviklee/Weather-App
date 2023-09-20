import React, { useState } from "react";
import styles from "./Selector.module.css";

interface SelectorProps {
  selections: string[];
}

const Selector = ({ selections }: SelectorProps) => {
  const [selected, setSelected] = useState<string>(selections[0]);
  return (
    <div className={styles.button_group}>
      {selections.map((selection, index) => (
        <React.Fragment key={selection}>
          <input
            type="radio"
            id={`btn-${index}`}
            name="button-group"
            value={selection}
            checked={selected === selection}
            onChange={() => setSelected(selection)}
            className={styles.hidden_radio}
          />
          <label htmlFor={`btn-${index}`} className={styles.button_label}>
            {selection}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Selector;
