import { useEffect, useState } from "react";
import TodoList from "../components/todoList/TodoList";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        text: inputText,
        completed: false,
        id: Math.random() * 1000,
        timestamp: new Date().toLocaleDateString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        timeInSeconds: new Date().getTime(),
      },
    ]);
    setInputText("");
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const deleteItem = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const setComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <header>
        <h1>Your Todolist</h1>
        <div className="statusBox">
          <h3>{todos.length} total</h3>
          <h3>{todos.filter((todo) => todo.completed).length} completed</h3>
          <h3>{todos.filter((todo) => !todo.completed).length} open</h3>
        </div>
      </header>
      <div className="inputContainer">
        <input onChange={handleInput} value={inputText}></input>
        <button className="addButton" onClick={addTodo}>
          <i className="fas fa-2x fa-plus-square"></i>
        </button>
        <div className="select">
          <select
            onChange={filterHandler}
            name="todos"
            className="filter-todos"
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="open">Open</option>
          </select>
        </div>
      </div>
      <TodoList
        todos={todos}
        filter={filter}
        deleteItem={deleteItem}
        setComplete={setComplete}
      />
    </>
  );
}

export default App;
