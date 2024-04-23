import { nextButtonPagination, prevButtonPagination } from '../../store/slices/CarManageSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../Button';
import styles from './Pagination.module.scss';

function Pagination() {
  const dispatch = useDispatch();
  const totalPage = useAppSelector(state => state.allCars.totalPage);
  const curPage = useAppSelector(state => state.allCars.currentPage);
  const startPage = 1;

  return (
      <div className={styles.paginationWrap}>
        <Button text={'<'} size={'medium'} color={curPage === startPage ? 'disable' : 'blue'} onClick={() => dispatch(prevButtonPagination())} />
          <p className={styles.text}>Page {curPage} / <span className={styles.totalPage}>{totalPage}</span></p>
        <Button text={'>'} size={'medium'} color={curPage === totalPage ? 'disable' : 'blue'} onClick={() => dispatch(nextButtonPagination())} />
      </div>
  );
}

export default Pagination;