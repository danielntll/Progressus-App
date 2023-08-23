import { typeReducerTodoActions } from "../../types/typeReducerTodoActions";
import { typeTodo } from "../../types/typeTodo";

export const reducerTodo = (state: any, action: typeReducerTodoActions) => {
  switch (action.type) {
    case "ADD":
      // LOCAL
      const auxTodos_ADD: typeTodo[] = [...state];
      auxTodos_ADD.push(action.refTodo);
      // SERVER
      // here
      return auxTodos_ADD;

    case "DELETE":
      // LOCAL
      const auxTodos_DELETE: typeTodo[] = [...state].filter(
        (todos: typeTodo) => todos.todoUID !== action.refTodo.todoUID
      );
      // SERVER
      // here
      return auxTodos_DELETE;
    case "COMPLETE":
      // LOCAL
      const auxTodos_COMPLETE: typeTodo[] = [...state];
      const index = auxTodos_COMPLETE.findIndex(
        (todos: typeTodo) => todos.todoUID === action.refTodo.todoUID
      );
      auxTodos_COMPLETE[index].completed = true;
      auxTodos_COMPLETE[index].completedDate = new Date();
      // SERVER
      // here
      return auxTodos_COMPLETE;
    case "NOT_COMPLETE":
      // LOCAL
      const auxTodos_NOT_COMPLETE: typeTodo[] = [...state];
      const indexNot = auxTodos_NOT_COMPLETE.findIndex(
        (todos: typeTodo) => todos.todoUID === action.refTodo.todoUID
      );
      auxTodos_NOT_COMPLETE[indexNot].completed = false;
      auxTodos_NOT_COMPLETE[indexNot].completedDate = null;
      // SERVER
      // here
      return auxTodos_NOT_COMPLETE;

    case "UPDATE":
      // LOCAL
      const auxTodos_UPDATE: typeTodo[] = [...state];
      const indexUPDATE = auxTodos_UPDATE.findIndex(
        (todos: typeTodo) => todos.todoUID === action.refTodo.todoUID
      );
      auxTodos_UPDATE[indexUPDATE] = action.refTodo!;
      // SERVER
      // here
      return auxTodos_UPDATE;

    default:
      console.log(state);
      return state;
  }
};
