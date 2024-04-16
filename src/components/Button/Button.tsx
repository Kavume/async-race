import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  size: 'large' | 'medium' | 'small';
  children: React.ReactNode;
}

function Button({ text, size, children } : ButtonProps) {
  return (
        <div className={`${styles[size]} ${styles.button}`}>
          {text}
          {children}
        </div>
  );
}

export default Button;