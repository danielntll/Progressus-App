import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { text } from "./text";
import { typeTodo } from "../../types/typeTodo";
import { add, alertCircleOutline, closeCircle, removeCircleOutline } from "ionicons/icons";

import { montsStrict } from "../../text/textDays&Months";

interface ContainerProps {
  isModalOptionsOpen: boolean,
  setIsModalOptionsOpen: (value: boolean) => void;
  todo: typeTodo,
  setTodo: (values: typeTodo) => void;
  handleCreateTodo: () => void;
  selectedDate: Date,
}

const ModalTodoOptions: React.FC<ContainerProps> = ({
  isModalOptionsOpen,
  setIsModalOptionsOpen,
  todo,
  setTodo,
  handleCreateTodo,
  selectedDate
}) => {
  // VARIABLES ---------------------
  const language: typeAviableLanguages = "ita";
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------

  const handleCallbackCreateToDo = () => {
    handleCreateTodo();
  }
  // RETURN ------------------------
  return (
    <>
      <IonModal isOpen={isModalOptionsOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                color={"medium"}
                onClick={() => setIsModalOptionsOpen(false)}>
                {text[language].close}
              </IonButton>
            </IonButtons>
            <IonTitle>{text[language].title}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                color={"success"}
                fill="solid"
                onClick={() => handleCallbackCreateToDo()}>
                <IonIcon icon={add} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList inset>
            {/* TITLE */}
            <IonItem>
              <IonButton
                className="padding-right-small"
                size="small"
                fill="clear"
                onClick={() => setTodo({ ...todo, title: "" })}
              >
                <IonIcon
                  color={todo.title ? "medium" : "warning"}
                  icon={todo.title ? closeCircle : alertCircleOutline}
                />
              </IonButton>
              <IonInput
                value={todo.title}
                onIonInput={(e) => setTodo({ ...todo, title: e.target.value!.toString() })}
                label={
                  text[language].today +
                  " " +
                  selectedDate.getDate() +
                  " " +
                  montsStrict[language][selectedDate.getMonth()]
                }
                placeholder={text[language].enterText}
                labelPlacement="stacked"
              />

            </IonItem>
            {/* DESCRIPTION */}
            <IonItem>
              <IonButton
                className="padding-right-small"
                size="small"
                fill="clear"
                onClick={() => setTodo({ ...todo, description: "" })}
              >
                <IonIcon
                  className="icon-margin-right"
                  color={"medium"}
                  icon={todo.description ? closeCircle : removeCircleOutline}
                />
              </IonButton>
              <IonTextarea
                value={todo.description}
                onIonInput={(e) => setTodo({ ...todo, description: e.target.value!.toString() })}
                label={text[language].description}
                placeholder={text[language].descriptionPlaceholder}
                labelPlacement="stacked"
              />
            </IonItem>
          </IonList>

          {/* DATA PICKER --------------- */}
          <IonList inset>
            <IonItem>
              <IonButton
                className="padding-right-small"
                size="small"
                fill="clear"
                onClick={() => setTodo({ ...todo, deadlineDate: null })}
              >

                <IonIcon
                  className="icon-margin-right"
                  color={"medium"}
                  icon={todo.deadlineDate ? closeCircle : removeCircleOutline}
                />
              </IonButton>
              <IonLabel>
                <div className="label-text sc-ion-textarea-ios">
                  {text[language].deadlineDate}
                </div>
              </IonLabel>
              <IonDatetimeButton
                datetime="datetime"
                time-target={selectedDate}
              />
            </IonItem>
          </IonList>



        </IonContent>
      </IonModal >
      {/* ---------- EXTRAS ------------ */}
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id="datetime"
          onIonChange={(e) => setTodo({ ...todo, deadlineDate: e.target.value! })}
        ></IonDatetime>
      </IonModal>

    </>);
};

export default ModalTodoOptions;
