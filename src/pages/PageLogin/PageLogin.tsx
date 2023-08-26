import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RoutesApp } from "../../routes";

import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { useContext, useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";


import styles from "./PageLogin.module.css";
import { text } from "./text";


const PageLogin: React.FC = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;

  // CONDITIONS --------------------
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState({ loading: false, error: false });
  // FUNCTIONS ---------------------
  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setStatus({ loading: false, error: true });
    }
  };

  // RETURN ------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{RoutesApp.pageLogin.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{RoutesApp.pageLogin.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* INIT CONTENT ---------------------- */}
        <div className={styles.pageContainer}>
          <IonList>
            <IonItem>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput type="email" value={email}
                onIonInput={(event) => setEmail(event.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput type="password" value={password}
                onIonInput={(event) => setPassword(event.detail.value!)} />
            </IonItem>
          </IonList>

          <IonButton
            onClick={handleLogin}
            expand='block'>
            Login
          </IonButton>

          {status.error &&
            <IonText color="danger">
              Credenziali non valide.
            </IonText>
          }

          <IonButton
            routerLink='/register'
            expand='block'
            fill="clear"
          >
            Registrati
          </IonButton>

          <IonLoading isOpen={status.loading}></IonLoading>

        </div>
        {/* END CONTENT ----------------------- */}
      </IonContent>
    </IonPage>
  );
};

export default PageLogin;
