import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styles from "./PageHome.module.css";
import { PageHomeText } from "./PageHome-text";
import { RoutesApp } from "../../routes";

const PageHome: React.FC = () => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{RoutesApp.pageHome.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{RoutesApp.pageHome.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* INIT CONTENT ---------------------- */}
        <div className={styles.pageContainer}></div>
        {/* END CONTENT ----------------------- */}
      </IonContent>
    </IonPage>
  );
};

export default PageHome;
