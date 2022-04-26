import React from "react";
import "./TodoList.css";

function TodoList({ todos, filter, deleteItem, setComplete }) {
  return (
    <div>
      {todos

        .sort((a, b) => b.timeInSeconds - a.timeInSeconds)
        .filter((todo) => {
          return (
            filter === "all" ||
            (filter === "open" && !todo.completed) ||
            (filter === "done" && todo.completed)
          );
        })
        .map((todo) => (
          <li className="card" key={todo.id}>
            <div className="cardText">
              <p className={todo.completed ? "completed todoTime" : "todoTime"}>
                {" "}
                {todo.timestamp}
              </p>
              <p className={todo.completed ? "completed todoText" : "todoText"}>
                {" "}
                {todo.text}
              </p>
            </div>
            <div className="cardButtonContainer">
              <button
                className="trashButton"
                onClick={() => deleteItem(todo.id)}
              >
                <i className=" trash fa-solid fa-trash-can"></i>
              </button>
              <button
                className="tickButton"
                onClick={() => setComplete(todo.id)}
              >
                <i className="tick fa-solid fa-check"></i>
              </button>
            </div>
          </li>
        ))}
    </div>
  );
}

export default TodoList;
