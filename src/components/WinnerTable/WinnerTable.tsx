import styles from './WinnerTable.module.scss';
import { WinnerItem } from './WinnerItem';
import { useState } from 'react';
import { sortWinners } from '../../store/slices/WinnerSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';

interface CarData {
  [id: number]: {
    color: string;
    name: string;
  };
}

interface WinnerTableProps {
  winners: { id: number, time: number, wins: number }[],
  carData: CarData,
}

function WinnerTable({ winners, carData }: WinnerTableProps) {
  const [winsSortOrder, setWinsSortOrder] = useState('ASC');
  const [timeSortOrder, setTimeSortOrder] = useState('ASC');
  const [idSortOrder, setIdSortOrder] = useState('ASC');
  const dispatch = useDispatch();
  const curPage = useAppSelector(state => state.winners.currentPage);

  const handleSortByWins = () => {
    setWinsSortOrder(winsSortOrder === 'ASC' ? 'DESC' : 'ASC');
    dispatch(sortWinners({ page: curPage, sortCriteria: 'wins', sortOrder: winsSortOrder }));
  };
  const handleSortByTime = () => {
    setTimeSortOrder(timeSortOrder === 'ASC' ? 'DESC' : 'ASC');
    dispatch(sortWinners({ page: curPage, sortCriteria: 'time', sortOrder: timeSortOrder }));
  };
  const handleSortById = () => {
    setIdSortOrder(idSortOrder === 'ASC' ? 'DESC' : 'ASC');
    dispatch(sortWinners({ page: curPage, sortCriteria: 'id', sortOrder: idSortOrder }));
  };
  return (
      <table className={styles.table}>
        <thead>
            <tr>
              <th className={`${styles.headerCell} ${styles.toggle}`} onClick={handleSortById}>№</th>
              <th className={styles.headerCell}>Car</th>
              <th className={styles.headerCell}>name</th>
              <th className={`${styles.headerCell} ${styles.toggle}`} onClick={handleSortByWins}>wins</th>
              <th className={`${styles.headerCell} ${styles.toggle}`} onClick={handleSortByTime}>best time (seconds)</th>
              <th className={styles.headerCell}></th>
            </tr>
        </thead>
        <tbody>
        {winners.map((winner) => (
          <WinnerItem key={winner.id} id={winner.id} time={winner.time} wins={winner.wins} color={carData[winner.id]?.color} name={carData[winner.id]?.name} />
        ))}
        </tbody>
      </table>
  );
}

export default WinnerTable;