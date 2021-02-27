export class BookModel {
  constructor(
    all_id = 0,
    id = 0,
    title = "",
    nameAuthor = "",
    year = 0,
    pubHouse = "",
    pages = 0,
    amount = 0,
    image = ""
  ) {
    this.all_id = all_id;
    this.id = id;
    this.title = title;
    this.nameAuthor = nameAuthor;
    this.year = year;
    this.pubHouse = pubHouse;
    this.pages = pages;
    this.amount = amount;
    this.image = image;
  }
}
