import styles from './PaginationItem.module.scss';

interface PaginationItemProps {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PaginationItem({ page, currentPage, onPageChange }: PaginationItemProps) {
  return (
      <li className={styles.listItem}>
          <div className={`${styles.info} ${page === currentPage ? styles.active : ''}`} onClick={() => onPageChange(page)}>
              {page}
          </div>
      </li>
  );
}

export default PaginationItem;