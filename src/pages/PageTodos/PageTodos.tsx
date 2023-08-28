import {
  IonAlert,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";

import styles from "./PageTodos.module.css";
import { RoutesApp } from "../../routes";
import SliderCalendar from "../../components/Slider__Calendar/SliderCalendar";
import InputAddTodo from "../../components/Input__AddTodo/InputAddTodo";
import { useCallback, useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import ListUserTodos from "../../components/List__UserTodos/ListUserTodos";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { typeTodo } from "../../types/typeTodo";
import { firebaseTodoActions } from "../../firebase/firebaseTodoActions";
import { useAuthContext } from "../../firebase/auth";
import { useTodosContext } from "../../context/TodosContextProvider";
import ListTodosStatistics from "../../components/List__TodosStatistics/ListTodosStatistics";
import ModalTodoOptions from "../../components/Modal__TodoOptions/ModalTodoOptions";
import { checkmark, close, skullOutline, warningOutline } from "ionicons/icons";

import { text } from "./text";


const PageTodos: React.FC = () => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { dailyTodos, setAuxSelectedDay, auxSelectedDay, dailyCompleted } = useTodosContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;


  const [presentToast] = useIonToast();
  // CONDITIONS --------------------
  const [selectedDate, setSelectedDate] = useState<Date>(auxSelectedDay);
  const [isModalModifyTodoOpen, setIsModalModifyTodoOpen] = useState<boolean>(false);
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState<boolean>(false);
  const [todoToModify, setTodoToModify] = useState<typeTodo>();

  // FUNCTIONS ---------------------
  useEffect(() => {
    setAuxSelectedDay(selectedDate)
  }, [selectedDate]);

  const handleCompleteTodo = useCallback((todo: typeTodo) => {
    try {
      console.log("handleCompleteTodo : ", selectedDate);
      firebaseTodoActions.COMPLETE(todo, userUID!, selectedDate, todo.categoryType.name);

    } catch (error) {

    }
  }, [selectedDate]);

  const handleModifyTodo = useCallback((todo: typeTodo) => {
    setTodoToModify(todo);
    setIsModalModifyTodoOpen(true);
  }, [selectedDate]);

  const handleUpdateTodoModified = () => {
    console.log("handleUpdateTodoModified");
    try {
      firebaseTodoActions.UPDATE_TODO(userUID!, todoToModify!).then(() => {
        console.log("Modificato con successo");
        toast.success();
        setIsModalModifyTodoOpen(false);
      }).catch((e) => {
        toast.danger();
      });
    } catch (error) {

    }
  }

  const handleDeleteTodo = useCallback((todo: typeTodo) => {
    setTodoToModify(todo);
    setIsAlertDeleteOpen(true);
  }, [selectedDate]);

  const handleUpdateTodoDeleted = () => {
    console.log("handleUpdateTodoDeleted");
    try {
      firebaseTodoActions.DELETE_TODO(userUID!, todoToModify!).then(() => {
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

  // RETURN ------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{RoutesApp.pageTodos.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{RoutesApp.pageTodos.title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* INIT CONTENT ---------------------- */}
        <div className={styles.pageContainer}>
          <SliderCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <InputAddTodo
            selectedDate={selectedDate}
          />
          {/* ---------- */}
          <ListUserTodos
            callbackComplete={(todo: typeTodo) => handleCompleteTodo(todo)}
            callbackModify={(todo: typeTodo) => handleModifyTodo(todo)}
            callbackDelete={(todo: typeTodo) => handleDeleteTodo(todo)}
            todos={dailyTodos}
            title={text[language].sectionTitle}
          />

          {/* -------------- */}

          <ListTodosStatistics
            selectedDate={selectedDate}
            dailyCompleted={dailyCompleted.completedUIDs}
          />
        </div>
        {/* END CONTENT ----------------------- */}
        {/* EXTRA ----------------------------- */}
        {todoToModify ?
          <ModalTodoOptions
            isModalOptionsOpen={isModalModifyTodoOpen}
            setIsModalOptionsOpen={setIsModalModifyTodoOpen}
            todo={todoToModify}
            setTodo={setTodoToModify}
            callback={() => handleUpdateTodoModified()}
            selectedDate={selectedDate}
          />
          : null
        }
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
                handleUpdateTodoDeleted();
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default PageTodos;
