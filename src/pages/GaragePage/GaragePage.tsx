import { IconButton } from '../../components/IconButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './GaragePage.module.scss';
import { useEffect, useState } from 'react';

import { CarIcon } from '../../assets/icons';
import { RaceIcon } from '../../assets/icons';
import { ResetIcon } from '../../assets/icons';


function GaragePage() {
  const [cars, setCars] = useState([]);

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
            <IconButton text={'race'} icon={<RaceIcon color={'#bcff8c'} />} color={'green'} />
            <IconButton text={'reset'} icon={<ResetIcon color={'#e88fff'} />} color={'pink'} />
          </div>
          <div className={styles.createCarWrapper}>
            <Input placeholder={'Type car brand'} type={'text'} />
            <Input type={'color'} />
            <Button text={'create'} size={'medium'} color={'pink'} />
          </div>
            <div className={styles.updateCarWrapper}>
                <Input placeholder={'Type car brand'} type={'text'} />
                <Input type={'color'} />
                <Button text={'update'} size={'medium'} color={'pink'} />
            </div>
            <Button text={'generate cars'} size={'medium'} color={'green'} />
        </div>
          {cars.map((car) => (
              <div key={car.id}>
                  <div>
                      <div>
                        <Button text={'select'} size={'small'} color={'blue'} onClick={() => console.log('select button')}/>
                        <Button text={'remove'} size={'small'} color={'pink'} onClick={() => console.log('remove button')}/>
                      </div>
                      <div>
                          <Button text={'a'} size={'small'} color={'yellow'} onClick={() => console.log('start engine')}/>
                          <Button text={'b'} size={'small'} color={'disable'} onClick={() => console.log('stop engine')}/>
                      </div>
                  </div>
                  <div>{car.name}</div>
                  <CarIcon color={car.color} />
              </div>
          ))}
      </>
  );
}

export default GaragePage;