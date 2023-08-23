import { text } from "./text";
import styles from "./SectionTaskToBeDone.module.css";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { useContext } from "react";
import { TodosContext } from "../../utils/reducers/reducerTodo";

interface ContainerProps { }

const SectionTaskToBeDone: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default SectionTaskToBeDone;
