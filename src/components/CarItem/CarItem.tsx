import { Button } from '../Button';
import { CarIcon } from '../../assets/icons';
import styles from './CarItem.module.scss';

interface Car {
  id: number;
  name: string;
  color: string;
}

interface CarItemProps {
  carColor: string;
  carName: string;
  carId: number;
  setCars: (cars: Car[]) => void;
}

function CarItem({ carColor, carName, carId, setCars }: CarItemProps) {

  async function deleteCar(id) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'DELETE',
      headers: {},
    });

    const res = await fetch('http://127.0.0.1:3000/garage');
    const carsAll = await res.json();
    setCars(carsAll);
  }

  return (
        <div className={styles.itemWrapper}>
          <div className={styles.actionPanel}>
            <div className={styles.actionControlBtns}>
              <Button text={'select'} size={'small'} color={'blue'} onClick={() => console.log('select button')} />
              <Button text={'remove'} size={'small'} color={'pink'} onClick={() => deleteCar(carId)}/>
            </div>
            <div className={styles.engineControlBtns}>
              <Button text={'a'} size={'small'} color={'yellow'} onClick={() => console.log('start engine')}/>
              <Button text={'b'} size={'small'} color={'disable'} onClick={() => console.log('stop engine')}/>
            </div>
              <div className={styles.icon}>
                  <CarIcon colorIcon={carColor} />
              </div>
          </div>
          <p className={styles.text}>{carName}</p>
        </div>
  );
}

export default CarItem;