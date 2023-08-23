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
import { TodosContext } from "../../utils/reducers/reducerTodo";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Redirect, useHistory } from "react-router";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";


import styles from "./PageLogin.module.css";
import { text } from "./text";


const PageLogin: React.FC = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const { stateTodos, dispatchTodos } = useContext(TodosContext);
  const language: typeAviableLanguages = stateLanguage;

  const history = useHistory();
  // CONDITIONS --------------------
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState({ loading: false, error: false });
  // FUNCTIONS ---------------------
  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await signInWithEmailAndPassword(auth, email, password).then(() => {

      });
      console.log("credenziali:", credential);

    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log("error:", error);
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
                onIonChange={(event) => setEmail(event.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput type="password" value={password}
                onIonChange={(event) => setPassword(event.detail.value!)} />
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
