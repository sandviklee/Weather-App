import React, { useState } from "react";
import Icon, { IconType } from "./../../icon/Icon";
import styles from "./Field.module.css";

interface FieldProps {
  label?: string;
  icon?: IconType;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  onChange?: (value: string) => void;
}

const Field = ({
  icon,
  label,
  placeholder,
  value,
  setValue,
  onChange,
}: FieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.field}>
      {icon && <Icon icon={icon} size={20} />}
      {label && <label>{label}</label>}
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Field;
