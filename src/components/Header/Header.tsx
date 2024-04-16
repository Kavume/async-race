import styles from './Header.module.scss';
import { Button } from '../Button';

function Header() {
  return (
      <header className={styles.header}>
        <div className={styles.buttonsWrapper}>
          <Button text={'GARAGE'} size={'large'} />
          <Button text={'WINNERS'} size={'large'} />
        </div>
      </header>
  );
}

export default Header;