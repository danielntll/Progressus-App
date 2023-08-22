import { typeTodoCategory } from "./typeTodoCategory";

export type typeTodo = {
  todoUID: string;
  userUID: string;
  title: string;
  description: string | null;
  createdAt: string;
  endDate: string | null;
  completed: boolean;
  attachments: string[] | null;
  categoryType: typeTodoCategory;
  relatedCategoryUID: string;
};
