import { IonButton, IonCard, IonIcon, IonInput, useIonToast } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./InputAddTodo.module.css";
import { text } from "./text";
import { add, checkmark, close, cogOutline, skullOutline, warningOutline } from "ionicons/icons";
import { useCallback, useContext, useState } from "react";

import ModalTodoOptions from "../Modal__TodoOptions/ModalTodoOptions";
import { defaultTodo, typeTodo } from "../../types/typeTodo";
import { montsStrict } from "../../text/textDays&Months";

import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { firebaseTodoActions } from "../../firebase/firebaseTodoActions";
import { useAuthContext } from "../../firebase/auth";

interface ContainerProps {
  selectedDate: Date
}

const InputAddTodo: React.FC<ContainerProps> = ({
  selectedDate,
}) => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;

  const [presentToast] = useIonToast();

  // CONDITIONS --------------------
  const [todo, setTodo] = useState<typeTodo>(defaultTodo);


  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState<boolean>(false);
  // FUNCTIONS ---------------------

  const handleSetTitle = (title: string) => {
    setTodo(({ ...todo, title: title }))
  }



  const handleCreateTodo = useCallback(() => {
    if (!todo.title) {
      toast.warning();
    } else {
      try {
        //CONFIG NEW ---------------
        const todoToUpload = todo;
        todoToUpload.createdAt = Date.now();
        todoToUpload.userUID = userUID!;

        //SERVER
        firebaseTodoActions.CREATE(todoToUpload, userUID!, selectedDate, todoToUpload.categoryType.name)
          .catch(() => {
            toast.danger();
          }).then(() => {
            //RESET & FEEDBACK ---------
            setTodo(defaultTodo);
            toast.success();
          })
      } catch (error) {
        toast.danger();
      }
    }
  }, [todo]);



  const handleOpenTodoOptions = () => {
    setIsModalOptionsOpen(true);
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
    <>
      <IonCard className={styles.InputAddTodo__card}>
        <IonButton
          onClick={() => handleOpenTodoOptions()}
          color={"primary"}
          fill="clear"
          size="small"
        >
          <IonIcon icon={cogOutline} />
        </IonButton>
        <IonInput
          onIonInput={(e) => {
            handleSetTitle(e.target.value!.toString())
          }}
          value={todo.title}
          label={
            text[language].today +
            " " +
            selectedDate.getDate() +
            " " +
            montsStrict[language][selectedDate.getMonth()]
          }
          placeholder={text[language].enterText}
          labelPlacement="stacked"
          clearInput={true}
        />
        <IonButton
          onClick={() => handleCreateTodo()}
          color={"primary"}
          fill="solid"
        >
          <IonIcon icon={add} />
        </IonButton>
      </IonCard>

      {/*----------------  EXTRA -------------- */}
      <ModalTodoOptions
        isModalOptionsOpen={isModalOptionsOpen}
        setIsModalOptionsOpen={setIsModalOptionsOpen}
        todo={todo}
        setTodo={setTodo}
        callback={handleCreateTodo}
        selectedDate={selectedDate}
      />

    </>
  )
};

export default InputAddTodo;
