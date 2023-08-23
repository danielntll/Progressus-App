import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import styles from "./PageHome.module.css";
import { RoutesApp } from "../../routes";
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { Redirect, useHistory } from "react-router";
import { useAuth } from "../../firebase/auth";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";

const PageHome: React.FC = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
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
