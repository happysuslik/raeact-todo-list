import React from "react";
import "./search-panel.css";
const SearchPanel = ({ onChangeSearch, textSearch }) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="search"
      onChange={onChangeSearch}
      value={textSearch}
    />
  );
};
export default SearchPanel;
