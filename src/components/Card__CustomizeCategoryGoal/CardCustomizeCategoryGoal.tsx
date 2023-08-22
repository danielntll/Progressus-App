import { IonAvatar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCheckbox, IonIcon, IonItem, IonLabel, IonList, useIonToast } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./CardCustomizeCategoryGoal.module.css";
import { text } from "./text";
import { constGoalTypes } from "../../constants/constGoalTypes";
import { typeGoalType } from "../../types/typeGoalTypes";
import { checkmark, lockClosed, lockOpen, skullOutline, warningOutline } from "ionicons/icons";
import { days } from "../../text/textDays&Months";
import { useEffect, useState } from "react";

interface ContainerProps { }

const CardCustomizeCategoryGoal: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const userLvl: number = 1;
  const newGoalCategoryLvlRequired = 10;
  const language: typeAviableLanguages = "ita";
  const [presentToast] = useIonToast();

  // CONDITIONS --------------------
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  // FUNCTIONS ---------------------
  const handleSelect = {
    add: (dayIndex: number) => {
      setSelectedDays(selectedDays.concat(dayIndex));
    },
    remove: (dayIndex: number) => {
      setSelectedDays(selectedDays.filter((dI) => dI !== dayIndex))
    },

  }

  const check = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      console.log("C'è già ")
      handleSelect.remove(dayIndex)
    } else {
      console.log("C'è Nope")
      handleSelect.add(dayIndex)
    }
  }

  useEffect(() => {
    console.log("selectedDays : ", selectedDays);
  }, [selectedDays])


  const handleCreateNewGoalType = () => {
    if (userLvl >= newGoalCategoryLvlRequired) {
      try {
        toast.success();
      } catch (error) {
        toast.danger();
      }
    } else {
      toast.warning();
    }
  }

  const toast = {
    success: () => {
      presentToast({
        message: text[language].toastSuccess,
        duration: 2000,
        color: "success",
        position: "top",
        icon: checkmark,
      });
    },
    warning: () => {
      presentToast({
        message: text[language].toastWarning + newGoalCategoryLvlRequired,
        duration: 2000,
        color: "warning",
        position: "top",
        icon: warningOutline,
      });
    },
    danger: () => {
      presentToast({
        message: text[language].toastDanger,
        duration: 2000,
        color: "danger",
        position: "top",
        icon: skullOutline,
      });
    }
  }

  // RETURN ------------------------
  return <IonCard className={styles.container}>
    <IonCardHeader>
      <IonCardSubtitle>{text[language].subtitle}</IonCardSubtitle>
    </IonCardHeader>
    <div className={styles.CardCustomizeCategoryGoal__row}>
      {days[language].map((day: string, index: number) => {
        return (
          <div key={index + day} onClick={() => {
            check(index)
          }} className={styles.CardCustomizeCategoryGoal__daysBox}>
            <IonLabel>
              <p>{day}</p>
            </IonLabel>
            <IonCheckbox color={"primary"} />
          </div>
        )
      })}
    </div>
    <IonList inset>
      {constGoalTypes[language].map((goalType: typeGoalType, index: number) => {
        return (
          <IonItem key={index + goalType.title}>
            <IonAvatar className={styles.CardCustomizeCategoryGoal__avatar}>
              <IonIcon color={goalType.color} icon={goalType.icon} />
            </IonAvatar>
            <IonLabel className="ion-text-wrap">
              <h3>{goalType.title}</h3>
              <p>{goalType.description}</p>
            </IonLabel>
            <IonCheckbox onClick={() => { }} color={goalType.color} />
          </IonItem>
        )
      })}
      <IonItem>
        <IonLabel>
          <p>{text[language].createP}</p>
          <h3>{text[language].createH}</h3>
        </IonLabel>
        <IonButton color={userLvl >= newGoalCategoryLvlRequired ? "primary" : "warning"} onClick={() => handleCreateNewGoalType()}>
          <IonIcon icon={userLvl >= newGoalCategoryLvlRequired ? lockOpen : lockClosed} />
        </IonButton>
      </IonItem>
    </IonList>


  </IonCard>;
};

export default CardCustomizeCategoryGoal;
