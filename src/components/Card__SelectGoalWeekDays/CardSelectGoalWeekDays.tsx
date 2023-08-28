import { useContext, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./CardSelectGoalWeekDays.module.css";
import { text } from "./text";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle } from "@ionic/react";
import ToggleDay from "../Toggle__Day/ToggleDay";
import { daysStrict } from "../../text/textDays&Months";

interface ContainerProps {

}

const CardSelectGoalWeekDays: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  // FUNCTIONS ---------------------
  const handleAddDay = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      console.log("REMOVE");
      setSelectedDays((days) => days.filter((day: number) => day !== dayIndex))
    } else {
      console.log("ADD");
      setSelectedDays(selectedDays.concat(dayIndex));
    }
  }
  // RETURN ------------------------
  return (
    <IonCard className={styles.container}>
      <IonCardHeader>
        <IonCardSubtitle>
          {text[language].subtitle}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className={styles.CardSelectGoalWeekDays__row}>
          {daysStrict[language].map((day: string, index: number) => {
            return (
              <ToggleDay
                callback={() => handleAddDay(index)}
                isActive={selectedDays.includes(index) ? true : false}
                text={day}
                key={index + day}
              />
            )
          })}
        </div>
      </IonCardContent>
    </IonCard>);
};

export default CardSelectGoalWeekDays;
