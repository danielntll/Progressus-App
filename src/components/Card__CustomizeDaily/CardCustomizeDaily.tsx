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
  const [selectedColor, setSelectedColor] = useState<string>("red");
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
        <div className={styles.CardCustomizeDaily__row}>
          <IonButton
            fill={selectedColor === "red" ? "solid" : "outline"}
            color={"red"}
            onClick={() => setSelectedColor("red")}
          >
          </IonButton>
          <IonButton
            fill={selectedColor === "orange" ? "solid" : "outline"}
            color={"orange"}
            onClick={() => setSelectedColor("orange")}
          >
          </IonButton>
          <IonButton
            fill={selectedColor === "yellow" ? "solid" : "outline"}
            color={"yellow"}
            onClick={() => setSelectedColor("yellow")}
          >
          </IonButton>
          <IonButton
            fill={selectedColor === "green" ? "solid" : "outline"}
            color={"green"}
            onClick={() => setSelectedColor("green")}
          >
          </IonButton>
          <IonButton
            fill={selectedColor === "sky" ? "solid" : "outline"}
            color={"sky"}
            onClick={() => setSelectedColor("sky")}
          >
          </IonButton>
          <IonButton
            fill={selectedColor === "blue" ? "solid" : "outline"}
            color={"blue"}
            onClick={() => setSelectedColor("blue")}
          >
          </IonButton>
          <IonButton
            fill={selectedColor === "purple" ? "solid" : "outline"}
            color={"purple"}
            onClick={() => setSelectedColor("purple")}
          >
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  )
    ;
};

export default CardCustomizeDaily;
