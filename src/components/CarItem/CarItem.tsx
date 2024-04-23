import { Button } from '../Button';
import { CarIcon } from '../../assets/icons';
import styles from './CarItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteCarItem } from '../../store/slices/CarManageSlice';
import { startEngineFetch, stopEngineFetch } from '../../store/slices/CarEngineSlice';
import { useAppSelector } from '../../store/hooks';

interface CarItemProps {
  carColor: string;
  carName: string;
  carId: number;
  onSelectCar: (id: number, name: string, color: string) => void;
}

function CarItem({ carColor, carName, carId, onSelectCar }: CarItemProps) {
  const dispatch = useDispatch();
  const currentCar = useAppSelector(state => state.carEngine[carId]) || {};
  const { velocity, distance, isEngineStarted, isBroken } = currentCar;

  const handleStartEngine = async (id) => {
    dispatch(startEngineFetch(id));
  };

  const handleStopEngine = async (id) => {
    dispatch(stopEngineFetch(id));
  };

  const handleDeleteCar = () => {
    dispatch(deleteCarItem({ id: carId }));
  };

  return (
        <div className={styles.itemWrapper}>
          <div className={styles.actionPanel}>
            <div className={styles.actionControlBtns}>
              <Button text={'select'} size={'small'} color={'blue'} onClick={() => onSelectCar(carId, carName, carColor)} />
              <Button text={'remove'} size={'small'} color={'pink'} onClick={handleDeleteCar}/>
            </div>
            <div className={styles.engineControlBtns}>
              <Button text={'a'} size={'small'} color={isEngineStarted ? 'disable' : 'yellow'} onClick={() => handleStartEngine(carId)}/>
              <Button text={'b'} size={'small'} color={isEngineStarted ? 'yellow' : 'disable'} onClick={() => handleStopEngine(carId)}/>
            </div>
              <div
                  className={`${styles.icon} ${isEngineStarted ? styles.startAnimation : ''} ${isBroken ? styles.stopAnimation : ''}`}
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