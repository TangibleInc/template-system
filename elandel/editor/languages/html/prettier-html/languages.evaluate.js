// import linguistLanguages from "linguist-languages";
import createLanguage from "./core/utils/create-language.js";

// Forked due to import issue with %20 in file path
// @see https://github.com/ikatyang/linguist-languages/issues/278
const linguistLanguages = {
  HTML: {
    "name": "HTML",
    "type": "markup",
    "tmScope": "text.html.basic",
    "aceMode": "html",
    "codemirrorMode": "htmlmixed",
    "codemirrorMimeType": "text/html",
    "color": "#e34c26",
    "aliases": [
      "xhtml"
    ],
    "extensions": [
      ".html",
      ".hta",
      ".htm",
      ".html.hl",
      ".inc",
      ".xht",
      ".xhtml"
    ],
    "languageId": 146
  }  
}

const languages = [
  // createLanguage(linguistLanguages.HTML, () => ({
  //   name: "Angular",
  //   parsers: ["angular"],
  //   vscodeLanguageIds: ["html"],
  //   extensions: [".component.html"],
  //   filenames: [],
  // })),
  createLanguage(linguistLanguages.HTML, (data) => ({
    parsers: ["html"],
    vscodeLanguageIds: ["html"],
    extensions: [
      ...data.extensions,
      ".mjml", // MJML is considered XML in Linguist but it should be formatted as HTML
    ],
  })),
  // createLanguage(linguistLanguages.HTML, () => ({
  //   name: "Lightning Web Components",
  //   parsers: ["lwc"],
  //   vscodeLanguageIds: ["html"],
  //   extensions: [],
  //   filenames: [],
  // })),
  // createLanguage(linguistLanguages.Vue, () => ({
  //   parsers: ["vue"],
  //   vscodeLanguageIds: ["vue"],
  // })),
];

export default languages;
