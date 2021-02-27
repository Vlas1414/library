const convertDate = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const dateUtils = {
  convertDate,
};
