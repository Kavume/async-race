import styles from './UpdateCar.module.scss';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { useCallback, useState } from 'react';
import { updateCar } from '../../../../store/slices/CarManageSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store/hooks';

interface UpdateCarProps {
  carId: number,
}

function UpdateCar( { carId }: UpdateCarProps) {
  const dispatch = useDispatch();
  const car = useAppSelector(state => state.allCars.carItems.find(i => i.id === carId));
  const initialColor = car ? car.color : '';
  const initialName = car ? car.name : '';

  const [updatedName, setUpdatedName] = useState(initialName);
  const [updatedColor, setUpdatedColor] = useState(initialColor);
  const id = car ? car.id : '';

  console.log(id);

  const handleUpdateCar = useCallback(() => {
    if (carId) {
      dispatch(updateCar({ carId: carId, carName: updatedName, carColor: updatedColor }));
    }
    setUpdatedName('');
    setUpdatedColor('');
  }, [dispatch, carId, updatedName, updatedColor]);

  return (
  <div className={styles.updateCarWrapper}>
    <Input placeholder={'Type car brand'} type={'text'} value={updatedName} onChange={(e) => setUpdatedName( e.target.value )} />
    <Input type={'color'} value={updatedColor} onChange={(e) => setUpdatedColor(e.target.value)} />
    <Button text={'update'} size={'medium'} color={'pink'} onClick={handleUpdateCar}/>
  </div>
  );
}

export default UpdateCar;