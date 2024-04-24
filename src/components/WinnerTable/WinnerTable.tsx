import styles from './WinnerTable.module.scss';
import { WinnerItem } from './WinnerItem';
import { useState } from 'react';

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
  const [sortCriteria, setSortCriteria] = useState<'time' | 'wins'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleSortCriteria = (criteria: 'time' | 'wins') => {
    if (sortCriteria === criteria) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const sortedWinners = [...winners].sort((a, b) => {
    if (sortCriteria === 'time') return sortOrder === 'asc' ? a.time - b.time : b.time - a.time;
    else return sortOrder === 'asc' ? a.wins - b.wins : b.wins - a.wins;
  });

  return (
      <table className={styles.table}>
        <thead>
            <tr>
              <th className={styles.headerCell}>№</th>
              <th className={styles.headerCell}>Car</th>
              <th className={styles.headerCell}>name</th>
              <th className={`${styles.headerCell} ${styles.toggle}`} onClick={() => toggleSortCriteria('wins')}>
                  wins {sortCriteria === 'wins' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className={`${styles.headerCell} ${styles.toggle}`} onClick={() => toggleSortCriteria('time')}>
                  best time (seconds) {sortCriteria === 'time' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
        </thead>
        <tbody>
        {sortedWinners.map((winner) => (
          <WinnerItem key={winner.id} id={winner.id} time={winner.time} wins={winner.wins} color={carData[winner.id]?.color} name={carData[winner.id]?.name} />
        ))}
        </tbody>
      </table>
  );
}

export default WinnerTable;