import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { useContext } from "react";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";

import styles from "./CardCustomizeDaily.module.css";
import { text } from "./text";


interface ContainerProps { }

const CardCustomizeDaily: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
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
