'use client';
import React, { useEffect, useState } from 'react';
import Todolist from './Todolist';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';
import { todoCollectionRef, todoItemsCollectionRef } from '@/firebase';
import { getDocs } from 'firebase/firestore';
import { BackendTodoType, TodoItemType, TodoType } from '../../../../types';
import { fetchTodos } from '@/redux/todo/todoSlice';
import { useRouter } from 'next/navigation';

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
  const secondTitle = 'Positive Affirmations';
  const btnText = 'Add Affirmation';
  const dispatch = useDispatch();
  console.log('TRACKING TODOS: ', todos);
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
      router.push('/auth/login');
    }
  }, [dispatch, user.email, isLogged, router]);
  console.log('TRACK MAIN TODO_: ', todos);
  return (
    // create for how are you feeling today / grocery list / postivie affirmation
    <div className='w-full h-full max-w-screen-xl p-8 space-y-6 lg:space-y-10'>
      <button
        className='p-2 px-4 bg-accent text-white rounded-md ml-auto w-fit'
        onClick={() =>
          setNewCategory({
            userEmail: user.email,
            id: '',
            todoItems: [],
            headerTitle: '',
          })
        }
      >
        New Category
      </button>

      {/* todo grid */}
      <ul className='grid grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] gap-8 md:gap-12 lg:gap-16 justify-center'>
        {todos.map((todo) => (
          <Todolist headerId={todo.id} key={todo.id} todoItems={todo} />
        ))}

        {newCategory && (
          <Todolist
            todoItems={newCategory}
            setNewCategory={setNewCategory}
            headerPlaceHolder='New Category'
          />
        )}
      </ul>

      {/* empty entries notification */}
      {!newCategory && todos.length === 0 && (
        <div className='w-full h-full grid place-content-center'>
          <span>You haven&apos;t created any Todos</span>
        </div>
      )}
    </div>
  );
};

export default ListPage;
