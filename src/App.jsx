import React, { useState } from "react";
import "./App.css";
import { FaPlusSquare } from "react-icons/fa";
import { MdDone, MdOutlineDeleteForever } from "react-icons/md";
import AOS from "aos";
function App() {
  const [input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const [index, setIndex] = useState(0);
  const [farray, setFaray] = useState([]);
  const [blank, setBlank] = useState(false);
  const [animate, setAnimate] = useState("");

  AOS.init();
  function handleClick() {
    if (input === "") {
      setBlank(true);
    } else {
      const obj = {
        id: index,
        text: input,
        completed: false,
      };
      setArray([...array, obj]);
      setInput("");
      setIndex(index + 1);
      setFaray([...array, obj]);
      setBlank(false);
    }
  }

  function handleDone(id) {
    const searchId = array.find((i) => i.id === id);
    searchId.completed = !searchId.completed;
    setIndex(index + 1);
  }

  function handleRemove(id) {
    const newList = array.filter((i) => i.id !== id);

    setTimeout(() => {
      setArray(newList);
      setFaray(newList);
    }, 400);
    setAnimate(id);
  }

  function handleSelect(e) {
    if (e.target.value === "all") {
      setArray(farray);
    } else if (e.target.value === "completed") {
      let fnew = array.filter((i) => i.completed === true);
      setArray(fnew);
    } else {
      let fnew = array.filter((i) => i.completed !== true);
      setArray(fnew);
    }
  }

  return (
    <div className="main-div">
      <div className="inside-div">
        <h1>Hagop's TodoList</h1>
        <div className="top-content-div">
          <input
            onFocus={() => setBlank(false)}
            style={{ border: blank === true ? "3px solid red" : "" }}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="add-button" onClick={handleClick}>
            <FaPlusSquare className="plus-icon" />
          </button>
          <div className="select">
            <select className="inside-select" onChange={handleSelect}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </div>

        <div className="bottom-content-div ">
          {array.map((items) => {
            return (
              <div
                style={{
                  filter: items.completed === true ? "opacity(0.5)" : "",
                }}
                className={animate === items.id ? "fall" : "bottom-inside-div"}
                key={items.id}
              >
                <p
                  style={{
                    filter: items.completed === true ? "grayscale(1)" : "",
                    textDecoration:
                      items.completed === true ? "line-through" : "",
                  }}
                >
                  {items.text}
                </p>
                <button
                  className="btn-done"
                  onClick={() => handleDone(items.id)}
                >
                  <MdDone className="done-icon" />
                </button>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(items.id)}
                >
                  <MdOutlineDeleteForever className="delete-icon" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
