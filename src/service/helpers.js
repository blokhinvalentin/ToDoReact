export const sortByIsCheck = (array) => {
  console.log(array.sort((a, b) => (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0));
   array.sort((a, b) => (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0);
  
}