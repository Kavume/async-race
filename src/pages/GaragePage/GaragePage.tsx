import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './GaragePage.module.scss';
import { useEffect, useState } from 'react';

import { RaceIcon } from '../../assets/icons';
import { ResetIcon } from '../../assets/icons';
import { CarItem } from '../../components/CarItem';

import createNewCar from './createNewCar';


function GaragePage() {
  const [cars, setCars] = useState([]);
  const [carNameValue, setCarNameValue] = useState('');
  const [carColorValue, setCarColorValue] = useState('');

  const handleCreateNewCar = async () => {
    await createNewCar(carNameValue, carColorValue, setCars, setCarNameValue, setCarColorValue);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://127.0.0.1:3000/garage');
      const carsAll = await res.json();
      setCars(carsAll);
    }
    fetchData();
  }, []);

  return (
      <>
        <div className={styles.controlPanel}>
          <div className={styles.buttonsWrapper}>
            <IconButton text={'race'} icon={<RaceIcon colorIcon={'var(--green)'} />} color={'green'} />
            <IconButton text={'reset'} icon={<ResetIcon colorIcon={'var(--pink)'} />} color={'pink'} />
          </div>
          <div className={styles.createCarWrapper}>
            <Input placeholder={'Type car brand'} type={'text'} onChange={(e) => setCarNameValue(e.target.value)} />
            <Input type={'color'} onChange={(e) => setCarColorValue(e.target.value)} />
            <Button text={'create'} size={'medium'} color={'pink'} onClick={handleCreateNewCar} />
          </div>
            <div className={styles.updateCarWrapper}>
                <Input placeholder={'Type car brand'} type={'text'} />
                <Input type={'color'} />
                <Button text={'update'} size={'medium'} color={'pink'} />
            </div>
            <Button text={'generate cars'} size={'medium'} color={'green'} />
        </div>
          {cars.map((car) => (
              <CarItem key={car.id} carColor={car.color} carName={car.name} />
          ))}
      </>
  );
}

export default GaragePage;