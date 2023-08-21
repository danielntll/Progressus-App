import { DefaultComponentText } from "./ModalCalendar-text";
import styles from "./ModalCalendar.module.css";
import { IonContent, IonDatetime, IonModal } from "@ionic/react";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  callback: (val: number) => void;
}

const ModalCalendar: React.FC<ContainerProps> = ({
  isOpen,
  setIsOpen,
  callback,
}) => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  const handleSelectedDate = (date: any) => {
    console.log("handleSelectedDate : ", new Date(date).getDate());
    callback(new Date(date).getDate());
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
      </IonContent>
    </IonModal>
  );
};

export default ModalCalendar;
