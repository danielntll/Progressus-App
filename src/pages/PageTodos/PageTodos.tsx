import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styles from "./PageTodos.module.css";
import { RoutesApp } from "../../routes";
import SliderCalendar from "../../components/Slider__Calendar/SliderCalendar";
import InputAddTodo from "../../components/Input__AddTodo/InputAddTodo";
import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import ListUserTodos from "../../components/List__UserTodos/ListUserTodos";
import { text } from "./text";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { SelectedDateContext, reducerSelectedDate } from "../../utils/reducers/reducerSelectedDate";
import { typeTodo } from "../../types/typeTodo";
import { firebaseTodoActions } from "../../firebase/firebaseTodoActions";
import { useAuthContext } from "../../firebase/auth";
import { useTodosContext } from "../../context/TodosContextProvider";


const PageTodos: React.FC = () => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { stateTodos, dispatchTodos } = useTodosContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const [stateSelectedDate, dispatchSelectedDate] = useReducer(reducerSelectedDate, new Date());
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [selectedDate, setSelectedDate] = useState<Date>(stateSelectedDate);
  const [todayCompletedTodos, setTodayCompletedTodos] = useState<typeTodo[]>([])

  // FUNCTIONS ---------------------
  useEffect(() => {
    dispatchSelectedDate({
      type: "UPDATE",
      date: selectedDate,
    })
  }, [selectedDate]);

  const handleCompleteTodo = useCallback((todo: typeTodo) => {
    try {
      console.log("handleCompleteTodo : ", stateSelectedDate);
      firebaseTodoActions.COMPLETE(todo, userUID!, stateSelectedDate, todo.categoryType.name).then(() => {
        dispatchTodos({
          type: "COMPLETE",
          refTodo: todo
        })
      });
    } catch (error) {

    }
  }, [stateSelectedDate])


  // RETURN ------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{RoutesApp.pageTodos.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{RoutesApp.pageTodos.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SelectedDateContext.Provider
          value={{ stateSelectedDate, dispatchSelectedDate }}>
          {/* INIT CONTENT ---------------------- */}
          <div className={styles.pageContainer}>
            <SliderCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <InputAddTodo
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            {/* ---------- */}
            <ListUserTodos
              callback={(todo: typeTodo) => handleCompleteTodo(todo)}
              todos={stateTodos}
              title={text[language].sectionTitle}
            />
          </div>
          {/* END CONTENT ----------------------- */}
        </SelectedDateContext.Provider>
      </IonContent>
    </IonPage>
  );
};

export default PageTodos;
