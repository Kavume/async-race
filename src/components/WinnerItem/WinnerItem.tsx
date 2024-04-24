import styles from './WinnerItem.module.scss';
import { CarIcon } from '../../assets/icons';

interface WinnerItemProps {
  id: number,
  time: number,
  wins: number
}

function WinnerItem({ id, time, wins }: WinnerItemProps) {
  console.log(id);

  return (
        <table className={styles.table}>
          <thead>
          <tr>
            <th className={styles.headerCell}>№</th>
            <th className={styles.headerCell}>Car</th>
            <th className={styles.headerCell}>name</th>
            <th className={styles.headerCell}>wins</th>
            <th className={styles.headerCell}>best time (seconds)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className={styles.dataCell}>{id}</td>
            <td className={`${styles.dataCell} ${styles.icon}`}>{<CarIcon colorIcon={'white'}/>}</td>
            <td className={`${styles.dataCell} ${styles.name}`}>{}</td>
            <td className={styles.dataCell}>{wins}</td>
            <td className={`${styles.dataCell} ${styles.time}`}>{time}</td>
          </tr>
          </tbody>
        </table>
  );
}

export default WinnerItem;
