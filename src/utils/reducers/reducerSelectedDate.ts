import { createContext } from "react";

type typeReducerSelectedDate = {
  type: "UPDATE" | "GET_CURRENT";
  date: Date;
};

export const reducerSelectedDate = (
  state: any,
  action: typeReducerSelectedDate
) => {
  switch (action.type) {
    case "UPDATE":
      return action.date;

    default:
      console.log("DEFAULT !!! ", state);
      return state;
  }
};

export const SelectedDateContext = createContext<any>("");
