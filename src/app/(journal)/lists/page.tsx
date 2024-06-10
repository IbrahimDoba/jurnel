"use client";
import React, { useEffect, useState } from "react";
import Todolist from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { todoCollectionRef, todoItemsCollectionRef } from "@/firebase";
import { addDoc, getDocs } from "firebase/firestore";
import { BackendTodoType, TodoItemType, TodoType } from "../../../../types";
import { createCategory, fetchTodos } from "@/redux/todo/todoSlice";
import { useRouter } from "next/navigation";
import PremiumModal from "@/components/premiumModal";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

export interface itemProps {
  id: number;
  text: string;
}

const ListPage = () => {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const { todos } = useSelector((state: IRootState) => state.todos);
  const { subscription } = useSelector(
    (state: IRootState) => state.subscription
  );
  const [newCategoryLoading, setNewCategoryLoading] = useState(false);
  const [limitModal, setLimitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("TRACKING TODOS: ", todos);

  const saveNewCategory = async () => {
    setNewCategoryLoading(true);
    await addDoc(todoCollectionRef, {
      userEmail: user.email,
      headerTitle: "",
    })
      .then((res) => {
        dispatch(
          createCategory({
            id: res.id,
            headerTitle: "",
            userEmail: user.email,
            todoItems: [],
          })
        );
      })
      .catch(() => {
        toast("Something went wrong", {
          type: "error",
        });
      });
    setNewCategoryLoading(false);
  };
  const handleNewCategory = () => {
    console.log("ITEM LENGTH: ", todos.length, subscription);
    if (subscription !== "free" && todos.length < 6) {
      saveNewCategory();
      return;
    } else if (subscription === "free" && todos.length < 3) {
      saveNewCategory();
      return;
    } else {
      setErrorMsg("limit reached");
      subscription !== "unlimited" ? setLimitModal(true) : null;
    }
  };
  const handleCloseLimitModal = () => {
    setLimitModal(!limitModal);
  };
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
    <div className="w-full h-full max-w-screen-xl p-8 space-y-6 lg:space-y-10">
      <button
        className="p-2 px-4 bg-accent text-white rounded-md ml-auto w-fit"
        onClick={handleNewCategory}
      >
        {newCategoryLoading || isLoading ? (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
          />
        ) : (
          "New Category"
        )}
      </button>

      {/* todo grid */}
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] gap-8 md:gap-12 lg:gap-16 justify-center">
        {todos.map((todo) => (
          <Todolist headerId={todo.id} key={todo.id} todoItems={todo} />
        ))}
      </ul>
      <span className="text-sm text-red-500 font-semibold">{errorMsg}</span>

      {/* empty entries notification */}
      {todos.length === 0 && (
        <div className="w-full h-full grid place-content-center">
          {isLoading ? (
            "Loading..."
          ) : (
            <span>You haven&apos;t created any Todos</span>
          )}
        </div>
      )}
      <PremiumModal isOpen={limitModal} onClose={handleCloseLimitModal} />
    </div>
  );
};

export default ListPage;
