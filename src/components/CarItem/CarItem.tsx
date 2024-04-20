import { Button } from '../Button';
import { CarIcon } from '../../assets/icons';
import styles from './CarItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteCarItem, fetchCars } from '../../store/slices/CarManageSlice';
import { useState } from 'react';

interface CarItemProps {
  carColor: string;
  carName: string;
  carId: number;
  onSelectCar: (id: number, name: string, color: string) => void;
}


function CarItem({ carColor, carName, carId, onSelectCar }: CarItemProps) {

  const dispatch = useDispatch();
  const [isEngineStarted, setIsEngineStarted] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);


  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);

  const  handleDeleteCar = () => {
    dispatch(deleteCarItem(carId));
    dispatch(fetchCars());
  };


  const handleStartEngine = async () => {
    try {
      setIsEngineStarted(true);
      setIsAnimationActive(true);

      console.log(`id: ${carId}`);

      const res = await fetch(`http://127.0.0.1:3000/engine?status=started&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      const data = await res.json();
      const velocity = data.velocity;
      console.log(`velocity: ${velocity}`);

      const distance = data.distance;
      console.log(`distance: ${distance}`);

      setVelocity(velocity);
      setDistance(distance);

      startAnimation();

    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleStopEngine = async () => {
    try {
      setIsEngineStarted(false);
      setIsAnimationActive(false);

      await fetch(`http://127.0.0.1:3000/engine?status=stopped&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });

      console.log('stop');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startAnimation = () => {
    const width = window.innerWidth;
    console.log(width);
  };


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
                  className={styles.icon}
                   style={{
                     transform: `translateX(${isAnimationActive ? window.innerWidth - 175 : 0}px)`,
                     transitionDuration: `${distance / velocity}ms` }}
              >
                  <CarIcon colorIcon={carColor} />
              </div>
          </div>
          <p className={styles.text}>{carName}</p>
        </div>
  );
}

export default CarItem;