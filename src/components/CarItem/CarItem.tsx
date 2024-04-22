import { Button } from '../Button';
import { CarIcon } from '../../assets/icons';
import styles from './CarItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteCarItem, fetchCars } from '../../store/slices/CarManageSlice';
import { useEffect, useState } from 'react';

interface CarItemProps {
  carColor: string;
  carName: string;
  carId: number;
  onSelectCar: (id: number, name: string, color: string) => void;
}

function CarItem({ carColor, carName, carId, onSelectCar }: CarItemProps) {
  const dispatch = useDispatch();
  const [isEngineStarted, setIsEngineStarted] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isEngineBroken, setIsEngineBroken] = useState(false);

  const  handleDeleteCar = () => {
    dispatch(deleteCarItem(carId));
  };

  const handleStartEngine = async () => {
    try {
      setIsEngineStarted(true);

      const res = await fetch(`http://127.0.0.1:3000/engine?status=started&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      const data = await res.json();
      setVelocity(data.velocity);
      setDistance(data.distance);

      driveMode();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const driveMode = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3000/engine?status=drive&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });

      const codeOfError = 500;
      if (res.status === codeOfError) {
        setIsEngineBroken(true);
      } else {
        console.log('show winners');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStopEngine = async () => {
    try {
      setIsEngineStarted(false);

      await fetch(`http://127.0.0.1:3000/engine?status=stopped&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
        <div className={styles.itemWrapper}>
          <div className={styles.actionPanel}>
            <div className={styles.actionControlBtns}>
              <Button text={'select'} size={'small'} color={'blue'} onClick={() => onSelectCar(carId, carName, carColor)} />
              <Button text={'remove'} size={'small'} color={'pink'} onClick={handleDeleteCar}/>
            </div>
            <div className={styles.engineControlBtns}>
              <Button text={'a'} size={'small'} color={isEngineStarted ? 'disable' : 'yellow'} onClick={handleStartEngine}/>
              <Button text={'b'} size={'small'} color={isEngineStarted ? 'yellow' : 'disable'} onClick={handleStopEngine}/>
            </div>
              <div
                  className={`${styles.icon} ${isEngineStarted ? styles.startAnimation : ''} ${isEngineBroken ? styles.stopAnimation : ''}`}
                  style={{ animationDuration: `${distance / velocity}ms` }}
              >
                  <CarIcon colorIcon={carColor} />
              </div>
          </div>
          <p className={styles.text}>{carName}</p>
        </div>
  );
}

export default CarItem;