"use client";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { TodoType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { db, todoCollectionRef } from "@/firebase";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { addTodo, deleteTodo, updateTodo } from "@/redux/todo/todoSlice";
import { ColorRing } from "react-loader-spinner";

const TodoItemCard = ({
  todoItem,
  headerTitle,
  setNewItem,
}: {
  todoItem: TodoType;
  headerTitle: string;
  setNewItem: any;
}) => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: IRootState) => state.user);

  const [itemValue, setItemValue] = useState(todoItem);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    if (!isLogged) {
      setErrorMsg("Login required to save journal");
      return;
    }
    if (!todoItem.id || todoItem.id === "") {
      // IF THERE UIS NO ID, IT'S A NEW ENTRY
      setErrorMsg("");
      setIsSaving(true);
      await addDoc(todoCollectionRef, {
        userEmail: todoItem.userEmail,
        headerTitle: headerTitle,
        value: itemValue.value,
      })
        .then((res) => {
          dispatch(
            addTodo({
              userEmail: todoItem.userEmail,
              headerTitle: headerTitle,
              value: itemValue.value,
              id: res.id,
            })
          );
          setNewItem(null);
        })
        .catch(() => {
          setErrorMsg("Something went wrong");
        });
    } else {
      // UPDATING AN EXISTING ENTRY
      const docRef = doc(db, "todo", todoItem.id);

      setIsSaving(true);
      await setDoc(docRef, {
        headerTitle: todoItem.headerTitle,
        value: todoItem.value,
      })
        .then(() => {
          dispatch(updateTodo(todoItem));
        })
        .catch(() => {
          setErrorMsg("Something went wrong");
        });
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    const todoDelete = doc(db, "todo", todoItem.id);
    dispatch(deleteTodo({ id: todoItem.id }));
    await deleteDoc(todoDelete);
  };
  return (
    <ul className="justify-center items-center flex flex-col">
      <li className="flex gap-2 justify-between items-center border-b border-gray-200 py-2 px-4 group">
        <label>
          <input
            type="text"
            // value={title}
            defaultValue={itemValue.value}
            onChange={(e) =>
              setItemValue({ ...itemValue, value: e.target.value })
            }
            autoFocus
            placeholder="Your item here"
            className=" w-full outline-none bg-slate-50 p-2 border border-slate-50 group-hover:border-black group-hover:border  group-hover:border-dashed rounded-md"
          />
        </label>
        {isSaving ? (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          <button
            title="save"
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="hover:bg-primary rounded-md p-1 h-fit w-fit transition duration-200 hover:text-accent"
          >
            <BiSave size={20} />
          </button>
        )}

        <button
          title="delete"
          type="button"
          onClick={handleDelete}
          className="text-red-500 invisible group-hover:visible p-1.5 rounded-md hover:bg-red-200"
        >
          <FaTrash />
        </button>
      </li>
    </ul>
  );
};

export default TodoItemCard;
