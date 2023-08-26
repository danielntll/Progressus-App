import { useCallback, useContext, useEffect, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { TodosContext } from "../../utils/reducers/reducerTodo";
import styles from "./ItemUserTodo.module.css";
import { text } from "./text";
import { IonBadge, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import { timeOutline } from "ionicons/icons";

interface ContainerProps {
  todo: typeTodo;
}

const ItemUserTodo: React.FC<ContainerProps> = ({ todo }) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  // FUNCTIONS ---------------------
  useEffect(() => {
    if (
      todo.deadlineDate
    ) {
      const format = new Date(todo.deadlineDate.toString());
      setDeadlineDate(format);
    }
  }, [todo])
  // RETURN ------------------------
  return (
    <IonItem className={styles.container}>
      <IonIcon
        icon={todo.categoryType.icon}
        style={{ color: todo.categoryType.color }}
        slot="start"
      />
      <IonLabel>
        <div className={styles.ItemUserTodo}>

          <div className={styles.ItemUserTodo__header}>
            <IonBadge
              style={{ backgroundColor: todo.categoryType.color }} slot="start"
            >
              {todo.categoryType.name}
            </IonBadge>
          </div>
          <div>
            <h2>{todo.title}</h2>
            {todo?.description ?
              <IonLabel className="ion-text-wrap">
                <p>{todo?.description}</p>
              </IonLabel>
              : null
            }
          </div>
          {
            todo?.deadlineDate ?
              <div>
                <IonBadge color={"medium"}>
                  <div className={styles.ItemUserTodo__deadlineDate__content}>
                    <IonIcon icon={timeOutline} />
                    {
                      (deadlineDate?.getHours()! < 10 ? "0" + deadlineDate?.getHours() : deadlineDate?.getHours()) +
                      ":" +
                      (deadlineDate?.getMinutes()! < 10 ? "0" + deadlineDate?.getMinutes() : deadlineDate?.getMinutes()) +
                      " " +
                      deadlineDate?.getDate() +
                      "/" +
                      deadlineDate?.getMonth() +
                      "/" +
                      deadlineDate?.getFullYear()
                    }
                  </div>
                </IonBadge>
              </div>
              : null
          }
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default ItemUserTodo;
