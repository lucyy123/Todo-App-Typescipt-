import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TodoItemsTypes } from "../vite-env";
import { useState } from "react";

//todo ====> is an object
type Propstypes = {
  todo: TodoItemsTypes;
  isCompletHandler:(id:string)=>void;
  deleteHandler:(id:string)=>void;
  updatehandler:(id:string,newTitle:string)=>void;

};

const TodoItems = ({ todo,
    isCompletHandler,
    deleteHandler,
    updatehandler

 }: Propstypes) => {

const [isEdit,setIsEdit] = useState<boolean>(false);
const [newTitle,setNewTitle] = useState<string>(todo.name);




  return (
    <Paper
      style={{
        padding: "0.5rem 1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
{

isEdit? <TextField value={newTitle}  onChange={(e)=>setNewTitle(e.target.value)}

onKeyDown={(e)=>{
if(e.key==="Enter" && newTitle !==""){
  updatehandler(todo.id,newTitle)
  setIsEdit((pre)=>!pre)
}

}}

/>: <Typography marginRight={"auto"}>{todo.name}</Typography>


}

       
        <Checkbox  checked={todo.isCompleted} onChange={()=>isCompletHandler(todo.id)}/>
        <Button onClick={()=>deleteHandler(todo.id)}>
          <Delete />
        </Button>
        <Button onClick={()=>{
          
          setIsEdit((pre)=>!pre)
          updatehandler(todo.id,newTitle)
          } }>
          
          {
            isEdit?"Done":"Edit"
          }
          
          
          </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItems;
