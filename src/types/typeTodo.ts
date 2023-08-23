import { typeTodoCategory } from "./typeTodoCategory";

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
  categoryType: "Daily",
  relatedCategoryUID: "",
};
