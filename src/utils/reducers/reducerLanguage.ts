import { createContext } from "react";
import { typeReducerLanguage } from "../../types/typeReducerLanguage";

export const reducerLanguage = (state: any, action: typeReducerLanguage) => {
  switch (action.type) {
    case "UPDATE":
      return action.selectedLanguage;

    default:
      console.log(state);
      return state;
  }
};

export const LanguageContext = createContext<any>("");
