import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './GaragePage.module.scss';
import { useEffect, useState } from 'react';

import { RaceIcon } from '../../assets/icons';
import { ResetIcon } from '../../assets/icons';
import { CarItem } from '../../components/CarItem';

import { useDispatch } from 'react-redux';
import { createNewCar, fetchCars, updateCar } from '../../store/slices/CarManageSlice';
import { useAppSelector } from '../../store/hooks';


function GaragePage() {
  const [carNameValue, setCarNameValue] = useState('');
  const [carColorValue, setCarColorValue] = useState('');
  const [carUpdatedColorValue, setCarUpdatedColorValue] = useState('');
  const [carUpdatedNameValue, setCarUpdatedNameValue] = useState('');
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const allCars = useAppSelector(state => state.allCars);

  const handleCreateNewCar = async () => {
    dispatch(createNewCar({ carNameValue, carColorValue }));
    dispatch(fetchCars());

    setCarNameValue('');
    setCarColorValue('');
  };

  const handleUpdateCar = async () => {
    if (selectedCarId) {
      dispatch(updateCar({ carId: selectedCarId, carName: carUpdatedNameValue, carColor: carUpdatedColorValue }));
    }
    setSelectedCarId(null);
    setCarUpdatedNameValue('');
    setCarUpdatedColorValue('');
  };

  const handleSelectCar = (id: number, name: string, color: string) => {
    setSelectedCarId(id);
    setCarUpdatedNameValue(name);
    setCarUpdatedColorValue(color);
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
      <>
        <div className={styles.controlPanel}>
          <div className={styles.buttonsWrapper}>
            <IconButton text={'race'} icon={<RaceIcon colorIcon={'var(--green)'} />} color={'green'} />
            <IconButton text={'reset'} icon={<ResetIcon colorIcon={'var(--pink)'} />} color={'pink'} />
          </div>
          <div className={styles.inputsWrapper}>
          <div className={styles.createCarWrapper}>
            <Input placeholder={'Type car brand'} type={'text'} onChange={(e) => setCarNameValue(e.target.value)} value={carNameValue} />
            <Input type={'color'} onChange={(e) => setCarColorValue(e.target.value)} value={carColorValue} />
            <Button text={'create'} size={'medium'} color={'pink'} onClick={ handleCreateNewCar } />
          </div>
            <div className={styles.updateCarWrapper}>
                <Input placeholder={'Type car brand'} type={'text'} value={carUpdatedNameValue} onChange={(e) => setCarUpdatedNameValue(e.target.value)} />
                <Input type={'color'} value={carUpdatedColorValue} onChange={(e) => setCarUpdatedColorValue(e.target.value)} />
                <Button text={'update'} size={'medium'} color={'pink'} onClick={handleUpdateCar}/>
            </div>
          </div>
            <Button text={'generate cars'} size={'medium'} color={'green'} />
        </div>
          {allCars.map((car) => (
              <CarItem key={car.id} carColor={car.color} carName={car.name} carId={car.id} onSelectCar={handleSelectCar} />
          ))}
      </>
  );
}

export default GaragePage;