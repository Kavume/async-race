import { IconButton } from '../../components/IconButton';
import IconRace from './../../assets/icons/play.svg';
import IconReset from './../../assets/icons/reset.svg';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './GaragePage.module.scss';

function GaragePage() {
  return (
        <div className={styles.controlPanel}>
          <div className={styles.buttonsWrapper}>
            <IconButton text={'race'} iconSrc={IconRace} altText={'race button icon'} color={'green'} />
            <IconButton text={'reset'} iconSrc={IconReset} altText={'reset button icon'} color={'pink'} />
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
  );
}

export default GaragePage;