import { useEffect, useState } from "react";
import { IonBadge, IonButton, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import { chevronForward, closeOutline, timeOutline } from "ionicons/icons";

import styles from "./ItemUserTodo.module.css";


interface ContainerProps {
  todo: typeTodo;
  callbackComplete: (todo: typeTodo) => void;
  callbackModify: (todo: typeTodo) => void;
  callbackDelete: (todo: typeTodo) => void;
}

const ItemUserTodo: React.FC<ContainerProps> = (
  {
    todo,
    callbackComplete,
    callbackModify,
    callbackDelete,
  }
) => {
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

  const handleFullSwipe = (e: CustomEvent) => {
    const triggerSwipeNumber = 2;
    if (Math.sign(e.detail.ratio) === 1) {
      Math.abs(e.detail.ratio) > triggerSwipeNumber ? handleOpenTodo(e) : null;
    } else {
      Math.abs(e.detail.ratio) > triggerSwipeNumber ? handleRemoveTodo(e) : null;
    }
  };

  const handleOpenTodo = (e?: any) => {
    console.log("handleOpenTodo");
    e?.currentTarget?.close();
    callbackModify(todo);
  };
  const handleRemoveTodo = (e?: any) => {
    console.log("handleRemoveTodo");
    e?.currentTarget?.close();
    callbackDelete(todo);
  };


  // RETURN ------------------------
  return (
    <>
      <IonItemSliding onIonDrag={handleFullSwipe}>
        <IonItemOptions side="start">
          <IonItemOption
            onClick={() => handleRemoveTodo()}
            color="danger"
            expandable
          >
            <IonIcon slot="start" icon={closeOutline}></IonIcon>
          </IonItemOption>
        </IonItemOptions>
        {/* -------- */}
        <IonItem
          className={styles.container}>
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
                <h2 className="ion-text-wrap">{todo.title}</h2>
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
          <IonButton onClick={() => callbackComplete(todo)} slot="end">
            {
              todo.completed ?
                "Completato"
                :
                "Completa"
            }
          </IonButton>
        </IonItem>
        {/* --------- */}
        <IonItemOptions side="end">
          <IonItemOption
            onClick={() => handleOpenTodo()}
            color="primary"
            expandable
          >

            <IonIcon slot="end" icon={chevronForward}></IonIcon>
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </>
  );
};

export default ItemUserTodo;
