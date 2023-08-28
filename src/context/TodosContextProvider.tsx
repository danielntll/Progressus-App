import { createContext, useContext, useEffect, useState } from "react";
import { LanguageContext } from "../utils/reducers/reducerLanguage";
import { typeAviableLanguages } from "../types/typeAviableLanguages";
import { useAuthContext } from "../firebase/auth";
import { typeTodo } from "../types/typeTodo";
import { firebaseTodosRealtime } from "../firebase/firebaseTodoActions";
import { Unsubscribe } from "firebase/auth";


export type typeSubToDailyCompleted = {
  completedUIDs: string[],
  unsub: Unsubscribe,
}


type typeTodosContext = {
  dailyTodos: typeTodo[],
  dailyCompleted: typeSubToDailyCompleted;
  auxSelectedDay: Date;
  setAuxSelectedDay: (day: Date) => void;

}

export const TodosContext = createContext<typeTodosContext>({
  dailyTodos: [],
  dailyCompleted: {
    completedUIDs: [],
    unsub: () => { },
  },
  auxSelectedDay: new Date(),
  setAuxSelectedDay: () => { },
});


export const useTodosContext = () => useContext<typeTodosContext>(TodosContext);


export const TodosContextProvider = ({ children }: any) => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [dailyTodos, setDailyTodos] = useState<typeTodo[]>([]);
  const [dailyCompletedTodos, setDailyCompletedTodos] = useState<typeSubToDailyCompleted>({
    completedUIDs: [],
    unsub: () => { }
  });
  const [auxSelectedDay, setAuxSelectedDay] = useState<Date>(new Date());

  // FUNCTIONS ---------------------
  useEffect(() => {
    // INITIALIZE TASKS -----
    if (userUID) {
      firebaseTodosRealtime.DAILY(userUID, setDailyTodos);
    }
  }, [userUID]);

  useEffect(() => {
    if (userUID && auxSelectedDay) {
      dailyCompletedTodos.unsub();
      firebaseTodosRealtime.CALENDAR.DAILY_COMPLETED(userUID, auxSelectedDay!, setDailyCompletedTodos)
    }
  }, [auxSelectedDay])

  useEffect(() => {
    console.log("dailyCompletedTodos: ", dailyCompletedTodos)
  }, [dailyCompletedTodos])

  // RETURN ------------------------
  return (
    <TodosContext.Provider value={
      {
        dailyTodos,
        auxSelectedDay,
        setAuxSelectedDay,
        dailyCompleted: dailyCompletedTodos,
      }
    }>

      {children}

    </TodosContext.Provider>
  )
}