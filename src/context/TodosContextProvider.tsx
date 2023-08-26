import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { LanguageContext } from "../utils/reducers/reducerLanguage";
import { typeAviableLanguages } from "../types/typeAviableLanguages";
import { useAuthContext } from "../firebase/auth";
import { reducerTodo } from "../utils/reducers/reducerTodo";
import { typeTodo } from "../types/typeTodo";
import { firebaseTodoActions } from "../firebase/firebaseTodoActions";


export const TodosContext = createContext<any>({
  stateTodos: [],
  dispatchTodos: () => { },
});


export const useTodosContext = useContext(TodosContext);


export const TodosContextProvider = ({ children }: any) => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [stateTodos, dispatchTodos] = useReducer(reducerTodo, []);
  // FUNCTIONS ---------------------
  useEffect(() => {
    // INITIALIZE TASKS -----
    if (userUID) firebaseTodoActions.INITIALIZE(userUID!).then((todos: typeTodo[]) => {
      dispatchTodos({
        type: "INITIALIZE_DATA",
        initialize: todos,
      })
    });
  }, [userUID]);
  // RETURN ------------------------
  return (
    <TodosContext.Provider value={
      {
        stateTodos,
        dispatchTodos
      }
    }>

      {children}

    </TodosContext.Provider>
  )
}