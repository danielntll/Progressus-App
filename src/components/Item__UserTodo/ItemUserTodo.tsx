import { useEffect, useState } from "react";
import { IonBadge, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import { timeOutline } from "ionicons/icons";

import styles from "./ItemUserTodo.module.css";


interface ContainerProps {
  todo: typeTodo;
  callback: (todo: typeTodo) => void;
}

const ItemUserTodo: React.FC<ContainerProps> = ({ todo, callback }) => {
  // VARIABLES ---------------------
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
  }, [todo]);



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
      <IonButton onClick={() => callback(todo)} slot="end">
        {
          todo.completed ?
            "Completato"
            :
            "Completa"
        }
      </IonButton>
    </IonItem>
  );
};

export default ItemUserTodo;
