import { home, homeOutline, list, listOutline } from "ionicons/icons";

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
};
