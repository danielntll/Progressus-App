import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { TodosContext } from "../../utils/reducers/reducerTodo";
import styles from "./ListUserTodos.module.css";
import { text } from "./text";
import { IonList } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import ItemUserTodo from "../Item__UserTodo/ItemUserTodo";

interface ContainerProps {
  todos: typeTodo[]
}

const ListUserTodos: React.FC<ContainerProps> = ({ todos }) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <IonList className={styles.container} inset>
      {todos?.map((todo: typeTodo) => {
        return (
          <ItemUserTodo todo={todo} key={todo.todoUID} />
        )
      })}
    </IonList>
  );
};

export default ListUserTodos;
