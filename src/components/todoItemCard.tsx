"use client";
import React, { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { TodoType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { db, todoCollectionRef } from "@/firebase";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { addTodo, deleteTodo, updateTodo } from "@/redux/todo/todoSlice";
import { ColorRing } from "react-loader-spinner";
import { useDebounce } from "use-debounce";

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
  const { isLogged, user } = useSelector((state: IRootState) => state.user);

  const [itemValue, setItemValue] = useState(todoItem);
  const [trackValue, setTrackValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [debouncedContent] = useDebounce(trackValue, 1000);

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
        userEmail: user.email,
        headerTitle: headerTitle,
        value: itemValue.value,
      })
        .then((res) => {
          dispatch(
            addTodo({
              userEmail: user.email,
              headerTitle: headerTitle,
              value: trackValue,
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
        userEmail: user.email,
        headerTitle: todoItem.headerTitle,
        value: trackValue,
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
    if (todoItem.id) {
      const todoDelete = doc(db, "todo", todoItem.id);
      dispatch(deleteTodo({ id: todoItem.id }));
      await deleteDoc(todoDelete);
    } else {
      setNewItem(null);
    }
  };

  // AUTO SAVE useEffect
  useEffect(() => {
    if (user.email) {
      handleSave();
    }
  }, [debouncedContent, user.email]);
  return (
    <ul className="justify-center items-center flex flex-col">
      <li className="flex gap-2 justify-between items-center border-b border-gray-200 py-2 px-4 group">
        <label>
          <input
            type="text"
            // value={title}
            defaultValue={itemValue.value}
            onChange={(e) => {
              setItemValue({ ...itemValue, value: e.target.value });
              setTrackValue(e.target.value);
            }}
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
