import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import PageHome from "./pages/PageHome/PageHome";
import { RoutesApp } from "./routes";
import { useEffect, useReducer, useState } from "react";
import PageTodos from "./pages/PageTodos/PageTodos";
import { TodosContext, reducerTodo } from "./utils/reducers/reducerTodo";
import { LanguageContext, reducerLanguage } from "./utils/reducers/reducerLanguage";
import { AuthContext, useAuthInit } from "./firebase/auth";
import PageLogin from "./pages/PageLogin/PageLogin";
import PageRegister from "./pages/PageRegister/PageRegister";
import { firebaseTodoActions } from "./firebase/firebaseTodoActions";
import { typeTodo } from "./types/typeTodo";


setupIonicReact();

const App: React.FC = () => {
  // VARIABLES ---------------------
  const { auth, loading } = useAuthInit();
  // CONDITIONS --------------------

  const [currentTab, setCurrentTab] = useState<string>("");
  const [stateTodos, dispatchTodos] = useReducer(reducerTodo, []);
  const [stateLanguage, dispatchLanguage] = useReducer(reducerLanguage, "ita");

  // FUNCTIONS ---------------------
  useEffect(() => {
    console.log("TODOS STATE : ", stateTodos);
  }, [stateTodos]);

  useEffect(() => {
    // INITIALIZE TASKS -----
    if (auth) firebaseTodoActions.INITIALIZE(auth.userUID!).then((todos: typeTodo[]) => {
      dispatchTodos({
        type: "INITIALIZE_DATA",
        initialize: todos,
      })
    });
  }, [auth]);


  // signOut(getAuth());

  const authRoutes = (
    <>
      <Route exact path={RoutesApp.pageHome.path}>
        <Redirect to={RoutesApp.pageLogin.path} />
      </Route>
      <Route exact path={RoutesApp.pageTodos.path}>
        <Redirect to={RoutesApp.pageLogin.path} />
      </Route>
      <Route exact path="/">
        <Redirect to={RoutesApp.pageLogin.path} />
      </Route>
      {/* ------------------------------ */}
      <Route exact path={RoutesApp.pageLogin.path}>
        <PageLogin />
      </Route>
      <Route exact path={RoutesApp.pageRegister.path}>
        <PageRegister />
      </Route>
    </>
  )

  const routes = (
    <>
      <Route exact path={RoutesApp.pageLogin.path}>
        <Redirect to={RoutesApp.pageHome.path} />
      </Route>
      <Route exact path={RoutesApp.pageRegister.path}>
        <Redirect to={RoutesApp.pageHome.path} />
      </Route>
      <Route exact path="/">
        <Redirect to={RoutesApp.pageHome.path} />
      </Route>
      <Route exact path="/">
        <Redirect to={RoutesApp.pageHome.path} />
      </Route>

      <Route exact path={RoutesApp.pageHome.path}>
        <PageHome />
      </Route>
      <Route exact path={RoutesApp.pageTodos.path}>
        <PageTodos />
      </Route>
    </>
  )

  if (loading) {
    return <IonLoading isOpen={loading} />;
  }

  // RETURN ------------------------
  return (
    <IonApp>
      <IonReactRouter>
        <AuthContext.Provider value={auth!}>
          <LanguageContext.Provider value={{ stateLanguage, dispatchLanguage }}>
            <TodosContext.Provider value={{ stateTodos, dispatchTodos }}>
              {auth?.loggedIn ?
                <IonTabs>
                  <IonRouterOutlet>
                    {routes}
                  </IonRouterOutlet>
                  {/* TABBAR ---------------- */}
                  <IonTabBar
                    onIonTabsDidChange={(e) => setCurrentTab(e.detail.tab)}
                    slot="bottom"
                  >
                    {/* INIT TAB BUTTONS ----------- */}
                    <IonTabButton
                      tab={RoutesApp.pageHome.title}
                      href={RoutesApp.pageHome.path}
                    >
                      <IonIcon
                        aria-hidden="true"
                        icon={
                          currentTab === RoutesApp.pageHome.title
                            ? RoutesApp.pageHome.icon.active
                            : RoutesApp.pageHome.icon.notActive
                        }
                      />
                      <IonLabel>{RoutesApp.pageHome.title}</IonLabel>
                    </IonTabButton>
                    <IonTabButton
                      tab={RoutesApp.pageTodos.title}
                      href={RoutesApp.pageTodos.path}
                    >
                      <IonIcon
                        aria-hidden="true"
                        icon={
                          currentTab === RoutesApp.pageTodos.title
                            ? RoutesApp.pageTodos.icon.active
                            : RoutesApp.pageTodos.icon.notActive
                        }
                      />
                      <IonLabel>{RoutesApp.pageTodos.title}</IonLabel>
                    </IonTabButton>
                    {/* END TAB BUTTONS ------------ */}
                  </IonTabBar>
                </IonTabs>
                :
                <IonRouterOutlet>
                  {authRoutes}
                </IonRouterOutlet>
              }
            </TodosContext.Provider>
          </LanguageContext.Provider>
        </AuthContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
