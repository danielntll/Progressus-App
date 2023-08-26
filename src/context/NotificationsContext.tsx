import { createContext, useContext, useState } from "react";
import { LanguageContext } from "../utils/reducers/reducerLanguage";
import { typeAviableLanguages } from "../types/typeAviableLanguages";
import { useAuthContext } from "../firebase/auth";


type typeNotificationsContext = {
  likes: any[] | null,
  comments: any[] | null,
  followers: any[] | null
}


export const NotificationsContext = createContext<typeNotificationsContext>({
  likes: [],
  comments: [],
  followers: [],
});


export const useNotificationsContext = useContext(NotificationsContext);


export const NotificationsContextProvider = ({ children }: any) => {
  // VARIABLES ---------------------
  const { userUID } = useAuthContext();
  const { stateLanguage, dispatchLanguage } = useContext(LanguageContext);
  const language: typeAviableLanguages = stateLanguage;
  // CONDITIONS --------------------
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [followers, setFollowers] = useState([]);
  // FUNCTIONS ---------------------
  // RETURN ------------------------
  return (
    <NotificationsContext.Provider value={
      {
        likes,
        comments,
        followers
      }
    }>

      {children}

    </NotificationsContext.Provider>
  )
}