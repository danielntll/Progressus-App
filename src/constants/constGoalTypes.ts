import {
  bulb,
  construct,
  fitness,
  flame,
  heartHalf,
  library,
} from "ionicons/icons";

export const constGoalTypes = {
  ita: [
    {
      title: "Sport",
      icon: fitness,
      color: "red",
      description:
        "Qualsiasi attivià fisica, dal semplice stretching alla corsa.",
    },
    {
      title: "Attività",
      icon: construct,
      color: "orange",
      description: "Qualsiasi attività manuale.",
    },
    {
      title: "Svago",
      icon: flame,
      color: "yellow",
      description: "Qualsiasi attività manuale.",
    },
    {
      title: "Salute",
      icon: heartHalf,
      color: "green",
      description: "Salute e bellezza.",
    },
    {
      title: "Intelletto",
      icon: bulb,
      color: "sky",
      description: "Salute e bellezza.",
    },
    {
      title: "Cultura",
      icon: library,
      color: "purple",
      description: "Salute e bellezza.",
    },
  ],
};
