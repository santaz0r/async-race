import styles from './Pagination.module.scss';

type TProps = {
  pageSize: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  disabled: boolean;
};

function Pagination({ pageSize, itemsCount, onPageChange, currentPage, disabled }: TProps) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = new Array(pageCount).fill(1).map((i: number, index) => {
    const el = i;
    return el + index;
  });

  return (
    <nav>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li key={`page_${page}`}>
            <button
              disabled={disabled}
              type="button"
              className={`${styles.pagination_btn} ${page === currentPage ? styles.bgBlue : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
