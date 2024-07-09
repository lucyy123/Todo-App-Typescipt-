import { useEffect, useState } from "react";
import { TodoItemsTypes } from "./vite-env";
import TodoItems from "./components/todoItems";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { getTodos, saveTodos } from "./utils/localstorage";

function App() {
  const [todos, setTodos] = useState<TodoItemsTypes[]>(getTodos());

  const [title, setTitle] = useState<string>("");

  const submithandler = () => {
    const newTodo: TodoItemsTypes = {
      name: title,
      id: String(Math.random() * 10000),
      isCompleted: false,
    };
    setTodos((pre) => [...pre, newTodo]);
    setTitle("");
  };

  const deletehandler = (id: string) => {
    const newtodos = todos.filter((ele) => {
      return ele.id !== id
 
    });
    setTodos(newtodos)
  };

  const isCompletedhandler = (id: string) => {
    const newtodos = todos.map((ele) => {
      if (ele.id === id) ele.isCompleted = !ele.isCompleted;
      return ele;
    });
    setTodos(newtodos)

  };
  const updatehandler = (id: string,newTitle:string) => {
    const newtodos = todos.map((ele) => {
      if (ele.id === id) ele.name = newTitle;
      return ele;
    });
    setTodos(newtodos)

  };

  useEffect(()=>{
saveTodos(todos)
  },[todos])
  return (
    <Container
      maxWidth="sm"
  
      sx={{
        height: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{margin:"auto"}}>
          <Typography>TODO APP</Typography>
        </Toolbar>
      </AppBar>

      <Stack
        height={"75%"}
        direction={"column"}
        spacing={"1rem"}
        padding={"1rem"}
     
      >
        {todos.map((ele) => (
          <TodoItems
            key={ele.id}
            todo={ele}
            isCompletHandler={isCompletedhandler}
            deleteHandler={deletehandler}
            updatehandler={updatehandler}
          />
        ))}
      </Stack>

      <TextField
        fullWidth
        label={"add new task..."}
        sx={{
          marginBottom: "0.75rem",
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submithandler();
        }}
      />
      <Button
        disabled={title == ""}
        fullWidth
        variant="contained"
        onClick={submithandler}
      >
        Add
      </Button>
    </Container>
  );
}

export default App;
