import { useContext } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { TodosContext } from "../../utils/reducers/reducerTodo";
import styles from "./ListUserTodos.module.css";
import { text } from "./text";
import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import ItemUserTodo from "../Item__UserTodo/ItemUserTodo";

interface ContainerProps {
  todos: typeTodo[],
  title: string,
}

const ListUserTodos: React.FC<ContainerProps> = ({ todos, title }) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <IonList className={styles.container} inset>
      <IonListHeader>
        <IonLabel>{title}</IonLabel>
      </IonListHeader>
      {todos?.map((todo: typeTodo) => {
        return (
          <ItemUserTodo todo={todo} key={todo.todoUID} />
        )
      })}
    </IonList>
  );
};

export default ListUserTodos;
