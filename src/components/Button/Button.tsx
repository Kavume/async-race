import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  size: 'large' | 'medium' | 'small';
}

function Button({ text, size } : ButtonProps) {
  return (
        <div className={`${styles[size]} ${styles.button}`}>
          {text}
        </div>
  );
}

export default Button;