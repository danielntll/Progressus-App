import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styles from "./DefaultPage.module.css";
import { DefautlPageText } from "./DefautlPage-text";

const DefaultPage: React.FC = () => {
  // VARIABLES ---------------------
  // CONDITIONS --------------------
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{DefautlPageText.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{DefautlPageText.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* INIT CONTENT ---------------------- */}
        <div className={styles.pageContainer}></div>
        {/* END CONTENT ----------------------- */}
      </IonContent>
    </IonPage>
  );
};

export default DefaultPage;
