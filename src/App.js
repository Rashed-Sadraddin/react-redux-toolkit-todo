import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "./store/todoSlice";
import Signin from './All_routes/Signin';



let isFirst = true;

function App() {
  const { todos } = useSelector((state) => state.todo);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState("");
  const [moreInput, setMoreInput] = useState("");
  const [dateInpur, setDateInput] = useState(new Date());

  const onRemove = (id) => {
    dispatch(todoActions.removeTodo(id));
  };
  const onAdd = (txt) => {
    if (inputText || moreInput || dateInpur) {
      dispatch(
        todoActions.addTodo({
          title: inputText,
          more: moreInput,
          date: dateInpur,
        })
      );
      setError(false);
    } else {
      setError(true);
    }
    //
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
          setInputText("");
          setMoreInput("");
          setDateInput(new Date());
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
          dispatch(todoActions.replaceTodos(data));
        } else {
          dispatch(todoActions.replaceTodos([]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let totalPrice = 0;
  let listTodo = todos.map((todo) => {
    totalPrice=totalPrice+parseInt(todo?.id);
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
        <h4>{todo.id}</h4>
        <span>{todo?.date}</span>
        <div>
          <h2>{todo?.text}</h2>
          <h2>{todo?.more}</h2>
        </div>
        <button
          onClick={() => {
            onRemove(todo.id);
          }}
        >
          delete
        </button>
      </div>
    );
  });
  return (
   
    <div className="App " style={{ padding: "10px" }}>
       
       <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <input onChange={onInput} placeholder="note" value={inputText} />
        <input
          onChange={(event) => setMoreInput(event.target.value)}
          placeholder="more info"
          value={moreInput}
        />
        <input
          type={"date"}
          onChange={(ev) => setDateInput(ev.target.value)}
          defaultValue={dateInpur}
          value={dateInpur}
        />

        {error ? <span style={{ color: "red" }}>invalid data</span> : <></>}
        <button
          style={{ margin: "10px" }}
          onClick={() => {
            onAdd();
          }}
        >
          Add todo
        </button>
      </div>

      <div>
        {todos?.length}
        <br/>
        {totalPrice}

        {listTodo}
      </div>
    </div>
  );
}

export default App;
