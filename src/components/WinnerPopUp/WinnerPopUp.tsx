import { useAppSelector } from '../../store/hooks';
import styles from './WinnerPopUp.module.scss';
import { useEffect, useState } from 'react';

const TIME = 3000;

function WinnerPopUp() {
  const winner = useAppSelector(state => state.winners.winnerCar);
  const allCars = useAppSelector(state => state.allCars.carItems);
  const winningCar = allCars.find(car => car.id === winner?.id);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
      }, TIME);

      return () => clearTimeout(timer);
    }
  }, [winner]);

  if (!showPopup) return null;

  return (
        <div className={styles.popUpWrap}>
          <p className={styles.winner}>Winner</p>
          <p className={styles.info}>{winningCar && winningCar.name}</p>
          <p className={styles.info}>Time: {winner && winner.time} s</p>
        </div>
  );
}

export default WinnerPopUp;