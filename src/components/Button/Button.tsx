import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  size: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  color: 'pink' | 'blue' | 'green' | 'yellow';
}

function Button({ text, size, children, color } : ButtonProps) {
  return (
        <div className={`${styles[size]} ${styles.button} ${styles[color]}`}>
          {text}
          {children}
        </div>
  );
}

export default Button;