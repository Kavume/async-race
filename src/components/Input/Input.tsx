import styles from './Input.module.scss';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, placeholder, onChange, ...props }: InputProps) {
  return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            {...props}
        />
  );
}

export default Input;