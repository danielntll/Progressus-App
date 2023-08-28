import { useContext, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./ToggleDay.module.css";
import { IonText } from "@ionic/react";
import { text } from "./text";

interface ContainerProps {
  isActive: boolean,
  text: string,
  callback: () => void;
}

const ToggleDay: React.FC<ContainerProps> = ({ isActive, text, callback }) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [active, setActive] = useState<boolean>(isActive);
  // FUNCTIONS ---------------------
  const handleClick = () => {
    setActive(!active);
    callback();
  }
  // RETURN ------------------------
  return (
    <div
      onClick={() => handleClick()}
      className={
        active ?
          styles.ToggleDay__container__isActive :
          styles.ToggleDay__container__notActive
      }
    >
      <IonText color={active ? "light" : "primary"} className={styles.ToggleDay__text}>
        {text}
      </IonText>
    </div>
  );
};

export default ToggleDay;
