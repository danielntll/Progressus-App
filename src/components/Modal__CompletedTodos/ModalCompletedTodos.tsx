import { useContext, useEffect, useState } from "react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import styles from "./ModalCompletedTodos.module.css";
import { text } from "./text";
import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { typeTodo } from "../../types/typeTodo";
import { firebaseTodoActions } from "../../firebase/firebaseTodoActions";
import { useAuthContext } from "../../firebase/auth";
import ItemUserTodo from "../Item__UserTodo/ItemUserTodo";
import { checkmark, close, skullOutline, warningOutline } from "ionicons/icons";

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
  const [presentToast] = useIonToast();
  // CONDITIONS --------------------
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState<boolean>(false);
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);
  const [todoToDelete, setTodoToDelete] = useState<typeTodo>();
  // FUNCTIONS ---------------------
  useEffect(() => {
    if (isOpen) {
      handleGetData()
    }
  }, [isOpen]);

  const handleGetData = async () => {
    console.log("handleGetData: ", dailyCompleted);
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


  const callbackDelete = (todo: typeTodo) => {
    console.log("handleUpdateTodoDeleted");
    setTodoToDelete(todo);
    setIsAlertDeleteOpen(true);
  }

  const handleDelete = () => {
    try {
      firebaseTodoActions.DELETE_TODO(userUID!, todoToDelete!, selectedDate).then(() => {
        console.log("Eliminato con successo");
        setIsAlertDeleteOpen(false);
      }).catch((e) => {
        toast.danger();
      });
    } catch (error) {

    }
  }

  const toast = {
    success: () => {
      presentToast({
        message: text[language].toastSuccess,
        duration: 2000,
        color: "success",
        position: "top",
        icon: checkmark,
        buttons: [
          {
            text: text[language].closeToast
          }
        ]
      });
    },
    warning: () => {
      presentToast({
        message: text[language].toastWarning,
        duration: 2000,
        color: "warning",
        position: "top",
        icon: warningOutline,
        buttons: [
          {
            icon: close,
          }
        ]
      });
    },
    danger: () => {
      presentToast({
        message: text[language].toastDanger,
        duration: 2000,
        color: "danger",
        position: "top",
        icon: skullOutline,
        buttons: [
          {
            icon: close,
          }
        ]
      });
    }
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }
  // RETURN ------------------------
  return (
    <>
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
      </IonModal>
      <IonAlert
        header={text[language].alertTitle}
        message={text[language].alertMessage}
        isOpen={isAlertDeleteOpen}
        onDidDismiss={() => setIsAlertDeleteOpen(false)}
        buttons={[
          {
            text: text[language].alertCancel,
            role: 'cancel',
          },
          {
            text: text[language].alertConfirm,
            role: 'confirm',
            handler: () => {
              handleDelete();
            },
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default ModalCompletedTodos;
