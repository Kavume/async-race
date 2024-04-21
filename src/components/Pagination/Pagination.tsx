import { PaginationItem } from './PaginationItem';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const range = (start: number, end: number) => {
  return [...Array(end).keys()].map((el) => el + start);
};

function Pagination({ currentPage, onPageChange, total, limit }: PaginationProps) {
  const pagesCount = Math.ceil(total / limit);
  const startValue = 1;
  const pages = range(startValue, pagesCount);

  return (
      <ul className={styles.pagination}>
        {pages.map((page) => (
            <PaginationItem
                page={page}
                key={page}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        ))
        }
      </ul>
  );
}

export default Pagination;