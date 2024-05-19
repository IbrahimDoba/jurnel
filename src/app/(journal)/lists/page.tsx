"use client";
import React, { useEffect, useState } from "react";
import Todolist from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { todoCollectionRef } from "@/firebase";
import { getDocs } from "firebase/firestore";
import { TodoType } from "../../../../types";
import { fetchTodos } from "@/redux/todo/todoSlice";
import { useRouter } from "next/navigation";

export interface itemProps {
  id: number;
  text: string;
}

const ListPage = () => {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { todos } = useSelector((state: IRootState) => state.todos);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const secondTitle = "Positive Affirmations";
  const btnText = "Add Affirmation";
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogged && user.email) {
      (async () => {
        setIsLoading(true);
        const todos = await getDocs(todoCollectionRef);
        const allTodos: any = todos.docs.map((todo) => ({
          ...todo.data(),
          id: todo.id,
        }));
        const filterUserTodos = allTodos.filter(
          (item: TodoType) => item.userEmail === user.email
        );
        dispatch(fetchTodos(filterUserTodos));
        setIsLoading(false);
      })();
    } else {
      router.push("/auth/login");
    }
  }, [dispatch, user.email, isLogged, router]);

  return (
    // create for how are you feeling today / grocery list / postivie affirmation
    <div className="flex w-full justify-center items-center">
      <div className="transperant flex  flex-wrap justify-between items-around  min-w-[800px] mt-[25px] mx-[24px]  rounded-xl  ">
        <Todolist todoItems={todos} />
        <Todolist
          secondTitle={secondTitle}
          btnText={btnText}
          todoItems={todos}
        />
      </div>
    </div>
  );
};

export default ListPage;
