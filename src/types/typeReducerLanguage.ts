import { typeAviableLanguages } from "./typeAviableLanguages";

export type typeReducerLanguage = {
  type: "UPDATE";
  selectedLanguage: typeAviableLanguages;
};
