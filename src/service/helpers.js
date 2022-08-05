export const sortByIsCheck = (array) => {
  return array.sort((a, b) => (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0);
}

export const sortByDate = (array) => {
  return array.sort((a, b) => (a.creationTime > b.creationTime) ? 1 : a.creationTime < b.creationTime ? -1 : 0);
}

export const sortByDateAndIsCheck = (array) => {
  return array.sort((a, b) => {
    if (a.creationTime > b.creationTime && a.isCheck - b.isCheck === -1) return -1;
    if (a.creationTime > b.creationTime && a.isCheck - b.isCheck === 1) return 1;
    if (a.creationTime > b.creationTime && a.isCheck - b.isCheck === 0) return -1;
    if (a.creationTime < b.creationTime && a.isCheck - b.isCheck === -1) return -1;
    if (a.creationTime < b.creationTime && a.isCheck - b.isCheck === 1) return 0;
    if (a.creationTime < b.creationTime && a.isCheck - b.isCheck === 0) return 1;
  })
}