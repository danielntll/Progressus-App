import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./DefaultComponent.module.css";
import { text } from "./text";

interface ContainerProps { }

const DefaultComponent: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default DefaultComponent;
