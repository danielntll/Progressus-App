import { useContext, useEffect, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./ModalCompletedTodos.module.css";
import { text } from "./text";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import { firebaseTodoActions } from "../../firebase/firebaseTodoActions";
import { useAuthContext } from "../../firebase/auth";
import ItemUserTodo from "../Item__UserTodo/ItemUserTodo";

interface ContainerProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void;
  dailyCompleted: string[];
  selectedDate: Date,
}

const ModalCompletedTodos: React.FC<ContainerProps> = (
  {
    isOpen,
    setIsOpen,
    dailyCompleted,
    selectedDate,
  }
) => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);
  // FUNCTIONS ---------------------
  useEffect(() => {
    if (isOpen) {
      handleGetData()
    }
  }, [isOpen]);

  const handleGetData = async () => {
    console.log("handleGetData");
    if (dailyCompleted) {
      const auxCompletedTodos: any[] = [];
      const promiseCompleted = dailyCompleted?.map(async (UID: string) => {
        auxCompletedTodos.push(await firebaseTodoActions.READ(userUID!, UID));
      });
      Promise.all(promiseCompleted).then(() => {
        setCompletedTodos(auxCompletedTodos);
      })
    }
  }

  const callbackRemoveCompleted = (todoToRemove: typeTodo) => {
    console.log("callbackRemoveCompleted");
    setCompletedTodos((todos: typeTodo[]) => todos.filter((todo: typeTodo) => todo.todoUID !== todoToRemove.todoUID));
    firebaseTodoActions.REMOVE_COMPLETE(userUID!, todoToRemove, selectedDate)
  };
  const callbackModify = () => { };
  const callbackDelete = () => { }

  const handleCloseModal = () => {
    setIsOpen(false);
  }
  // RETURN ------------------------
  return (
    <IonModal
      isOpen={isOpen}
      className={styles.container}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => handleCloseModal()}>
              {text[language].closeModal}
            </IonButton>
          </IonButtons>
          <IonTitle>
            {text[language].title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {completedTodos?.map((todo: typeTodo, index: number) => {
          return (
            <ItemUserTodo
              callbackComplete={callbackRemoveCompleted}
              callbackModify={callbackModify}
              callbackDelete={callbackDelete}
              todo={todo}
              key={todo.todoUID + index} />
          )
        })}
      </IonContent>
    </IonModal>);
};

export default ModalCompletedTodos;
