import { text } from "./text";
import styles from "./ModalCalendar.module.css";
import { IonButton, IonContent, IonDatetime, IonModal } from "@ionic/react";
import { useContext, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";


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
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
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
          <h4>{text[language].title}</h4>
          <IonDatetime
            locale={text[language].calendar}
            multiple={false}
            onIonChange={(e) => {
              handleSelectedDate(e.target.value!);
            }}
            presentation="date"
          ></IonDatetime>
        </div>
        <IonButton expand="block" onClick={() => handleConfirm()}>
          {text[language].cta}
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalCalendar;
