import { Button } from '../Button';
import { CarIcon } from '../../assets/icons';
import styles from './CarItem.module.scss';

interface CarItemProps {
  carColor: string;
  carName: string;
}

function CarItem({ carColor, carName }: CarItemProps) {
  return (
        <div className={styles.itemWrapper}>
          <div className={styles.actionPanel}>
            <div className={styles.actionControlBtns}>
              <Button text={'select'} size={'small'} color={'blue'} onClick={() => console.log('select button')} />
              <Button text={'remove'} size={'small'} color={'pink'} onClick={() => console.log('remove button')}/>
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