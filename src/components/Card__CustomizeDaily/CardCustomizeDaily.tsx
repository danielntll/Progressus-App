import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonRadio, IonRadioGroup } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./CardCustomizeDaily.module.css";
import { text } from "./text";
import { useState } from "react";

interface ContainerProps { }

const CardCustomizeDaily: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
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
