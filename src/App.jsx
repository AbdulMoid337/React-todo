import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./Context/todoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((elem) => elem.id !== id));
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((elem) => (elem.id === id ? todo : elem)));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((elem) =>
        elem.id === id ? {...elem, completed: !elem.completed  } : elem
      )
    );
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const todos = JSON.parse(storedTodos);
        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error) {
        console.error("Error parsing stored todos:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
<TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
{todos.map((elem) => (
  <div key={elem.id} className="w-full">
    <TodoItem todo={elem} />  
  </div>
))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
