import { createContext, useContext } from "react";
export const TodoContext = createContext({
  todos: [
    {
      id: 2,
      todo: "Assalmulaikum",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleTodo: (id) => {},
});

export const TodoProvider = TodoContext.Provider

 export const useTodo = () => {
    return useContext(TodoContext)
 }