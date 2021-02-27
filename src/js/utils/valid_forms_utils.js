//функция проверки на валидность
const isValid = (copyVisit, visitors, isEdit, searchEditElement) => {
  //ищем есть ли совпадения
  let searchNewElementName = visitors.filter((a) => a.name == copyVisit.name);
  let searchNewElementPhone = visitors.filter(
    (a) => a.phone == copyVisit.phone
  );
  //проверяем валидность данных
  let regexpName = "[A-ZА-ЯЁ][a-zа-яё]* [A-ZА-ЯЁ][a-zа-яё]*$";
  let regexpPhone = "([0-9]* ?-?[0-9]*)*";
  let matchAllName = Array.from(copyVisit.name.matchAll(regexpName))[0];
  let matchAllPhone = Array.from(copyVisit.phone.matchAll(regexpPhone));
  //убрать красные замечания
  $("#VisIsHavePhone").css("opacity", "0");
  $("#VisIsHaveName").css("opacity", "0");
  let isCoolName = true;
  let isCoolPhone = true;
  if (isEdit) {
    if (searchEditElement.name == copyVisit.name) {
      isCoolName = true;
    } else {
      if (searchNewElementName.length >= 1) isCoolName = false;
    }

    if (searchEditElement.phone == copyVisit.phone) {
      isCoolPhone = true;
    } else {
      if (searchNewElementPhone.length >= 1) isCoolPhone = false;
    }
  }
  if ((!isCoolName || !isCoolPhone) && (isCoolName || isCoolPhone))
    isEdit = false;
  //сравнивание полученных данных и сохранение
  if (
    matchAllName != undefined &&
    matchAllPhone.length <= 2 &&
    copyVisit.name != "" &&
    copyVisit.phone != ""
  ) {
    if (searchNewElementName.length == 0 || isCoolName) {
      if (searchNewElementPhone.length == 0 || isCoolPhone) {
        return true;
      } else {
        $("#VisIsHavePhone").css("opacity", "1");
      }
    } else {
      $("#VisIsHaveName").css("opacity", "1");
    }
  }
  return false;
};

export const validFormsUtils = {
  isValid,
};
