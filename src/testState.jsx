import "./App.css";
import { useState, useEffect } from "react";

let isFirst = true;

function TestState() {
const [todos,setTodos]=useState([])
  const [inputText, setInputText] = useState("");

  const onRemove = (id) => {
  };
  const onAdd = (txt) => {
    setTodos([{text:txt,id:'amsldj'+txt},...todos])
  };
  const onInput = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (!isFirst) {
      fetch("https://mini-7627e-default-rtdb.firebaseio.com/todos.json", {
        method: "PUT",
        // mode: 'cors',
        // headers: new Headers({       'Content-Type': 'application/json'    }),
        body: JSON.stringify(todos),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    isFirst = false;
  }, [todos]);

  useEffect(() => {
    fetch("https://mini-7627e-default-rtdb.firebaseio.com/todos.json")
      .then(async (res) => {
        const data = await res.json();
        if (data) {
            setTodos(data)
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <input onChange={onInput} />
      <button
        onClick={() => {
          onAdd(inputText);
        }}
      >
        Add todo
      </button>

      <div>
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              style={{
                margin: "10px",
                background: "grey",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <h2>{todo.text}</h2>
              <button
                onClick={() => {
                  onRemove(todo.id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TestState;
