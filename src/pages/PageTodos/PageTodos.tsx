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
import { useContext, useState } from "react";
import { TodosContext } from "../../utils/reducers/reducerTodo";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";


const PageTodos: React.FC = () => {
  // VARIABLES ---------------------
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  // CONDITIONS --------------------
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // FUNCTIONS ---------------------
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
            setSelectedDate={setSelectedDate}
          />
        </div>
        {/* END CONTENT ----------------------- */}
      </IonContent>
    </IonPage>
  );
};

export default PageTodos;
