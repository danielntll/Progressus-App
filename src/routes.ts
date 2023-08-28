import {
  home,
  homeOutline,
  list,
  listOutline,
  logIn,
  logInOutline,
  trophy,
  trophyOutline,
} from "ionicons/icons";

export const RoutesApp = {
  pageDefault: {
    path: "/default",
    title: "Default Page",
    icon: {
      active: home,
      notActive: homeOutline,
    },
  },
  pageHome: {
    path: "/home",
    title: "Home",
    icon: {
      active: home,
      notActive: homeOutline,
    },
  },
  pageTodos: {
    path: "/todos",
    title: "Todos",
    icon: {
      active: list,
      notActive: listOutline,
    },
  },
  pageLogin: {
    path: "/login",
    title: "Login",
    icon: {
      active: logIn,
      notActive: logInOutline,
    },
  },
  pageRegister: {
    path: "/register",
    title: "Register",
    icon: {
      active: logIn,
      notActive: logInOutline,
    },
  },
  pageGoals: {
    path: "/goals",
    title: "Goals",
    icon: {
      active: trophy,
      notActive: trophyOutline,
    },
  },
};
