import { typeTodo } from "./typeTodo";

export type typeReducerTodoActions = {
  type:
    | "ADD"
    | "DELETE"
    | "COMPLETE"
    | "NOT_COMPLETE"
    | "UPDATE"
    | "INITIALIZE_DATA";
  refTodo?: typeTodo;
  initialize?: typeTodo[];
};
