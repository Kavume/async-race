import styles from './Header.module.scss';
import { Button } from '../Button';

function Header() {
  return (
      <header className={styles.header}>
        <div className={styles.buttonsWrapper}>
          <Button text={'GARAGE'} size={'large'} color={'pink'}/>
          <Button text={'WINNERS'} size={'large'} color={'blue'} />
        </div>
      </header>
  );
}

export default Header;