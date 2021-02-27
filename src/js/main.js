import "../css/style.css";
/// models
import { BookModel } from "./models/book_model";
import { CheckModel } from "./models/check_model";
import {
  StatisticsBookModel,
  StatisticsVisitorModel,
} from "./models/statistics_model";
import { VisitorModel } from "./models/visitor_model";
///mocks
import { mockBooks, mockVisitors, mockChecks } from "./mocks";
/// utils
import { dateUtils } from "./utils/date_utils";
import { sortUtils } from "./utils/sort_utils";
import { validFormsUtils } from "./utils/valid_forms_utils";

function restart() {
  valBooks = JSON.stringify(VueBook.books);
  localStorage.setItem(keyBooks, valBooks);
  VueBook.filterArray = [...VueBook.books];

  valVisitors = JSON.stringify(VueVisitor.visitors);
  localStorage.setItem(keyVisitors, valVisitors);
  VueVisitor.filterArray = [...VueVisitor.visitors];

  valChecks = JSON.stringify(VueCheck.checks);
  localStorage.setItem(keyChecks, valChecks);
  VueCheck.copyCheck();

  VueStat.show();
}
$("body, html").css("height", $(document).outerHeight(true) + 100);
//скрыть\показать задний фон
let IsClosed = true;
$("#backgraund-hide").click(function () {
  if (IsClosed) {
    VueBook.editModeClose();
    VueVisitor.HideVisitorForm();
    VueCheck.HideCheckForm();
  }
});
function hideBackgraund() {
  $("body").css("margin", "0px");
  $("body").css("height", "auto");
  $("body").css("overflow", "auto");
  IsClosed = false;
  $("#backgraund-hide").css("opacity", "0");

  setTimeout(() => $("#backgraund-hide").css("display", "none"), 1000);
}
$("#backgraund-hide").css("height", $(document).outerHeight(true));
function showBackgraund() {
  IsClosed = true;
  $("body").css("margin", "0px");
  $("body").css("overflow", "hidden");
  $("#backgraund-hide").css("height", $(document).outerHeight(true));
  $("#backgraund-hide").css("display", "inherit");

  setTimeout(() => $("#backgraund-hide").css("opacity", "1"), 1);
}
//если не создано, создаём ключ в локальном хранилище
let keyBooks = "Books";
let valBooks = localStorage.getItem(keyBooks);
if (valBooks == null) {
  valBooks = JSON.stringify(mockBooks);
  localStorage.setItem(keyBooks, valBooks);
}
let keyVisitors = "Visitors";
let valVisitors = localStorage.getItem(keyVisitors);
if (valVisitors == null) {
  valVisitors = JSON.stringify(mockVisitors);
  localStorage.setItem(keyVisitors, valVisitors);
}

let keyChecks = "Checks";
let valChecks = localStorage.getItem(keyChecks);

if (valChecks == null) {
  valChecks = JSON.stringify(mockChecks);
  localStorage.setItem(keyChecks, valChecks);
}
let keyLastAllIdBook = "LastAllIdBook";
let valLastAllIdBook = localStorage.getItem(keyLastAllIdBook);
if (valLastAllIdBook == null) {
  valLastAllIdBook = 5;
  localStorage.setItem(keyLastAllIdBook, valLastAllIdBook);
}
let keyLastPage = "LastPageID";
let valLastPageID = localStorage.getItem(keyLastPage);
if (valLastPageID == null) {
  valLastPageID = 0;
  localStorage.setItem("LastPageID", valLastPageID);
}
//вернуть последнюю вкладку после перезагрузки страницы
let ArrPages = ["#book-box", "#visitor-box", "#check-box", "#stat-box"];
let LastPage = ArrPages[valLastPageID];
$(".hide-func").css("transition", "all 0s");
$(".hide-func").css("left", "-100%");
$(".hide-func").css("opacity", 1);
$(LastPage).css("left", "0%");
$(LastPage).css("opacity", 1);
function setTimeoutForFirstEnter(params) {
  $(".hide-func").css("transition", "all 0.5s");
}
setTimeout(setTimeoutForFirstEnter, 1);
//переход по страницам
function show(NextPageID) {
  if (NextPageID != valLastPageID) {
    $(".hide-func").css("transition", "all 0s");
    let isHideToLeft = true;
    $(ArrPages[NextPageID]).css("display", "inherit");
    if (NextPageID > valLastPageID) {
      $(ArrPages[NextPageID]).css("left", "100%");
      $(ArrPages[NextPageID]).css("opacity", 0);
      isHideToLeft = true;
    } else {
      $(ArrPages[NextPageID]).css("left", "-100%");
      $(ArrPages[NextPageID]).css("opacity", 0);
      isHideToLeft = false;
    }
    function TimeoutForChangePage() {
      $(".hide-func").css("transition", "all 0.5s");
      if (isHideToLeft) {
        $(ArrPages[valLastPageID]).css("left", "-100%");
      } else {
        $(ArrPages[valLastPageID]).css("left", "100%");
      }
      $(ArrPages[valLastPageID]).css("opacity", 0);
      $(ArrPages[NextPageID]).css("left", "0%");
      $(ArrPages[NextPageID]).css("opacity", 1);
    }
    setTimeout(TimeoutForChangePage, 1);

    function closeElement(params) {
      $(LastPage).css("display", "none");
      LastPage = ArrPages[NextPageID];
      valLastPageID = NextPageID;
      localStorage.setItem("LastPageID", valLastPageID);
    }
    setTimeout(closeElement, 500);
  }
}
$("#Books-Menu-But").click(function () {
  show(0);
});
$("#Visitors-Menu-But").click(function () {
  show(1);
});
$("#Check-Menu-But").click(function () {
  show(2);
});
$("#Stat-Menu-But").click(function () {
  show(3);
});
//раздел Книги
let VueBook = new Vue({
  el: "#books-container",
  data: {
    books: JSON.parse(valBooks),
    filterArray: [],
    filterText: "",
    selectedSortList: 0,
    selectedbook: new BookModel(),
    isNewBook: false,
  },
  methods: {
    filter: function () {
      let self = this;
      let res = this.books.filter(function (item) {
        return (
          item.title.toLowerCase().indexOf(self.filterText.toLowerCase()) !==
            -1 ||
          item.nameAuthor
            .toLowerCase()
            .indexOf(self.filterText.toLowerCase()) !== -1 ||
          item.pubHouse.toLowerCase().indexOf(self.filterText.toLowerCase()) !==
            -1 ||
          item.amount
            .toString()
            .toLowerCase()
            .indexOf(self.filterText.toLowerCase()) !== -1
        );
      });
      this.filterArray = res;
      sortUtils.sortListBook(this.selectedSortList, this.filterArray);
    },
    sortbook: function (event) {
      this.filterArray = sortUtils.sortListBook(
        event.target.value,
        this.filterArray
      );
      this.selectedSortList = event.target.value;
    },
    editMode(ElementBook) {
      $("#" + ElementBook.id).css("z-index", 20);
      let top = $("#" + ElementBook.id).offset().top - 100;
      $("body, html").animate({ scrollTop: top }, 500);
      this.selectedbook.all_id = ElementBook.all_id;
      this.selectedbook.id = ElementBook.id;
      this.selectedbook.title = ElementBook.title;
      this.selectedbook.nameAuthor = ElementBook.nameAuthor;
      this.selectedbook.year = ElementBook.year;
      this.selectedbook.pubHouse = ElementBook.pubHouse;
      this.selectedbook.pages = ElementBook.pages;
      this.selectedbook.amount = ElementBook.amount;
      this.selectedbook.image = ElementBook.image;
      $("#small-library").css("padding-right", "20px");
      $("#" + this.selectedbook.id + " button[name=btnBookEdit]").css(
        "display",
        "none"
      );
      $("#" + this.selectedbook.id + " button[name=btnBookSave]").css(
        "display",
        "inline-block"
      );
      if (!this.isNewBook) {
        $("#" + this.selectedbook.id + " button[name=btnBookDelete]").css(
          "display",
          "inline-block"
        );
      }
      $("#" + this.selectedbook.id + " div[name=cardlook]").css("top", "800px");
      $("#" + this.selectedbook.id + " div[name=cardedit]").css("top", "290px");
      $("#" + this.selectedbook.id + " img").css("height", "300px");
      showBackgraund();
    },
    editModeDelete(ElementBook) {
      this.books.splice(ElementBook.id - 1, 1);
      for (let i = ElementBook.id - 1; i < this.books.length; i++) {
        this.books[i].id--;
      }
      VueCheck.deletecheck(ElementBook.all_id);
      restart();
      this.filter();
      sortUtils.sortListBook(this.selectedSortList, this.filterArray);
      this.editModeClose();
      VueCheck.restart();
    },
    editModeSave(ElementBook) {
      if (
        this.selectedbook.image != "" &&
        this.selectedbook.title != "" &&
        this.selectedbook.nameAuthor != "" &&
        this.selectedbook.year.toString() != "" &&
        this.selectedbook.pubHouse != "" &&
        this.selectedbook.pages.toString() != "" &&
        this.selectedbook.amount.toString() != "" &&
        (this.selectedbook.amount.toString()[0] != "0" ||
          this.selectedbook.amount.toString().length == 1) &&
        (this.selectedbook.pages.toString()[0] != "0" ||
          this.selectedbook.pages.toString().length == 1) &&
        (this.selectedbook.year.toString()[0] != "0" ||
          this.selectedbook.year.toString().length == 1)
      ) {
        if (this.isNewBook) this.books.push(ElementBook);
        let newElement = this.books.filter(
          (a) => a.all_id == this.selectedbook.all_id
        )[0];
        newElement.title = this.selectedbook.title;
        newElement.nameAuthor = this.selectedbook.nameAuthor;
        newElement.year = this.selectedbook.year;
        newElement.pubHouse = this.selectedbook.pubHouse;
        newElement.pages = this.selectedbook.pages;
        newElement.amount = this.selectedbook.amount;
        newElement.image = this.selectedbook.image;
        restart();

        this.editModeClose();
        this.filter();
        sortUtils.sortListBook(this.selectedSortList, this.filterArray);
        for (let i = 1; i <= 7; i++) {
          $(".card-edit span[name=" + i + "]").css("display", "none");
        }
        VueCheck.restart();
      }
      if (this.selectedbook.image == "")
        $(".card-edit span[name=1]").css("display", "inline-block");
      if (this.selectedbook.title == "")
        $(".card-edit span[name=2]").css("display", "inline-block");
      if (this.selectedbook.nameAuthor == "")
        $(".card-edit span[name=3]").css("display", "inline-block");
      if (
        (this.selectedbook.year.toString()[0] == 0 &&
          this.selectedbook.year.toString().length != 1) ||
        this.selectedbook.year == ""
      )
        $(".card-edit span[name=4]").css("display", "inline-block");
      if (this.selectedbook.pubHouse == "")
        $(".card-edit span[name=5]").css("display", "inline-block");
      if (
        (this.selectedbook.pages.toString()[0] == 0 &&
          this.selectedbook.pages.toString().length != 1) ||
        this.selectedbook.pages == ""
      )
        $(".card-edit span[name=6]").css("display", "inline-block");
      if (
        (this.selectedbook.amount.toString()[0] == "0" &&
          this.selectedbook.amount.toString().length != 1) ||
        this.selectedbook.amount.toString() == ""
      )
        $(".card-edit span[name=7]").css("display", "inline-block");
    },
    editModeClose() {
      for (let i = 1; i <= 7; i++) {
        $(".card-edit span[name=" + i + "]").css("display", "none");
      }
      if (this.isNewBook) {
        this.filterArray = [...this.books];
        this.isNewBook = false;
      }
      $("#small-library").css("padding-right", "0px");
      $("#" + this.selectedbook.id + " button[name=btnBookEdit]").css(
        "display",
        "inline-block"
      );
      $("#" + this.selectedbook.id + " button[name=btnBookSave]").css(
        "display",
        "none"
      );
      $("#" + this.selectedbook.id + " button[name=btnBookDelete]").css(
        "display",
        "none"
      );
      $("#" + this.selectedbook.id + " img").css("height", "500px");
      $("#" + this.selectedbook.id + " div[name=cardedit]").css(
        "top",
        "-500px"
      );
      $("#" + this.selectedbook.id + " div[name=cardlook]").css("top", "500px");
      function name(params) {
        $("#" + VueBook.selectedbook.id).css("z-index", 1);
      }
      setTimeout(name, 1000);
      hideBackgraund();
    },
    ShowNewBookForm() {
      this.isNewBook = true;
      let ElementBook;
      if (this.books.length != 0) {
        ElementBook = new BookModel(
          this.books[this.books.length - 1].all_id + 1,
          this.books.length + 1,
          "",
          "",
          0,
          "",
          0,
          0,
          "http://razukraska.ru/wp-content/gallery/kniga/kniga7.gif"
        );
      } else {
        ElementBook = new BookModel(
          valLastAllIdBook + 1,
          this.books.length + 1,
          "",
          "",
          0,
          "",
          0,
          0,
          "http://razukraska.ru/wp-content/gallery/kniga/kniga7.gif"
        );
      }
      this.selectedbook.all_id = ElementBook.all_id;
      this.selectedbook.id = ElementBook.id;
      this.selectedbook.title = ElementBook.title;
      this.selectedbook.nameAuthor = ElementBook.nameAuthor;
      this.selectedbook.year = ElementBook.year;
      this.selectedbook.pubHouse = ElementBook.pubHouse;
      this.selectedbook.pages = ElementBook.pages;
      this.selectedbook.amount = ElementBook.amount;
      this.selectedbook.image = ElementBook.image;
      this.filterArray.push(ElementBook);
      function name(params) {
        VueBook.editMode(ElementBook);
      }
      setTimeout(name, 1);
    },
    saveNewBook() {},
  },
  mounted() {
    //копируем основной массив
    this.filterArray = [...this.books];
  },
});

//форма создания нового посетителя
Vue.component("edit-component", {
  props: [
    "createeditnewvisitorfunc",
    "headerform",
    "selectedvisitor",
    "editvisitorfunc",
  ],
  data: function () {
    return {};
  },
  template: `
          <div id="window-div">
              <form onsubmit="return false;">
                  <a @click="btnClouseClick">✖</a>
                  <h4>{{headerform}}</h4>
                  <h6>Имя Фамилия:</h6>
                  <input v-model="selectedvisitor.name" type="text" pattern="[A-ZА-ЯЁ][a-zа-яё]* [A-ZА-ЯЁ][a-zа-яё]*">
                  <p id="VisIsHaveName">Посетитель с таким именем уже существует*</p>
                  <h6>Номер телефона(0-9, -, ):</h6>
                  <input v-model="selectedvisitor.phone" type="text" pattern="([0-9]* ?-?[0-9]*)*">
                  <p id="VisIsHavePhone">Посетитель с таким номером телефона уже существует*</p>
                  <br>
                  <button type="buttom" @mousedown="btncreated" class="btn btn-primary">Сохранить</button>
              </form>
          </div>`,
  methods: {
    btncreated() {
      if (this.selectedvisitor.id == 0) {
        this.createeditnewvisitorfunc(this.selectedvisitor, false);
      } else {
        this.createeditnewvisitorfunc(this.selectedvisitor, true);
      }
    },
    btnClouseClick: function () {
      VueVisitor.HideVisitorForm();
      this.createeditnewvisitorfunc(null);
    },
  },
});
//раздел Пользователи
let VueVisitor = new Vue({
  el: "#visitor-container",
  data: {
    visitors: JSON.parse(valVisitors),
    filterArray: [],
    filterText: "",
    selectedSortList: 0,
    headerform: "Добавить клиента:",
    selectedvisitor: new VisitorModel(0, "", ""),
  },
  methods: {
    //сортировка по ID или Name
    sortvisitor: function (event) {
      switch (event.target.value) {
        case "0":
          this.filterArray = sortUtils.sortListVisitor(0, this.filterArray);
          this.selectedSortList = 0;
          break;
        case "1":
          this.filterArray = sortUtils.sortListVisitor(1, this.filterArray);
          this.selectedSortList = 1;
          break;
      }
    },
    //поиск по name и phone
    filter: function () {
      let self = this;
      let res = this.visitors.filter(function (item) {
        return (
          item.name.toLowerCase().indexOf(self.filterText.toLowerCase()) !==
            -1 ||
          item.phone.toLowerCase().indexOf(self.filterText.toLowerCase()) !==
            -1 ||
          item.phone
            .toLowerCase()
            .replace(/\s/g, "")
            .indexOf(self.filterText.toLowerCase()) !== -1
        );
      });
      this.filterArray = res;
      sortUtils.sortListVisitor(this.selectedSortList, this.filterArray);
    },
    //создание\изменение нового пользователя
    createeditnewvisitor: function (newVis, isEdit) {
      if (newVis != null) {
        //копируем полученого нового пользователя
        let copyVisit = new VisitorModel();
        if (isEdit) copyVisit.id = newVis.id;
        else copyVisit.id = this.visitors.length + 1;
        copyVisit.name = newVis.name;
        copyVisit.phone = newVis.phone;
        let searchEditElement = new VisitorModel(0, "", "");
        if (isEdit)
          searchEditElement = this.visitors.filter(
            (a) => a.id == copyVisit.id
          )[0];
        if (
          validFormsUtils.isValid(
            copyVisit,
            this.visitors,
            isEdit,
            searchEditElement
          )
        ) {
          if (isEdit) {
            searchEditElement.name = copyVisit.name;
            searchEditElement.phone = copyVisit.phone;
          } else {
            this.visitors.push(copyVisit);
          }
          restart();

          this.selectedvisitor = new VisitorModel(0, "", "");
          this.HideVisitorForm();
          this.filter();
          sortUtils.sortListVisitor(this.selectedSortList, this.filterArray);
          VueCheck.restart();
        }
      } else {
        this.selectedvisitor = new VisitorModel(0, "", "");
      }
    },
    //показать форму создания/изменения пользователя
    ShowVisitorForm: function (ElementVisitor) {
      if (ElementVisitor != null) {
        this.headerform = "Изменить данные о клиенте:";
        this.selectedvisitor.id = ElementVisitor.id;
        this.selectedvisitor.name = ElementVisitor.name;
        this.selectedvisitor.phone = ElementVisitor.phone;
      } else {
        this.headerform = "Добавить клиента:";
        this.selectedvisitor = new VisitorModel(0, "", "");
      }
      showBackgraund();
      $("#window-div").css("height", "280px");
      $("#window-div").css("opacity", "1");
    },
    //функция скрытия формы создания нового пользователя
    HideVisitorForm() {
      $("#window-div form input").val("");
      $("#VisIsHavePhone").css("opacity", "0");
      $("#VisIsHaveName").css("opacity", "0");
      $("#window-div").css("height", "0px");
      $("#window-div").css("opacity", "0");
      hideBackgraund();
    },
  },
  mounted() {
    //копируем основной массив
    this.filterArray = [...this.visitors];
  },
});

//форма создания новой карты
Vue.component("edit-component-check", {
  props: ["createnewcheckfunc", "myvisitors", "mybooks", "myfilterboks"],
  data: function () {
    return {
      idVisitor: "",
      idBook: "",
    };
  },
  template: `
              <div id="window-div-check">
                  <form onsubmit="return false;">
                      <a @click="btnClouseClick">✖</a>
                      <h4>Новая карточка</h4>
                      <h6>Имя посетителя:</h6>
                      <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-on:change="changeVis($event)">
                              <option v-for="(vis, idx) in myvisitors" :value="idx">{{vis.name}}</option>
                      </select>
                      <h6>Книга:</h6>
                      <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-on:change="changeBk($event)">
                          <option v-for="(bk, idx) in myfilterboks" :value="idx">{{bk.title}}</option>
                      </select>
                      <br>
                      <button type="buttom" @mousedown="btncreated" class="btn btn-primary">Сохранить</button>
                  </form>
              </div>`,
  methods: {
    changeVis(idVis) {
      if (+idVis.target.value != "") {
        this.idVisitor = +idVis.target.value;
      } else {
        this.idVisitor = 0;
      }
    },
    changeBk(idBk) {
      if (+idBk.target.value != "") {
        this.idBook = +idBk.target.value;
      } else {
        this.idBook = 0;
      }
    },
    btncreated() {
      if (this.idVisitor == "") {
        this.idVisitor = 0;
      }
      if (this.idBook == "") {
        this.idBook = 0;
      }
      $("#window-div-check select").val(0);
      let myEdBooks = this.mybooks.filter((a) => a.amount != 0);
      if (myEdBooks.length != 0) {
        let myEdBook = myEdBooks[this.idBook];
        this.createnewcheckfunc(this.idVisitor, myEdBook.all_id);
        this.idVisitor = 0;
        this.idBook = 0;
      }
    },
    btnClouseClick: function () {
      VueCheck.HideCheckForm();
    },
  },
});
//раздел Карты
let VueCheck = new Vue({
  el: "#check-container",
  data: {
    checks: JSON.parse(valChecks),
    visitors: VueVisitor.visitors,
    books: VueBook.books,
    filterArray: [],
    filterText: "",
    selectedSortList: 0,
    headerform: "Добавить карту:",
    selectedcheck: new CheckModel(),
    myfilterboks: [],
  },
  methods: {
    //сортировка
    sortcheck: function (event) {
      if (!Number.isInteger(event)) event = Number(event.target.value);
      switch (event) {
        case 0:
          this.filterArray = sortUtils.sortListChecks(0, this.filterArray);
          this.selectedSortList = 0;
          break;
        case 1:
          this.filterArray = sortUtils.sortListChecks(1, this.filterArray);
          this.selectedSortList = 1;
          break;
        case 2:
          this.filterArray = sortUtils.sortListChecks(2, this.filterArray);
          this.selectedSortList = 2;
          break;
      }
    },
    //поиск
    filter() {
      this.copyCheck();
      let self = this;
      let res = this.filterArray.filter(function (item) {
        return (
          item.nameVisitor
            .toLowerCase()
            .indexOf(self.filterText.toLowerCase()) !== -1 ||
          item.titleBook
            .toString()
            .toLowerCase()
            .indexOf(self.filterText.toLowerCase()) !== -1
        );
      });
      this.filterArray = res;
      this.sortcheck(this.selectedSortList);
    },
    //создание новой карточки
    createnewcheck: function (idVis, idBk) {
      //копируем полученную новую карту
      let copyCheck = new CheckModel();
      let thisVis = this.visitors.filter((a) => a.id - 1 == idVis)[0];
      let thisBk = this.books.filter((a) => a.all_id == idBk)[0];
      copyCheck.id = this.checks.length + 1;
      copyCheck.all_id = this.checks.length;
      copyCheck.idVisitor = thisVis.id;
      copyCheck.idBook = thisBk.all_id;
      copyCheck.dateTook = dateUtils.convertDate(new Date());
      copyCheck.dateReturned = "";
      this.checks.push(copyCheck);
      VueBook.books.filter((a) => a.all_id == thisBk.all_id)[0].amount--;
      restart();
      this.restart();
      this.filter();
      sortUtils.sortListChecks(this.selectedSortList, this.filterArray);
      this.HideCheckForm();
    },
    deletecheck: function (allIdBook) {
      if (this.checks.filter((a) => a.idBook == allIdBook) != 0) {
        let checkId = this.checks.filter((a) => a.idBook == allIdBook)[0]
          .all_id;
        this.checks.splice(checkId, 1);
        restart();
        this.restart();
      }
    },
    copyCheck() {
      this.filterArray = [];
      let schet = 0;
      for (let i = this.filterArray.length; i < this.checks.length; i++) {
        if (
          this.books.filter((a) => a.all_id == this.checks[i].idBook).length !=
          0
        ) {
          this.filterArray.push(new CheckModel());
          this.filterArray[schet].id = schet + 1;
          this.filterArray[schet].all_id = i;
          this.filterArray[schet].idVisitor = this.checks[i].idVisitor;
          this.filterArray[schet].nameVisitor = this.visitors[
            this.checks[i].idVisitor - 1
          ].name;
          this.filterArray[schet].idBook = this.checks[i].idBook;
          this.filterArray[schet].titleBook = this.books.filter(
            (a) => a.all_id == this.checks[i].idBook
          )[0].title;
          this.filterArray[schet].dateTook = this.checks[i].dateTook;
          this.filterArray[schet].dateReturned = this.checks[i].dateReturned;
          schet++;
        }
      }
    },
    restart() {
      this.visitors = VueVisitor.visitors;
      this.books = VueBook.books;
      this.filterArray = [];
      this.copyCheck();
    },
    returnBook(CheckRet, idx) {
      this.checks[CheckRet.all_id].dateReturned = dateUtils.convertDate(
        new Date()
      );
      VueBook.books.filter((a) => a.all_id == CheckRet.idBook)[0].amount++;
      restart();
      this.filter();
      sortUtils.sortListChecks(this.selectedSortList, this.filterArray);
      this.filterArray[idx].dateReturned = dateUtils.convertDate(new Date());
    },
    //показать форму создания карты
    ShowCheckForm: function () {
      this.myfilterboks = [];
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].amount != 0) {
          this.myfilterboks.push(this.books[i]);
        }
      }
      this.headerform = "Добавить клиента:";
      this.selectedcheck = new CheckModel();
      showBackgraund();
      $("#window-div-check").css("height", "280px");
      $("#window-div-check").css("opacity", "1");
    },
    //функция скрытия формы создания нового пользователя
    HideCheckForm() {
      $("#window-div-check form input").val("");
      $("#window-div-check").css("height", "0px");
      $("#window-div-check").css("opacity", "0");
      hideBackgraund();
    },
  },
  mounted() {
    //копируем основной массив
    this.copyCheck();
  },
  updated() {
    for (let i = 0; i < this.filterArray.length; i++) {
      if (this.filterArray[i].dateReturned != "") {
        $(`#check-container img[name=${i}]`).css("width", "0px");
      } else {
        $(`#check-container img[name=${i}]`).css("width", "70px");
      }
    }
  },
});

let VueStat = new Vue({
  el: "#stat-container",
  data: {
    AktUsers: [],
    PopBooks: [],
  },
  methods: {
    show() {
      this.AktUsers = [];
      this.PopBooks = [];
      let myArrVisCol = [];
      for (let i = 0; i < VueVisitor.visitors.length; i++) {
        let sovp = VueCheck.checks.filter(
          (a) => a.idVisitor == VueVisitor.visitors[i].id
        );
        if (sovp.length != 0)
          myArrVisCol.push(new StatisticsVisitorModel(sovp[0], sovp.length));
      }
      function compareNumericVis(a, b) {
        if (a.VisCol > b.VisCol) return -1;
        if (a.VisCol == b.VisCol) return 0;
        if (a.VisCol < b.VisCol) return 1;
      }
      myArrVisCol.sort(compareNumericVis);
      for (let i = 0; i < 5; i++) {
        this.AktUsers.push(
          VueCheck.visitors[myArrVisCol[i].Vis.idVisitor - 1].name
        );
      }
      //
      let myArrBkCol = [];
      for (let i = 0; i < VueBook.books.length; i++) {
        let sovp = VueCheck.checks.filter(
          (a) => a.idBook == VueBook.books[i].all_id
        );
        if (sovp.length != 0)
          myArrBkCol.push(new StatisticsBookModel(sovp[0], sovp.length));
      }
      function compareNumericBk(a, b) {
        if (a.BkCol > b.BkCol) return -1;
        if (a.BkCol == b.BkCol) return 0;
        if (a.BkCol < b.BkCol) return 1;
      }
      myArrBkCol.sort(compareNumericBk);
      let myI = 5;
      if (myArrBkCol.length < 5) {
        myI = myArrBkCol.length;
      }
      for (let i = 0; i < myI; i++) {
        this.PopBooks.push(
          VueCheck.books.filter((a) => a.all_id == myArrBkCol[i].Bk.idBook)[0]
            .title
        );
      }
    },
  },
  mounted() {
    this.show();
  },
});
