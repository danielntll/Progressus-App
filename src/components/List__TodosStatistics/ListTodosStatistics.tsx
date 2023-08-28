import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./ListTodosStatistics.module.css";
import { text } from "./text";
import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import ItemDailyCompletedTodos from "../Item__TodosTatistics/ItemTodosTatistics";
import { calendarNumber, diamond, trophy } from "ionicons/icons";

interface ContainerProps {
  dailyCompleted: string[],
  selectedDate: Date,
}

const ListTodosStatistics: React.FC<ContainerProps> = ({ dailyCompleted, selectedDate }) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <IonList className={styles.container} inset>
    <IonListHeader>
      <IonLabel>{text[language].title}</IonLabel>
    </IonListHeader>
    {/* <ItemDailyCompletedTodos
      selectedDate={selectedDate}
      dailyCompleted={dailyCompleted}
      title={text[language].sectionGolas}
      icon={trophy}
    /> */}
    <ItemDailyCompletedTodos
      selectedDate={selectedDate}
      dailyCompleted={dailyCompleted}
      title={text[language].sectionDaily}
      icon={calendarNumber}
    />
    {/* <ItemDailyCompletedTodos
     selectedDate={selectedDate}
      dailyCompleted={dailyCompleted}
      title={text[language].sectionFolder}
      icon={diamond}
    />  */}
  </IonList>;
};

export default ListTodosStatistics;
