"use client";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BackendTodoType,
  SubscriptionType,
  TodoItemType,
  TodoType,
  User,
  journalType,
} from "../../../../types";
import {
  auth,
  journalCollectionRef,
  subscriptionCollectionRef,
  todoCollectionRef,
  todoItemsCollectionRef,
} from "@/firebase";
import { getDocs } from "firebase/firestore";
import { fetchTodos } from "@/redux/todo/todoSlice";
const useGetData = () => {
  const router = useRouter();
  const { isLogged, user } = useSelector((store: IRootState) => store.user);
  const [todoItems, setTodoItems] = useState<TodoItemType[] | null>(null);
  const [todoCategories, setTodoCategories] = useState<
    BackendTodoType[] | null
  >(null);
  const [journels, setJournels] = useState<journalType[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[] | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (isLogged && user.email) {
      (async () => {
        setIsLoading(true);
        const journals = await getDocs(journalCollectionRef);
        const subscriptions = await getDocs(subscriptionCollectionRef);
        const allSubs: any = subscriptions.docs.map((sub) => ({
          ...sub.data(),
          id: sub.id,
        }));
        const allJournals: any = journals.docs.map((journal) => ({
          ...journal.data(),
          id: journal.id,
        }));
        setJournels(allJournals);
        setSubscriptions(allSubs);

        setIsLoading(false);
      })();
    } else {
      router.push("/auth/login");
    }
  }, [user.email, isLogged, router]);

  useEffect(() => {
    if (isLogged && user.email) {
      (async () => {
        setIsLoading(true);
        const todos = await getDocs(todoCollectionRef);
        const todoItems = await getDocs(todoItemsCollectionRef);
        const allTodos: any = todos.docs.map((todo) => ({
          ...todo.data(),
          id: todo.id,
        })) as BackendTodoType[];

        const allTodoItems = todoItems.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        })) as TodoItemType[];

        const formatTodos = allTodos.map((todo: BackendTodoType) => {
          const matchingItem = allTodoItems.filter(
            (item) => item.categoryId === todo.id
          );
          return {
            ...todo,
            todoItems: matchingItem,
          };
        });
        setTodoCategories(allTodos);
        setTodoItems(allTodoItems);
        // setFetchedTodos(formatTodos);
        setIsLoading(false);
      })();
    } else {
      router.push("/auth/login");
    }
  }, [user.email, isLogged, router]);

  return { error, todoItems, todoCategories, subscriptions, journels };
};
export default useGetData;
