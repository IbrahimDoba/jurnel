import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../../../types";

type initialStateType = {
  todos: TodoType[];
};
const initailState: initialStateType = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState: initailState,
  reducers: {
    fetchTodos: (state, action: PayloadAction<TodoType[]>) => {
      console.log("LOGIN DISPATCH: ", action.payload);
      state.todos = action.payload;
    },
    updateTodo: (state, { payload }: { payload: any }) => {
      const findTodoIndex = state.todos.findIndex((j) => j.id === payload.id);
      state.todos[findTodoIndex] = {
        ...state.todos[findTodoIndex],
        ...payload,
      };
    },
    addTodo: (state, { payload }: { payload: TodoType }) => {
      state.todos = [...state.todos, payload];
    },
    deleteTodo: (state, { payload }: { payload: any }) => {
      const filterOutTodo = state.todos.filter((j) => j.id !== payload.id);
      state.todos = filterOutTodo;
    },
  },
});

export const { fetchTodos, updateTodo, deleteTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
