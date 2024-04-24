import styles from './WinnerItem.module.scss';
import { CarIcon } from '../../../assets/icons';

interface WinnerItemProps {
  id: number,
  time: number,
  wins: number,
  name: string,
  color: string
}

function WinnerItem({ id, time, wins, name, color }: WinnerItemProps) {
  return (
          <tr>
            <td className={styles.dataCell}>{id}</td>
            <td className={`${styles.dataCell} ${styles.icon}`}>{<CarIcon colorIcon={color}/>}</td>
            <td className={`${styles.dataCell} ${styles.name}`}>{name}</td>
            <td className={styles.dataCell}>{wins}</td>
            <td className={`${styles.dataCell} ${styles.time}`}>{time}</td>
          </tr>
  );
}

export default WinnerItem;
