import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/index";
import ItemStatusFilter from "../item-status-filter/index";
import TodoList from "../todo-list/todo-list";
import ItemAddForm from "./../item-add-form/index";

import "./app.css";

export default class App extends Component {
  state = {
    todoData: [
      { label: "Drink Milk", important: false, id: 1 },
      { label: "Drink Vodka", important: true, id: 2 },
      { label: "Have a lunch", important: false, id: 3 }
    ]
  };

  onDeleted = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData
      };
    });
  };

  addItem = () => {
    const item = {
      label: `New Item ${Date.now()}`,
      important: false,
      id: `${Date.now()}`
    };
    this.setState(({ todoData }) => {
      const newData = [...todoData, item];

      return {
        todoData: newData
      };
    });
  };

  render() {
    const { todoData } = this.state;

    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList todos={todoData} onDeleted={this.onDeleted} />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
