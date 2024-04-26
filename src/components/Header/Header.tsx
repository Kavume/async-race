import styles from './Header.module.scss';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stopEngineFetch } from '../../store/slices/CarEngineSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cars = useSelector(state => state.allCars.carItems);

  const goToGarage = () => {
    startTransition(() => {
      navigate('/');
    });
  };

  const goToWinners = () => {
    startTransition(() => {
      navigate('/winners');
    });
    cars.forEach((car) => dispatch(stopEngineFetch(car.id)));
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