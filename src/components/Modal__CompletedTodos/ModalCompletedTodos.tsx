import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./ModalCompletedTodos.module.css";
import { text } from "./text";
import { IonButton, IonButtons, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";

interface ContainerProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void;
}

const ModalCompletedTodos: React.FC<ContainerProps> = (
  {
    isOpen,
    setIsOpen
  }
) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <IonModal className={styles.container}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>
            {text[language].closeModal}
          </IonButton>
        </IonButtons>
        <IonTitle>
          {text[language].title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>

  </IonModal>;
};

export default ModalCompletedTodos;
