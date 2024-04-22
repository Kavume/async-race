import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './GaragePage.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { RaceIcon } from '../../assets/icons';
import { ResetIcon } from '../../assets/icons';
import { CarItem } from '../../components/CarItem';

import { useDispatch } from 'react-redux';
import { createNewCar, fetchCars, generateNewCars, updateCar } from '../../store/slices/CarManageSlice';
import { useAppSelector } from '../../store/hooks';
import { Pagination } from '../../components/Pagination';
import { startEngineFetch, stopEngineFetch } from '../../store/slices/CarEngineSlice';

const startPage = 1;
const limitOnPage = 7;
const indexAdjustment = 1;

function GaragePage() {
  const [carValues, setCarValues] = useState({
    newName: '',
    newColor: '',
    updatedName: '',
    updatedColor: '',
  });

  const [selectedCarId, setSelectedCarId] = useState(null);
  const [currentPage, setCurrentPage] = useState(startPage);

  const dispatch = useDispatch();
  const allCars = useAppSelector(state => state.allCars);

  const handleCreateNewCar = useCallback(() => {
    dispatch(createNewCar({ carNameValue: carValues.newName, carColorValue: carValues.newColor }));
    setCarValues({ ...carValues, newName: '', newColor: '' });
  }, [dispatch, carValues]);

  const handleUpdateCar = useCallback(() => {
    if (selectedCarId) {
      dispatch(updateCar({ carId: selectedCarId, carName: carValues.updatedName, carColor: carValues.updatedColor }));
    }
    setSelectedCarId(null);
    setCarValues({ ...carValues, updatedName: '', updatedColor: '' });
  }, [dispatch, selectedCarId, carValues]);

  const handleSelectCar = useCallback((id: number, name: string, color: string) => {
    setSelectedCarId(id);
    setCarValues({ ...carValues, updatedName: name, updatedColor: color });
  }, [setSelectedCarId, setCarValues, carValues]);

  const generateCars = useCallback(() => {
    dispatch(generateNewCars());
  }, [dispatch]);

  const handleRace = async () => {
    allCars.forEach((car) => {
      dispatch(startEngineFetch(car.id));
    });
  };

  const handleReset = async () => {
    allCars.forEach((car) => {
      dispatch(stopEngineFetch(car.id));
    });
  };

  useEffect(() => {
    dispatch(fetchCars());
    console.log('use');
  }, []);

  const visibleCars = useMemo(() => {
    return allCars.slice((currentPage - indexAdjustment) * limitOnPage, currentPage * limitOnPage);
  }, [allCars, currentPage]);

  return (
      <>
        <div className={styles.controlPanel}>
          <div className={styles.buttonsWrapper}>
            <IconButton text={'race'} icon={<RaceIcon colorIcon={'var(--green)'} />} color={'green'} onClick={handleRace} />
            <IconButton text={'reset'} icon={<ResetIcon colorIcon={'var(--pink)'} />} color={'pink'} onClick={handleReset} />
          </div>
          <div className={styles.inputsWrapper}>
            <div className={styles.createCarWrapper}>
              <Input placeholder={'Type car brand'} type={'text'} onChange={(e) => setCarValues({ ...carValues, newName: e.target.value })} value={carValues.newName} />
              <Input type={'color'} onChange={(e) => setCarValues({ ...carValues, newColor: e.target.value })} value={carValues.newColor} />
              <Button text={'create'} size={'medium'} color={'pink'} onClick={ handleCreateNewCar } />
            </div>
            <div className={styles.updateCarWrapper}>
                <Input placeholder={'Type car brand'} type={'text'} value={carValues.updatedName} onChange={(e) => setCarValues({ ...carValues, updatedName: e.target.value })} />
                <Input type={'color'} value={carValues.updatedColor} onChange={(e) => setCarValues({ ...carValues, updatedColor: e.target.value })} />
                <Button text={'update'} size={'medium'} color={'pink'} onClick={handleUpdateCar}/>
            </div>
          </div>
          <Button text={'generate cars'} size={'medium'} color={'green'} onClick={generateCars}/>
        </div>
        {visibleCars.map((car) => (
            <CarItem key={car.id} carColor={car.color} carName={car.name} carId={car.id} onSelectCar={handleSelectCar} />
        ))}
        <Pagination
            currentPage={currentPage}
            total={allCars.length}
            limit={limitOnPage}
            onPageChange={(page: number) => setCurrentPage(page)}
        />
      </>
  );
}

export default GaragePage;