export class CheckModel {
  constructor(
    id = 0,
    all_id = 0,
    idVisitor = 0,
    nameVisitor = "",
    idBook = 0,
    titleBook = "",
    dateTook = "",
    dateReturned = ""
  ) {
    this.id = id;
    this.all_id = all_id;
    this.idVisitor = idVisitor;
    this.nameVisitor = nameVisitor;
    this.idBook = idBook;
    this.titleBook = titleBook;
    this.dateTook = dateTook;
    this.dateReturned = dateReturned;
  }
}
