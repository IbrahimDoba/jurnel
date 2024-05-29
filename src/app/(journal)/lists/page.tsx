"use client";
import React, { useEffect, useState } from "react";
import Todolist from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { todoCollectionRef, todoItemsCollectionRef } from "@/firebase";
import { getDocs } from "firebase/firestore";
import { BackendTodoType, TodoItemType, TodoType } from "../../../../types";
import { fetchTodos } from "@/redux/todo/todoSlice";
import { useRouter } from "next/navigation";

export interface itemProps {
  id: number;
  text: string;
}

const ListPage = () => {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { todos } = useSelector((state: IRootState) => state.todos);
  const [newCategory, setNewCategory] = useState<TodoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const secondTitle = "Positive Affirmations";
  const btnText = "Add Affirmation";
  const dispatch = useDispatch();
  console.log("TRACKING TODOS: ", todos);
  useEffect(() => {
    if (isLogged && user.email) {
      (async () => {
        setIsLoading(true);
        const todos = await getDocs(todoCollectionRef);
        const todoItems = await getDocs(todoItemsCollectionRef);
        const allTodos: any = todos.docs.map((todo) => ({
          ...todo.data(),
          id: todo.id,
        }));
        const filterUserTodos: BackendTodoType[] = allTodos.filter(
          (item: BackendTodoType) => item.userEmail === user.email
        );

        const allTodoItems: any = todoItems.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        const filterUserTodoItems: TodoItemType[] = allTodoItems.filter(
          (item: TodoItemType) => item.userEmail === user.email
        );
        const formatTodos = filterUserTodos.map((todo) => {
          const matchingItem = filterUserTodoItems.filter(
            (item) => item.categoryId === todo.id
          );
          return {
            ...todo,
            todoItems: matchingItem,
          };
        });
        dispatch(fetchTodos(formatTodos));
        setIsLoading(false);
      })();
    } else {
      router.push("/auth/login");
    }
  }, [dispatch, user.email, isLogged, router]);
  console.log("TRACK MAIN TODO_: ", todos);
  return (
    // create for how are you feeling today / grocery list / postivie affirmation
    <div className="flex w-full justify-center items-center">
      <div className="transperant flex relative pt-16 flex-wrap justify-between items-around  min-w-[800px] mt-[25px] mx-[24px]  rounded-xl  ">
        {todos.map((todo) => (
          <Todolist headerId={todo.id} key={todo.id} todoItems={todo} />
        ))}

        {newCategory && (
          <Todolist
            todoItems={newCategory}
            setNewCategory={setNewCategory}
            headerPlaceHolder="New Category"
          />
        )}

        {!newCategory && todos.length === 0 && (
          <span>You haven&apos;t created any Todos</span>
        )}

        <button
          className="p-1 px-4 bg-accent text-white rounded-md absolute top-0 right-0"
          onClick={() =>
            setNewCategory({
              userEmail: user.email,
              id: "",
              todoItems: [],
              headerTitle: "",
            })
          }
        >
          New Category
        </button>
      </div>
    </div>
  );
};

export default ListPage;
