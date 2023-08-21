import { DefaultComponentText } from "./ModalCalendar-text";
import styles from "./ModalCalendar.module.css";
import { IonButton, IonContent, IonDatetime, IonModal } from "@ionic/react";
import { useState } from "react";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  callback: (selectedDate: Date) => void;
}

const ModalCalendar: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  callback,
}) => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // FUNCTIONS ---------------------
  const handleSelectedDate = (date: any) => {
    setSelectedDate(new Date(date));
  };

  const handleConfirm = () => {
    callback(selectedDate);
    setIsOpen(false);
  };
  // RETURN ------------------------
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      breakpoints={[0.5, 0.75, 0.95]}
      initialBreakpoint={0.75}
    >
      <IonContent className="ion-padding">
        <div className={styles.ModalCalendar__content}>
          <h4>{DefaultComponentText.title}</h4>
          <IonDatetime
            multiple={false}
            onIonChange={(e) => {
              handleSelectedDate(e.target.value!);
            }}
            presentation="date"
          ></IonDatetime>
        </div>
        <IonButton expand="block" onClick={() => handleConfirm()}>
          {DefaultComponentText.cta}
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalCalendar;