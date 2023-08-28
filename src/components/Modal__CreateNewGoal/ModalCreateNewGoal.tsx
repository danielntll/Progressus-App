import { useContext, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./ModalCreateNewGoal.module.css";
import { text } from "./text";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { alertCircleOutline, closeCircle, cloudUploadOutline, removeCircleOutline } from "ionicons/icons";
import { typeGoal } from "../../types/typeGoal";
import CardSelectGoalWeekDays from "../Card__SelectGoalWeekDays/CardSelectGoalWeekDays";

interface ContainerProps {
  callback: () => void;
  isModalOpen: boolean,
  setIsModalOpen: (val: boolean) => void;
  goal: typeGoal,
  setGoal: (val: typeGoal) => void,
}

const ModalCreateNewGoal: React.FC<ContainerProps> = ({
  callback,
  isModalOpen,
  setIsModalOpen,
  goal,
  setGoal,

}) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  // RETURN ------------------------
  return (
    <IonModal
      isOpen={isModalOpen}
      className={styles.container}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color={"medium"}
              fill="clear"
              onClick={() => handleCloseModal()}
            >
              {text[language].closeModal}
            </IonButton>
          </IonButtons>
          <IonTitle>
            {text[language].title}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => callback()}
              fill="solid"
              color={"primary"}
            >
              <span className="padding-right-small">
                {text[language].uploadNewGoal}
              </span>
              <IonIcon icon={cloudUploadOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          {/* TITLE */}
          <IonItem>
            <IonButton
              className="padding-right-small"
              size="small"
              fill="clear"
              onClick={() => setGoal({ ...goal, title: "" })}
            >
              <IonIcon
                color={goal.title ? "danger" : "warning"}
                icon={goal.title ? closeCircle : alertCircleOutline}
              />
            </IonButton>
            <IonInput
              value={goal.title}
              onIonInput={(e) => setGoal({ ...goal, title: e.target.value!.toString() })}
              label={text[language].goalTitleLabel}
              placeholder={text[language].goalTitlePlaceholder}
              labelPlacement="stacked"
            />

          </IonItem>
          {/* DESCRIPTION */}
          <IonItem>
            <IonButton
              className="padding-right-small"
              size="small"
              fill="clear"
              onClick={() => setGoal({ ...goal, description: "" })}
            >
              <IonIcon
                className="icon-margin-right"
                color={goal.description ? "danger" : "medium"}
                icon={goal.description ? closeCircle : removeCircleOutline}
              />
            </IonButton>
            <IonTextarea
              value={goal.description}
              onIonInput={(e) => setGoal({ ...goal, description: e.target.value!.toString() })}
              label={text[language].descriptionLabel}
              placeholder={text[language].descriptionPlaceholder}
              labelPlacement="stacked"
            />
          </IonItem>
        </IonList>
        {/* ------------- */}
        <CardSelectGoalWeekDays

        />
      </IonContent>
    </IonModal>);
};

export default ModalCreateNewGoal;
