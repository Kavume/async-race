import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './GaragePage.module.scss';
import { useCallback, useEffect, useState } from 'react';

import { RaceIcon } from '../../assets/icons';
import { ResetIcon } from '../../assets/icons';
import { CarItem } from '../../components/CarItem';

import { useDispatch } from 'react-redux';
import { fetchCars, generateNewCars, updateCar } from '../../store/slices/CarManageSlice';
import { useAppSelector } from '../../store/hooks';
import { startEngineFetch, stopEngineFetch } from '../../store/slices/CarEngineSlice';
import { Pagination } from '../../components/Pagination';
import { CreateCar } from './components/CreateCar';
import { UpdateCar } from './components/UpdateCar';

function GaragePage() {
  const [carValues, setCarValues] = useState({
    updatedName: '',
    updatedColor: '',
  });

  const [selectedCarId, setSelectedCarId] = useState(null);

  const dispatch = useDispatch();
  const allCars = useAppSelector(state => state.allCars.carItems);
  const curPage = useAppSelector(state => state.allCars.currentPage);

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
    dispatch(fetchCars(curPage));
  }, [dispatch, curPage]);


  return (
      <>
        <div className={styles.controlPanel}>
          <div className={styles.buttonsWrapper}>
            <IconButton text={'race'} icon={<RaceIcon colorIcon={'var(--green)'} />} color={'green'} onClick={handleRace} />
            <IconButton text={'reset'} icon={<ResetIcon colorIcon={'var(--pink)'} />} color={'pink'} onClick={handleReset} />
          </div>
          <div className={styles.inputsWrapper}>
            <CreateCar />
                <Input placeholder={'Type car brand'} type={'text'} value={carValues.updatedName} onChange={(e) => setCarValues({ ...carValues, updatedName: e.target.value })} />
                <Input type={'color'} value={carValues.updatedColor} onChange={(e) => setCarValues({ ...carValues, updatedColor: e.target.value })} />
                <Button text={'update'} size={'medium'} color={'pink'} onClick={handleUpdateCar}/>
            {/*<UpdateCar carId={selectedCarId} />*/}
          </div>
          <Button text={'generate cars'} size={'medium'} color={'green'} onClick={generateCars}/>
        </div>
        {allCars.map((car) => (
            <CarItem key={car.id} carColor={car.color} carName={car.name} carId={car.id} onSelectCar={handleSelectCar} />
        ))}
        <Pagination />
      </>
  );
}

export default GaragePage;