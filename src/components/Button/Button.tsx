import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  size: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  color: 'pink' | 'blue' | 'green' | 'yellow' | 'disable';
  onClick?: () => void;
}

function Button({ text, size, children, color, onClick } : ButtonProps) {
  let boxShadowStyle = {};
  if (size === 'large') {
    boxShadowStyle = {
      boxShadow: `2px 2px 10px ${color === 'pink' ? '#e88fff' : '#9bfdff'}`,
    };
  }
  return (
        <div
            className={`${styles[size]} ${styles.button} ${styles[color]}`}
            style={boxShadowStyle}
            onClick={onClick}
        >
          {text}
          {children}
        </div>
  );
}

export default Button;