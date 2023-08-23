import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./CardCustomizeCategoryFolder.module.css";
import { text } from "./text";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { TodosContext } from "../../utils/reducers/reducerTodo";

interface ContainerProps { }

const CardCustomizeCategoryFolder: React.FC<ContainerProps> = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return <div className={styles.container}>{text[language].title}</div>;
};

export default CardCustomizeCategoryFolder;
