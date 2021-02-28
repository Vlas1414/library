import { en } from "./english_local";
import { ua } from "./ukrainian_local";
const messages = {
  en,
  ua,
};

let keyLocal = "Languge";
let valLocal = localStorage.getItem(keyLocal);
if (valLocal == null) {
  valLocal = "ua";
  localStorage.setItem(keyLocal, valLocal);
}

// Create VueI18n instance with options
export const i18n = new VueI18n({
  locale: valLocal, // set locale
  messages, // set locale messages
});

// let ukrBtn = $("#changeLanguge_btn_ukrainian");
// let engBtn = $("#changeLanguge_btn_english");
// let activeClassName = "changeLanguge_btn-active";

new Vue({
  el: "#app",
  i18n,
  data: {
    languge: valLocal,
  },
  methods: {
    uaClick() {
      this.changeLanguge("ua");
    },
    enClick() {
      this.changeLanguge("en");
    },
    changeLanguge(newValue) {
      i18n.locale = newValue;
      localStorage.setItem(keyLocal, newValue);
      this.languge = newValue;
    },
  },
});
