export const sortByIsCheck = (array) => {
  return array.sort((a, b) => (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0);
}

export const sortByDate = (array) => {
  return array.sort((a, b) => (a.creationTime > b.creationTime) ? 1 : a.creationTime < b.creationTime ? -1 : 0);
}