import { Button, ButtonProps } from '../Button';
import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

function IconButton({ icon, ...buttonProps }: IconButtonProps) {
  return (
        <Button size={'medium'} {...buttonProps}>
            <div className={styles.icon}>
                {icon}
            </div>
        </Button>
  );
}

export default IconButton;