import styles from "./Paginate.module.css";

export default function Paginate({ currentPage, pages, setPage }) {

  return (
    <>
        <div className={styles.paginateContainer}>
          {pages.length>=4 && currentPage !== 1 ?(
            <button
              onClick={(e) => setPage(e, pages[0])}
              className={styles.paginatePrevLast}
            >
              Prev
            </button>
          ): null}
          {pages.map((page) => (
            <button
              key={page}
              onClick={(e) => {setPage(e, page);}}
              className={styles.paginateButton}
            >
              {page}
            </button>
          ))}
          {pages.length >= 4 && currentPage !== pages[pages.length - 1] ? (
            <button
              onClick={(e) => setPage(e, pages[pages.length - 1])}
              className={styles.paginatePrevLast}
            >
              Last
            </button>
          ): null}
        </div>
    </>
  );
}
