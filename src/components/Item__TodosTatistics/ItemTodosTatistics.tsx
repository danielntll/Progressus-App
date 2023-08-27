import styles from "./ItemTodosTatistics.module.css";
import { IonBadge, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { chevronExpand } from "ionicons/icons";
import { useState } from "react";
import ModalCompletedTodos from "../Modal__CompletedTodos/ModalCompletedTodos";

interface ContainerProps {
  title: string;
  icon: string;
  dailyCompleted: string[];
}

const ItemTodosTatistics: React.FC<ContainerProps> = ({ dailyCompleted, title, icon }) => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  const [isOpen, setIsOpen] = useState(false);
  // FUNCTIONS ---------------------
  const handleOpenModal = () => {
    setIsOpen(true);
  }
  // RETURN ------------------------
  return (
    <>
      <IonItem className={styles.ItemTodosTatistics}>
        <IonIcon
          color="primary"
          slot="start"
          icon={icon}
        />
        <IonLabel>
          <p className={styles.ItemTodosTatistics__inline}>{title}
            <IonBadge>
              <span className={styles.ItemTodosTatistics__number}>
                {dailyCompleted ? dailyCompleted.length : 0}
              </span>
            </IonBadge>
          </p>
        </IonLabel>
        <IonButton
          onClick={() => handleOpenModal()}
          slot="end">
          <IonIcon icon={chevronExpand} />
        </IonButton>
      </IonItem>

      <ModalCompletedTodos
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dailyCompleted={dailyCompleted}
      />
    </>);
};

export default ItemTodosTatistics;
