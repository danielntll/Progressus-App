import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./CardCustomizeCategoryFolder.module.css";
import { text } from "./text";

interface ContainerProps { }

const CardCustomizeCategoryFolder: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default CardCustomizeCategoryFolder;
