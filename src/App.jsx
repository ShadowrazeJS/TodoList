import ReactDOM from "react-dom";
import React, { useReducer, useRef } from "react";

const initialState = []

export const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            name: action.payload
          }
        ];
      case "REMOVE":
        return state.filter(i => i.id !== action.payload);
      default:
        return state;
    }
  }
function App() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer(reducer, initialState);

  const removeItem = payload => {
    dispatch({ type: "REMOVE", payload });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD", payload: inputRef.current.value });
    inputRef.current.value = '';
  };

  return (
     <div className="container">
      <h1 className="logo">TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
        <button className="add">Add</button>
        <ol className="order">
          {items.map(({ name }, index) => {
            return (  
              <li className="list" key={index}>
                {name}
                <button className="buttonDel" onClick={() => removeItem(index)}>Delete</button>
              </li>
            );
          })}
        </ol>
      </form>
    </div>
  )
}

export default App
