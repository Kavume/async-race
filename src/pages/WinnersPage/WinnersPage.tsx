import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDataWinCar, getWinners } from '../../store/slices/WinnerSlice';
import { useAppSelector } from '../../store/hooks';
import styles from './WinnersPage.module.scss';
import { WinnerPagination } from './components/WinnerPagination';
import { WinnerTable } from '../../components/WinnerTable';

function WinnersPage() {
  const dispatch = useDispatch();
  const winners = useAppSelector(state => state.winners.winnerItems);
  const curPage = useAppSelector(state => state.winners.currentPage);
  const [carData, setCarData] = useState({});

  const getCarData = async (id) => {
    try {
      const response = await dispatch(getDataWinCar({ id }));
      return response.payload;
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    winners.forEach(async (winner) => {
      const data = await getCarData(winner.id);
      setCarData(prevState => ({
        ...prevState,
        [winner.id]: data,
      }));
    });
  }, [winners]);

  useEffect(() => {
    dispatch(getWinners({ page: curPage }));
  }, [dispatch, curPage]);

  return (
      <div className={styles.winnerPageWrap}>
        <p className={styles.text}>Winners</p>
        <WinnerTable winners={winners} carData={carData} />
        <WinnerPagination />
      </div>
  );
}

export default WinnersPage;