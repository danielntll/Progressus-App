import { text } from "./text";
import styles from "./SectionTaskToBeDone.module.css";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { useContext } from "react";

interface ContainerProps { }

const SectionTaskToBeDone: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default SectionTaskToBeDone;
