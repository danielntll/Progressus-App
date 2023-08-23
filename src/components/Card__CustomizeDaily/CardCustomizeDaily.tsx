import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonRadio, IonRadioGroup } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./CardCustomizeDaily.module.css";
import { text } from "./text";
import { useContext, useState } from "react";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { TodosContext } from "../../utils/reducers/reducerTodo";

interface ContainerProps { }

const CardCustomizeDaily: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          {text[language].customize}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
      </IonCardContent>
    </IonCard>
  )
    ;
};

export default CardCustomizeDaily;
