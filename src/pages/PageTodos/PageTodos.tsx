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
import { useCallback, useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import ListUserTodos from "../../components/List__UserTodos/ListUserTodos";
import { text } from "./text";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { typeTodo } from "../../types/typeTodo";
import { firebaseTodoActions } from "../../firebase/firebaseTodoActions";
import { useAuthContext } from "../../firebase/auth";
import { useTodosContext } from "../../context/TodosContextProvider";



const PageTodos: React.FC = () => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { dailyTodos, setAuxSelectedDay, auxSelectedDay } = useTodosContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [selectedDate, setSelectedDate] = useState<Date>(auxSelectedDay);

  // FUNCTIONS ---------------------
  useEffect(() => {
    setAuxSelectedDay(selectedDate)
  }, [selectedDate]);

  const handleCompleteTodo = useCallback((todo: typeTodo) => {
    try {
      console.log("handleCompleteTodo : ", selectedDate);
      firebaseTodoActions.COMPLETE(todo, userUID!, selectedDate, todo.categoryType.name);

    } catch (error) {

    }
  }, [selectedDate])


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

        {/* INIT CONTENT ---------------------- */}
        <div className={styles.pageContainer}>
          <SliderCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <InputAddTodo
            selectedDate={selectedDate}
          />
          {/* ---------- */}
          <ListUserTodos
            callback={(todo: typeTodo) => handleCompleteTodo(todo)}
            todos={dailyTodos}
            title={text[language].sectionTitle}
          />
        </div>
        {/* END CONTENT ----------------------- */}

      </IonContent>
    </IonPage>
  );
};

export default PageTodos;
