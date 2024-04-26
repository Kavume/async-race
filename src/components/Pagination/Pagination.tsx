import { Button } from '../Button';
import styles from './Pagination.module.scss';

interface PaginationProps {
  prevAction: () => void,
  nextAction: () => void,
  totalPage: number,
  curPage: number,
  totalCars: number
}

function Pagination({ prevAction, nextAction, totalPage, curPage, totalCars }: PaginationProps) {
  const startPage = 1;

  return (
      <div className={styles.paginationWrap}>
          <p className={styles.text}>{totalCars}</p>
          <div className={styles.buttonsWrap}>
            <Button text={'<'} size={'medium'} color={curPage === startPage ? 'disable' : 'blue'} onClick={prevAction} />
              <p className={styles.text}>Page {curPage} / <span className={styles.totalPage}>{totalPage}</span></p>
            <Button text={'>'} size={'medium'} color={curPage === totalPage ? 'disable' : 'blue'} onClick={nextAction} />
          </div>
      </div>
  );
}

export default Pagination;