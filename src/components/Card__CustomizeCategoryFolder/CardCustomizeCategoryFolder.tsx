import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./CardCustomizeCategoryFolder.module.css";
import { text } from "./text";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";

interface ContainerProps { }

const CardCustomizeCategoryFolder: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default CardCustomizeCategoryFolder;
