/// models
import { BookModel } from "./models/book_model";
import { CheckModel } from "./models/check_model";
import { VisitorModel } from "./models/visitor_model";
/// utils
import { dateUtils } from "./utils/date_utils";

export const mockBooks = [
  new BookModel(
    0,
    1,
    "Белый Клык",
    "Джек Лондон",
    2005,
    "Дрофа-Плюс",
    384,
    57,
    "https://www.moscowbooks.ru/image/book/675/orig/i675418.jpg"
  ),
  new BookModel(
    1,
    2,
    "Маленький принц",
    "Антуан де Сент-Экзюпери",
    2007,
    "Эксмо",
    104,
    3,
    "https://img-gorod.ru/upload/iblock/b45/b4511b30b69ef1bd20e781e4f86adac5.jpg"
  ),
  new BookModel(
    2,
    3,
    "Богатый папа, бедный папа",
    "Роберт Т. Кийосаки",
    1997,
    "Попурри",
    224,
    10,
    "https://images-na.ssl-images-amazon.com/images/I/41PLBorWaOL.jpg"
  ),
  new BookModel(
    3,
    4,
    "Чистый код",
    "Роберт Мартин",
    2008,
    "Прентис Холл",
    464,
    0,
    "https://media.proglib.io/wp-uploads/-000//1/08716001.cover_max1500.jpg"
  ),
  new BookModel(
    4,
    5,
    "Мохаммед Али. Неизданное",
    "Али Мохаммед",
    2016,
    "Эксмо",
    3000,
    101,
    "https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/1/0/101_26.jpg"
  ),
  new BookModel(
    5,
    6,
    "Война и мир",
    "Лев Толстой",
    1865,
    "Русский вестник",
    1225,
    12,
    "https://st.kp.yandex.net/images/film_iphone/iphone360_893150.jpg"
  ),
];

export const mockVisitors = [
  new VisitorModel(1, "Colette Kelley", "012 435 45 67"),
  new VisitorModel(2, "Ruby Lennon", "012 647 34 24"),
  new VisitorModel(3, "Leanne Gibbons", "012 879 78 45"),
  new VisitorModel(4, "Rumaisa Peel", "012 456 64 67"),
  new VisitorModel(5, "Gene Medrano", "012 245 47 89"),
  new VisitorModel(6, "Sheridan Tucker", "012 345 85 90"),
];

export const mockChecks = [
  new CheckModel(
    1,
    0,
    1,
    "",
    0,
    "",
    dateUtils.convertDate(new Date(2015, 10, 30)),
    dateUtils.convertDate(new Date(2015, 11, 24))
  ),
  new CheckModel(
    2,
    1,
    1,
    "",
    3,
    "",
    dateUtils.convertDate(new Date(2016, 0, 19)),
    dateUtils.convertDate(new Date(2016, 2, 8))
  ),
  new CheckModel(
    3,
    2,
    2,
    "",
    4,
    "",
    dateUtils.convertDate(new Date(2017, 5, 4)),
    dateUtils.convertDate(new Date(2017, 8, 24))
  ),
  new CheckModel(
    4,
    3,
    2,
    "",
    0,
    "",
    dateUtils.convertDate(new Date(2018, 6, 12)),
    dateUtils.convertDate(new Date(2018, 7, 13))
  ),
  new CheckModel(
    5,
    4,
    1,
    "",
    1,
    "",
    dateUtils.convertDate(new Date(2019, 1, 13)),
    ""
  ),
  new CheckModel(
    6,
    5,
    5,
    "",
    3,
    "",
    dateUtils.convertDate(new Date(2019, 2, 8)),
    dateUtils.convertDate(new Date(2019, 3, 17))
  ),
  new CheckModel(
    7,
    6,
    5,
    "",
    2,
    "",
    dateUtils.convertDate(new Date(2019, 2, 15)),
    ""
  ),
  new CheckModel(
    8,
    7,
    6,
    "",
    0,
    "",
    dateUtils.convertDate(new Date(2019, 3, 27)),
    dateUtils.convertDate(new Date(2019, 5, 9))
  ),
  new CheckModel(
    9,
    8,
    4,
    "",
    4,
    "",
    dateUtils.convertDate(new Date(2019, 4, 5)),
    ""
  ),
  new CheckModel(
    10,
    9,
    3,
    "",
    3,
    "",
    dateUtils.convertDate(new Date(2019, 4, 9)),
    ""
  ),
];
