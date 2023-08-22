import { typeTodoCategory } from "./typeTodoCategory";

export type typeTodo = {
  todoUID: string;
  userUID: string;
  title: string;
  description: string | null;
  createdAt: string;
  deadlineDate: string | string[] | null;
  completedDate: string | null;
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
  createdAt: "",
  deadlineDate: null,
  completedDate: null,
  completed: false,
  attachments: null,
  categoryType: "Daily",
  relatedCategoryUID: "",
};
