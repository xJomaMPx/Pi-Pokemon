// const pagesGenerator = (currentPage, getNumberOfPages) => {
//   let pages = [],
//     acc = 1;

//   if (currentPage === 1) {
//     while (acc < getNumberOfPages) {
//       pages = [...pages, acc];
//       acc++;
//     }
//   } else {
//     while (acc <= getNumberOfPages) {
//       pages = [...pages, acc];
//       acc++;
//     }
//   }
//   return pages;
// };

// export { pagesGenerator };


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

