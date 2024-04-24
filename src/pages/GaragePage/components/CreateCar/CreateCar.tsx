import styles from './CreateCar.module.scss';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { useCallback, useState } from 'react';
import { createNewCar } from '../../../../store/slices/CarManageSlice';
import { useDispatch } from 'react-redux';

function CreateCar() {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('');
  const dispatch = useDispatch();

  const handleCreateNewCar = useCallback(() => {
    dispatch(createNewCar({ carNameValue: newName, carColorValue: newColor }));
    setNewName('');
    setNewColor('');
  }, [dispatch, newName, newColor]);

  return (
      <div className={styles.createCarWrapper}>
        <Input placeholder={'Type car brand'} type={'text'} onChange={(e) => setNewName(e.target.value )} value={newName} />
        <Input type={'color'} onChange={(e) => setNewColor(e.target.value )} value={newColor} />
        <Button text={'create'} size={'medium'} color={'pink'} onClick={ handleCreateNewCar } />
      </div>
  );
}

export default CreateCar;