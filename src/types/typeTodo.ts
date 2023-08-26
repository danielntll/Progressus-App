import { calendarOutline } from "ionicons/icons";
import { typeTodoCategory } from "./typeTodoCategory";
import { constColors } from "../constants/colors";

export type typeTodo = {
  todoUID: string;
  userUID: string;
  title: string;
  description: string | null;
  createdAt: number | null;
  deadlineDate: string | string[] | null;
  completedDate: Date | null;
  completed: boolean;
  attachments: string[] | null;
  categoryType: typeTodoCategory;
  relatedCategoryUID: string;
};

export const defaultTodo: typeTodo = {
  todoUID: "",
  userUID: "",
  title: "",
  description: "",
  createdAt: null,
  deadlineDate: null,
  completedDate: null,
  completed: false,
  attachments: null,
  categoryType: {
    name: "Daily",
    icon: calendarOutline,
    color: constColors.primary,
  },
  relatedCategoryUID: "",
};
