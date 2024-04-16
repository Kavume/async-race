import { Button, ButtonProps } from '../Button';
import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonProps {
  altText: string;
  iconSrc: string;
}

function IconButton({ altText, iconSrc, ...buttonProps }: IconButtonProps) {
  return (
        <Button size={'medium'} {...buttonProps}>
          <img className={styles.icon} src={iconSrc} alt={altText}/>
        </Button>
  );
}

export default IconButton;