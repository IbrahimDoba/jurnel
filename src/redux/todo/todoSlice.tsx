import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItemType, TodoType } from "../../../types";

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
    updateCategoryHeader: (
      state,
      { payload }: { payload: { headerTitle: string; id: string } }
    ) => {
      const findTodoIndex = state.todos.findIndex((j) => j.id === payload.id);
      state.todos[findTodoIndex].headerTitle = payload.headerTitle;
    },
    updateTodoItem: (
      state,
      {
        payload,
      }: {
        payload: { categoryId: string; todoId: string; itemData: TodoItemType };
      }
    ) => {
      const findTodoIndex = state.todos.findIndex(
        (j) => j.id === payload.categoryId
      );
      const findItemIndex = state.todos[findTodoIndex].todoItems.findIndex(
        (item) => item.id === payload.todoId
      );
      console.log("ITEM updating PAYLOAD: ", payload.itemData);
      state.todos[findTodoIndex].todoItems[findItemIndex] = payload.itemData;
    },
    createCategory: (state, { payload }: { payload: TodoType }) => {
      state.todos = [...state.todos, payload];
    },
    addTodoItem: (
      state,
      { payload }: { payload: { item: TodoItemType; categoryId: string } }
    ) => {
      const findTodoIndex = state.todos.findIndex(
        (j) => j.id === payload.categoryId
      );

      state.todos[findTodoIndex].todoItems = [
        ...state.todos[findTodoIndex].todoItems,
        payload.item,
      ];

      console.log("ITEM ADDING PAYLOAD: ", payload);
    },
    deleteTodoCategory: (state, { payload }: { payload: any }) => {
      const filterOutTodo = state.todos.filter((j) => j.id !== payload.id);
      state.todos = filterOutTodo;
    },
    deleteTodoItem: (
      state,
      {
        payload,
      }: {
        payload: { categoryId: string; todoId: string };
      }
    ) => {
      const findTodoIndex = state.todos.findIndex(
        (j) => j.id === payload.categoryId
      );
      const findItem = state.todos[findTodoIndex].todoItems.find(
        (item) => item.id === payload.todoId
      );

      console.log("TODOID: ", payload.categoryId, "ITEM ID: ", payload.todoId);
      const remakeTodos = state.todos[findTodoIndex].todoItems.filter(
        (item) => item.id !== payload.todoId
      );
      state.todos[findTodoIndex].todoItems = remakeTodos;
    },
  },
});

export const {
  fetchTodos,
  updateTodoItem,
  deleteTodoCategory,
  addTodoItem,
  updateCategoryHeader,
  deleteTodoItem,
  createCategory,
} = todoSlice.actions;
export default todoSlice.reducer;
