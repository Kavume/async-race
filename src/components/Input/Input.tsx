import styles from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder?: string;
}

function Input({ type, placeholder }: InputProps) {
  return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
        />
  );
}

export default Input;