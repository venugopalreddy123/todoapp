import React from "react";
import "./App.css";
import Lists from "./Lists.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItems: {
        text: "",
        key: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  handleInput(e) {
    this.setState({
      currentItems: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItems;
    if (newItem.text !== "");
    {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItems: {
          text: "",
          key: "",
        },
      });
    }
  }
  deleteItem(key) {
    const filteredItem = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItem,
    });
  }
  setUpdate(text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <form id="todo-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter text"
              value={this.state.currentItems.text}
              onChange={this.handleInput}
            />
            <button type="submit">ADD</button>
          </form>
        </header>
        <Lists
          items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        ></Lists>
      </div>
    );
  }
}

export default App;
