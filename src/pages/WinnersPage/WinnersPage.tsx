import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWinners } from '../../store/slices/WinnerSlice';
import { useAppSelector } from '../../store/hooks';
import { WinnerItem } from '../../components/WinnerItem';
import styles from './WinnersPage.module.scss';
import { WinnerPagination } from './components/WinnerPagination';

function WinnersPage() {
  const dispatch = useDispatch();
  const winners = useAppSelector(state => state.winners.winnerItems);
  const curPage = useAppSelector(state => state.winners.currentPage);

  console.log(winners);

  useEffect(() => {
    dispatch(getWinners(curPage));
  }, [dispatch, curPage]);

  return (
      <>
          {winners.map((winner) => (
              <WinnerItem key={winner.id} id={winner.id} time={winner.time} wins={winner.wins} />
          ))}
        <WinnerPagination />
      </>
  );
}

export default WinnersPage;