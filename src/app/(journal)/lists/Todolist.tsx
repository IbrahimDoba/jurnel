import React, { useState } from "react";
import { itemProps } from "./page";
import { FaTrash } from "react-icons/fa";
import { TodoType } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, todoCollectionRef } from "@/firebase";
import { deleteTodo, updateTodo } from "@/redux/todo/todoSlice";
import { BiSave } from "react-icons/bi";
import TodoItemCard from "@/components/todoItemCard";

const Todolist = ({
  secondTitle,
  btnText,
  todoItems,
}: {
  secondTitle?: string;
  btnText?: string;
  todoItems: TodoType[];
}) => {
  const { user } = useSelector((state: IRootState) => state.user);
  const [newItem, setNewItem] = useState<TodoType[] | null>(null);
  const [header, setHeader] = useState(secondTitle || "Grocery List");
  const handleHeaderChange = (e: any) => {
    setHeader(e.target.value);
  };
  const filterByHeader = todoItems.filter(
    (item) => item.headerTitle === header
  );
  return (
    <div className="shadow rounded-md bg-slate-50 ">
      <div className=" w-full py-2 px-4 border-b">
        <input
          type="text"
          value={header}
          onChange={handleHeaderChange}
          placeholder="Grocery List"
          className=" w-full outline-none font-bold bg-slate-50 p-2 border border-slate-50 hover:border-black hover:border  hover:border-dashed rounded-md "
        />
      </div>
      <div className="flex flex-col">
        {filterByHeader.map((item, index) => (
          <TodoItemCard
            setNewItem={setNewItem}
            key={index}
            todoItem={item}
            headerTitle={header}
          />
        ))}
        {newItem &&
          newItem.map((item, index) => (
            <TodoItemCard
              setNewItem={setNewItem}
              key={index}
              todoItem={item}
              headerTitle={header}
            />
          ))}
        <button
          type="button"
          onClick={() => {
            if (newItem) {
              setNewItem([
                ...newItem,
                {
                  id: "",
                  value: "",
                  headerTitle: header,
                  userEmail: user.email,
                },
              ]);
            } else {
              setNewItem([
                {
                  id: "",
                  value: "",
                  headerTitle: header,
                  userEmail: user.email,
                },
              ]);
            }
          }}
          className="bg-emerald-500 text-white px-4 py-2 rounded"
        >
          {btnText || "Add Item"}
        </button>
      </div>
    </div>
  );
};

export default Todolist;
