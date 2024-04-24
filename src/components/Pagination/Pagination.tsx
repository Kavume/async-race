import { Button } from '../Button';
import styles from './Pagination.module.scss';

interface PaginationProps {
  prevAction: () => void,
  nextAction: () => void,
  totalPage: number,
  curPage: number
}

function Pagination({ prevAction, nextAction, totalPage, curPage }: PaginationProps) {
  const startPage = 1;

  return (
      <div className={styles.paginationWrap}>
        <Button text={'<'} size={'medium'} color={curPage === startPage ? 'disable' : 'blue'} onClick={prevAction} />
          <p className={styles.text}>Page {curPage} / <span className={styles.totalPage}>{totalPage}</span></p>
        <Button text={'>'} size={'medium'} color={curPage === totalPage ? 'disable' : 'blue'} onClick={nextAction} />
      </div>
  );
}

export default Pagination;