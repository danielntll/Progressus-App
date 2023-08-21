import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styles from "./PageTodos.module.css";
import { PageTodosText } from "./PageTodos-text";
import { RoutesApp } from "../../routes";

const PageTodos: React.FC = () => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
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
        <div className={styles.pageContainer}></div>
        {/* END CONTENT ----------------------- */}
      </IonContent>
    </IonPage>
  );
};

export default PageTodos;
