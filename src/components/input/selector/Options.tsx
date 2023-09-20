import React, { useState } from "react";
import styles from "./Options.module.css";

interface OptionsInterface {
  options: string[];
  label: string;
  value: string | undefined;
  setValue: (value: string) => void;
}

const Options = ({ options, label, value, setValue }: OptionsInterface) => {
  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <select
        value={value || ""}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="" disabled>
          {label}
        </option>{" "}
        {/* Default label as an option */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Options;
