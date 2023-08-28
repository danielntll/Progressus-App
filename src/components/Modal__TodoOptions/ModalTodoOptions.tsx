import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { text } from "./text";
import { typeTodo } from "../../types/typeTodo";
import { alertCircleOutline, closeCircle, cloudUploadOutline, removeCircleOutline } from "ionicons/icons";

import { montsStrict } from "../../text/textDays&Months";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { useContext } from "react";

import styles from './ModalTodoOptions.module.css';



interface ContainerProps {
  isModalOptionsOpen: boolean,
  setIsModalOptionsOpen: (value: boolean) => void;
  todo: typeTodo,
  setTodo: (values: typeTodo) => void;
  callback: () => void;
  selectedDate: Date,
}

const ModalTodoOptions: React.FC<ContainerProps> = ({
  isModalOptionsOpen,
  setIsModalOptionsOpen,
  todo,
  setTodo,
  callback,
  selectedDate
}) => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  const handleCallbackCreateToDo = () => {
    callback();
  }
  // RETURN ------------------------
  return (
    <>
      <IonModal
        isOpen={isModalOptionsOpen}
      >
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
                <span className={"padding-right-small"}>
                  {text[language].save}
                </span>
                <IonIcon icon={cloudUploadOutline} />
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
                  color={todo.title ? "danger" : "warning"}
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
                  color={todo.description ? "danger" : "medium"}
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
                  color={todo.deadlineDate ? "danger" : "medium"}
                  icon={todo.deadlineDate ? closeCircle : removeCircleOutline}
                />
              </IonButton>
              <IonLabel>
                <div className="label-text sc-ion-textarea-ios">
                  {text[language].deadlineDate}:
                  <span className={styles.ModalTodoOptions__span}>
                    {todo.deadlineDate ? text[language].deadlineDateSelected : text[language].deadlineDateNotSelected}
                  </span>
                </div>
              </IonLabel>
            </IonItem>
          </IonList>

          <div className={styles.ModalTodoOptions__ContainerIonDatetime}>


            <IonDatetime
              className={styles.ModalTodoOptions__IonDatetime}
              id="datetime"
              min={selectedDate.toISOString()}
              onIonChange={(e) => setTodo({ ...todo, deadlineDate: e.target.value! })}
            >
              <span slot="time-label">{text[language].calendar}</span>
            </IonDatetime>
          </div>




        </IonContent>
      </IonModal >
      {/* ---------- EXTRAS ------------ */}
    </>);
};

export default ModalTodoOptions;
