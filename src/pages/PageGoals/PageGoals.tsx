import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RoutesApp } from "../../routes";

import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { useContext, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";


import styles from "./PageGoals.module.css";
import { text } from "./text";
import { add } from "ionicons/icons";
import ModalCreateNewGoal from "../../components/Modal__CreateNewGoal/ModalCreateNewGoal";
import { defaultGoal, typeGoal } from "../../types/typeGoal";

const PageGoals: React.FC = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [isModalCreateNewGoalOpen, setIsModalCreateNewGoalOpen] = useState<boolean>(false);
  const [newGoal, setNewGoal] = useState<typeGoal>(defaultGoal);
  // FUNCTIONS ---------------------
  const handleOpenCreateNewGoal = () => {
    setIsModalCreateNewGoalOpen(true);
  }

  const handleUploadNewGoal = () => {
    console.log("handleUploadNewGoal");
    try {
      newGoal.createdAt = Date.now();

    } catch (error) {

    }
  }
  // RETURN ------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{RoutesApp.pageGoals.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              onClick={() => handleOpenCreateNewGoal()}
            >
              <span className="padding-right-small">
                {text[language].addGoal}
              </span>
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{RoutesApp.pageGoals.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* INIT CONTENT ---------------------- */}
        <div className={styles.pageContainer}></div>
        {/* END CONTENT ----------------------- */}
        {/* EXTRA ----------------------------- */}
        <ModalCreateNewGoal
          callback={handleUploadNewGoal}
          isModalOpen={isModalCreateNewGoalOpen}
          setIsModalOpen={setIsModalCreateNewGoalOpen}
          goal={newGoal}
          setGoal={setNewGoal}
        />
      </IonContent>
    </IonPage>
  );
};

export default PageGoals;
