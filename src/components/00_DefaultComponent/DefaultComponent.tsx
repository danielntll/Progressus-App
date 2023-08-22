import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./DefaultComponent.module.css";
import { text } from "./text";

interface ContainerProps { }

const DefaultComponent: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default DefaultComponent;
