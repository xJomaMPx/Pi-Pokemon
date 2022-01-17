const pagesGenerator = (currentPage, getNumberOfPages) => {
  let pages = [1],
    acc = 2;

    while (acc <= (getNumberOfPages + 1)) {
      pages = [...pages, acc];
      acc++;
    }
  
  return pages;
};

export { pagesGenerator };

