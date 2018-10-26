import React from "react";
import "./app-header.css";
const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <h6>
        {toDo} more to do, {done} done
      </h6>
    </div>
  );
};
export default AppHeader;
