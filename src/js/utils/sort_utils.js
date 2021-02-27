const sortListBook = (_key, _array) => {
  let array = [..._array];
  let key = Number(_key);
  switch (key) {
    case 0:
      array.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
      });
      break;
    case 1:
      array.sort(function (a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      break;
    case 2:
      array.sort(function (a, b) {
        if (a.nameAuthor < b.nameAuthor) return -1;
        if (a.nameAuthor > b.nameAuthor) return 1;
        return 0;
      });
      break;
    case 3:
      array.sort(function (a, b) {
        return parseFloat(a.year) - parseFloat(b.year);
      });
      break;
    case 4:
      array.sort(function (a, b) {
        if (a.pubHouse < b.pubHouse) return -1;
        if (a.pubHouse > b.pubHouse) return 1;
        return 0;
      });
      break;
    case 5:
      array.sort(function (a, b) {
        return parseFloat(a.pages) - parseFloat(b.pages);
      });
      break;
    case 6:
      array.sort(function (a, b) {
        return parseFloat(a.amount) - parseFloat(b.amount);
      });
      break;
  }
  return array;
};
//функция сортировки по ID или Name
const sortListVisitor = (key, filterArray) => {
  switch (key) {
    case 0:
      filterArray.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
      });
      break;
    case 1:
      filterArray.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      break;
  }
  return filterArray;
};

const sortListChecks = (key, filterArray) => {
  switch (key) {
    case 0:
      filterArray.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
      });
      break;
    case 1:
      filterArray.sort(function (a, b) {
        if (a.nameVisitor < b.nameVisitor) return -1;
        if (a.nameVisitor > b.nameVisitor) return 1;
        return 0;
      });
      break;
    case 2:
      filterArray.sort(function (a, b) {
        if (a.titleBook < b.titleBook) return -1;
        if (a.titleBook > b.titleBook) return 1;
        return 0;
      });
      break;
  }
  return filterArray;
};

export const sortUtils = {
  sortListBook,
  sortListVisitor,
  sortListChecks,
};
