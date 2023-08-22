import { IonButton, IonCard, IonIcon, IonInput, useIonToast } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import styles from "./InputAddTodo.module.css";
import { text } from "./text";
import { add, checkmark, close, cogOutline, skullOutline, warningOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import { typeTodoCategory } from "../../types/typeTodoCategory";
import ModalTodoOptions from "../Modal__TodoOptions/ModalTodoOptions";
import { defaultTodo, typeTodo } from "../../types/typeTodo";
import { montsStrict } from "../../text/textDays&Months";

interface ContainerProps {
  selectedDate: Date
  setSelectedDate: (newDate: Date) => void;
}

const InputAddTodo: React.FC<ContainerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
  const [presentToast] = useIonToast();

  // CONDITIONS --------------------
  const [todo, setTodo] = useState<typeTodo>(defaultTodo);


  const [isModalOptionsOpen, setIsModalOptionsOpen] = useState<boolean>(false);
  // FUNCTIONS ---------------------

  const handleSetTitle = (title: string) => {
    setTodo(({ ...todo, title: title }))
  }



  const handleCreateTodo = () => {
    if (!todo.title) {
      toast.warning();
    } else {
      try {
        toast.success();
        setTodo(defaultTodo);
      } catch (error) {
        toast.danger();
      }
    }
  }



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
            icon: cogOutline,
            text: text[language].buttonModifyTodo
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
        handleCreateTodo={handleCreateTodo}
        selectedDate={selectedDate}
      />

    </>
  )
};

export default InputAddTodo;
