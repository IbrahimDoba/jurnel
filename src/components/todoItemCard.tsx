"use client";
import React, { useEffect, useState } from "react";
import { Save, Trash } from "lucide-react";
import { TodoItemType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { db, todoItemsCollectionRef } from "@/firebase";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import {
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "@/redux/todo/todoSlice";
import { ColorRing } from "react-loader-spinner";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";

const TodoItemCard = ({
  todoItem,
  headerTitle,
  setNewItem,
  categoryId,
  handleDisableAddNew,
}: {
  todoItem: TodoItemType;
  headerTitle: string;
  categoryId?: string;
  setNewItem: any;
  handleDisableAddNew: (val: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const { isLogged, user } = useSelector((state: IRootState) => state.user);

  const [initiateAutoSave, setInitiateAutoSave] = useState(false);
  const [itemValue, setItemValue] = useState(todoItem);
  const [trackValue, setTrackValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [debouncedContent] = useDebounce(trackValue, 1000);

  const handleSave = async () => {
    if (!isLogged) {
      setErrorMsg("Login required to save journal");
      return toast("Login required to save journal", {
        type: "error",
      });
    }

    const docRef = doc(db, "todoItem", todoItem.id);
    setIsSaving(true);
    dispatch(
      updateTodoItem({
        categoryId: categoryId ?? "",
        todoId: todoItem.id,
        itemData: {
          userEmail: user.email,
          value: itemValue.value,
          id: todoItem.id,
          categoryId: todoItem.categoryId,
        },
      })
    );
    await setDoc(docRef, {
      userEmail: user.email,
      categoryId: categoryId,
      value: itemValue.value,
    })
      .then(() => {
        handleDisableAddNew(false);
      })
      .catch(() => {
        setErrorMsg("Something went wrong");
      });

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (todoItem.id) {
      const todoDelete = doc(db, "todoItem", todoItem.id);
      dispatch(
        deleteTodoItem({ categoryId: categoryId ?? "", todoId: todoItem.id })
      );
      await deleteDoc(todoDelete);
    } else {
      setNewItem(null);
    }
    toast("Deleted", {
      type: "success",
    });
  };

  // AUTO SAVE useEffect
  useEffect(() => {
    if (user.email && initiateAutoSave) {
      handleSave();
    }
  }, [debouncedContent, user.email, initiateAutoSave]);

  // TRACK GLOBAL STATE UPDATE
  useEffect(() => {
    setItemValue(todoItem);
  }, [todoItem.value, todoItem]);
  return (
    <ul className="justify-center items-center flex flex-col">
      <li className="w-full flex gap-2 justify-between items-center border-b border-gray-200 py-2 px-4 group">
        <label className="block w-full">
          <input
            type="text"
            value={itemValue.value}
            // defaultValue={itemValue.value}
            onChange={(e) => {
              setItemValue({ ...itemValue, value: e.target.value });
              setTrackValue(e.target.value);
              setInitiateAutoSave(true);
            }}
            autoFocus
            placeholder="Your item here"
            className=" w-full outline-none bg-slate-50 p-2 border border-slate-50 group-hover:border-black group-hover:border  group-hover:border-dashed rounded-md"
          />
        </label>
        {isSaving && (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        )}

        <div className="flex gap-2">
          {!isSaving && (
            <button
              title="save"
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="hover:bg-primary rounded-md p-1 h-fit w-fit transition duration-200 hover:text-accent"
            >
              <Save size={20} />
            </button>
          )}
          <button
            title="delete"
            type="button"
            onClick={handleDelete}
            className="text-red-500 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-200 transition-all duration-300"
          >
            <Trash size={20}/>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default TodoItemCard;
