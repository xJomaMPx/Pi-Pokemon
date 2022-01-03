import styles from "./Paginate.module.css";

export default function Paginate({ currentPage, pages, setPage }) {
  return (
    <>
      {pages.length > 1 ? (
        <div className={styles.paginateContainer}>
          {currentPage !== 1 && (
            <button
              onClick={(e) => setPage(e, pages[0])}
              className={styles.paginatePrevLast}
            >
              First
            </button>
          )}
          {pages.map((page) => (
            <button
              key={page}
              onClick={(e) => {
                setPage(e, page);
              }}
              className={styles.paginateButton}
            >
              {page}
            </button>
          ))}
          {currentPage !== pages[pages.length - 1] && (
            <button
              onClick={(e) => setPage(e, pages[pages.length - 1])}
              className={styles.paginatePrevLast}
            >
              Last
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
