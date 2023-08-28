import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import ItemUserTodo from "../Item__UserTodo/ItemUserTodo";

import styles from "./ListUserTodos.module.css";

interface ContainerProps {
  todos: typeTodo[],
  title: string,
  callbackComplete: (todo: typeTodo) => void;
  callbackModify: (todo: typeTodo) => void;
  callbackDelete: (todo: typeTodo) => void;
}

const ListUserTodos: React.FC<ContainerProps> = (
  {
    todos,
    title,
    callbackComplete,
    callbackModify,
    callbackDelete
  }) => {

  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <IonList className={styles.container} inset>
      <IonListHeader>
        <IonLabel>{title}</IonLabel>
      </IonListHeader>
      {todos?.map((todo: typeTodo) => {
        if (!todo.completed) return (
          <ItemUserTodo
            callbackComplete={callbackComplete}
            callbackModify={callbackModify}
            callbackDelete={callbackDelete}
            todo={todo}
            key={todo.todoUID}
          />
        )
      })}
    </IonList>
  );
};

export default ListUserTodos;
