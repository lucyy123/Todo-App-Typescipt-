import { TodoItemsTypes } from "../vite-env";



export const saveTodos=(todos:TodoItemsTypes[]):void=> {
    localStorage.setItem("todo-items",JSON.stringify(todos))
}

export const getTodos=():TodoItemsTypes[]=>{

const todos=localStorage.getItem("todo-items")

return todos?JSON.parse(todos):[]


}