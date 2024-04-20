import "./App.css";
import Header from "./myComponent/header";
import { Todos } from "./myComponent/todos";
import { Footers } from "./myComponent/footor";
import { AddTodo } from "./myComponent/addTodo";
import { About } from "./myComponent/about";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Initialize the state variable 'todos' with the value from localStorage or an empty array
let initTodo;
if (localStorage.getItem("todos") === null) {
  initTodo = [];
} else {
  initTodo = JSON.parse(localStorage.getItem("todos"));
}

function App() {
  // State variable 'todos' to store the list of todos
  const [todos, setTodos] = useState(initTodo);

  // Function to delete a todo
  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);

    // Filter out the todo to be deleted from the 'todos' array
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    console.log("deleted", todos);

    // Update the localStorage with the new 'todos' array
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Function to add a new todo
  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]); // Add the new todo to the 'todos' array
    console.log(myTodo);
  };

  // UseEffect hook to update the localStorage whenever the 'todos' array changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header title="My Todos List" searchBar={true} /> {/* Header component with title and search bar */}
                <AddTodo addTodo={addTodo} /> {/* AddTodo component to add a new todo */}
                <Todos todos={todos} onDelete={onDelete} /> {/* Todos component to display the list of todos */}
                <Footers /> {/* Footers component */}
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header /> {/* Header component without title and search bar */}
                <About /> {/* About component */}
                <Footers /> {/* Footers component */}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;