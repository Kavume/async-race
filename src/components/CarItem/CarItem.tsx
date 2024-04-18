import { Button } from '../Button';
import { CarIcon } from '../../assets/icons';

interface CarItemProps {
  carColor: string;
  carName: string;
}

function CarItem({ carColor, carName }: CarItemProps) {
  return (
        <div>
          <div>
            <div>
              <Button text={'select'} size={'small'} color={'blue'} onClick={() => console.log('select button')} />
              <Button text={'remove'} size={'small'} color={'pink'} onClick={() => console.log('remove button')}/>
            </div>
            <div>
              <Button text={'a'} size={'small'} color={'yellow'} onClick={() => console.log('start engine')}/>
              <Button text={'b'} size={'small'} color={'disable'} onClick={() => console.log('stop engine')}/>
            </div>
          </div>
          <div>{carName}</div>
          <CarIcon colorIcon={carColor} />
        </div>
  );
}

export default CarItem;