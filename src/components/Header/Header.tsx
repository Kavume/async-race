import styles from './Header.module.scss';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

function Header() {
  const navigate = useNavigate();
  const goToGarage = () => {
    startTransition(() => {
      navigate('/');
    });
  };

  const goToWinners = () => {
    startTransition(() => {
      navigate('/winners');
    });
  };

  return (
      <header className={styles.header}>
        <div className={styles.buttonsWrapper}>
          <Button text={'GARAGE'} size={'large'} color={'pink'} onClick={goToGarage}/>
          <Button text={'WINNERS'} size={'large'} color={'blue'} onClick={goToWinners}/>
        </div>
        <div className={styles.nameWrapper}>
          <p className={styles.nameUpPart}>Async</p>
          <p className={styles.nameDownPart}>race</p>
        </div>
      </header>
  );
}

export default Header;