import React from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/index";
import ItemStatusFilter from "../item-status-filter/index";
import TodoList from "../todo-list/todo-list";

import "./app.css";

const App = () => {
  const todoData = [
    { label: "Drink Milk", important: false, id: 1 },
    { label: "Drink Vodka", important: true, id: 2 },
    { label: "Have a lunch", important: false, id: 3 }
  ];

  return (
    <div className="todo-app">
      <AppHeader />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>
      <TodoList todos={todoData} />
    </div>
  );
};

export default App;
