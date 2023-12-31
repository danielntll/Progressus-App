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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RoutesApp } from "../../routes";

import { LanguageContext } from "../../utils/reducers/reducerLanguage";
import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";


import styles from "./PageRegister.module.css";
import { text } from "./text";
import { typeAviableLanguages } from "../../types/typeAviableLanguages";
import { typeUser } from "../../types/typeUser";
import { firebaseUserActions } from "../../firebase/firebaseUserActions";



const PageRegister: React.FC = () => {
  // VARIABLES ---------------------
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;

  // CONDITIONS --------------------
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState({ loading: false, error: false });

  // FUNCTIONS ---------------------
  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      await createUserWithEmailAndPassword(auth, email, password).then((resp) => {
        console.log(resp.user.email);
        console.log(resp.user.uid);

        const objUser: typeUser = {
          UID: resp.user.uid,
          email: resp.user.email!,
          name: "",
          imageUrl: `https://robohash.org/${Date.now()}.png`,
          createdAt: Date.now(),
          description: ""
        }

        firebaseUserActions.CREATE(objUser).then(() => {
          console.log("PageRegister User creato.")
        }).catch((error) => {
          setStatus({ loading: false, error: true });
          console.log("error:", error);
        });

      })
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
          <IonTitle>{text[language].pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{RoutesApp.pageRegister.title}</IonTitle>
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
            onClick={handleRegister}
            expand='block'>
            Create Account
          </IonButton>
          <IonButton
            routerLink='/login'
            expand='block'
            fill="clear"
          >
            Hai già un account?
          </IonButton>
          <IonLoading isOpen={status.loading}></IonLoading>

        </div>
        {/* END CONTENT ----------------------- */}
      </IonContent>
    </IonPage>
  );
};

export default PageRegister;
