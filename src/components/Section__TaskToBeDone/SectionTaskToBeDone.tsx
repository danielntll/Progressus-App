import { text } from "./text";
import styles from "./SectionTaskToBeDone.module.css";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";

interface ContainerProps { }

const SectionTaskToBeDone: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default SectionTaskToBeDone;
