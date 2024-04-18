import styles from './Input.module.scss';
import React from 'react';

interface InputProps {
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, placeholder, onChange }: InputProps) {
  return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
  );
}

export default Input;