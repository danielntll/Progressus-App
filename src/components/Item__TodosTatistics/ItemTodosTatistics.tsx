import styles from "./ItemTodosTatistics.module.css";
import { IonBadge, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { calendarNumberOutline, chevronExpand } from "ionicons/icons";

interface ContainerProps {
  title: string;
  icon: string;
  dailyCompleted: string[];
}

const ItemTodosTatistics: React.FC<ContainerProps> = ({ dailyCompleted, title, icon }) => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <IonItem className={styles.ItemTodosTatistics}>

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
    <IonButton slot="end">
      <IonIcon icon={chevronExpand} />
    </IonButton>
  </IonItem>;
};

export default ItemTodosTatistics;
