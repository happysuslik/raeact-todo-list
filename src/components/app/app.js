import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/index";
import ItemStatusFilter from "../item-status-filter/index";
import TodoList from "../todo-list/todo-list";
import ItemAddForm from "./../item-add-form/index";

import "./app.css";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Make coffee"),
      this.createTodoItem("Read the newspaper"),
      this.createTodoItem("Check mail")
    ],
    textSearch: "",
    filter: "all"
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  onDeleted = id => {
    this.setState(({ todoData }) => {
      const idx = this.findIndexItem(todoData, id);

      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData
      };
    });
  };

  addItem = label => {
    const item = this.createTodoItem(label);
    this.setState(({ todoData }) => {
      const newData = [...todoData, item];

      return {
        todoData: newData
      };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = this.findIndexItem(arr, id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  findIndexItem(array, id) {
    return array.findIndex(el => el.id === id);
  }

  onChangeSearch = event => {
    const textSearch = event.target.value;
    this.setState({ textSearch });
  };

  search(items, textSearch) {
    if (textSearch.length === 0) {
      return items;
    }

    return items.filter(el => {
      return el.label.toLowerCase().search(textSearch.toLowerCase()) !== -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  render() {
    const { todoData, textSearch, filter } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filter(this.search(todoData, textSearch), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onChangeSearch={this.onChangeSearch}
            textSearch={textSearch}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.onDeleted}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
