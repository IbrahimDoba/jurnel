import React, { useEffect, useState } from "react";
import { itemProps } from "./page";
import { FaTrash } from "react-icons/fa";
import { TodoItemType, TodoType } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, todoCollectionRef } from "@/firebase";
import {
  createCategory,
  deleteTodoCategory,
  updateCategoryHeader,
} from "@/redux/todo/todoSlice";
import { BiSave } from "react-icons/bi";
import TodoItemCard from "@/components/todoItemCard";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { ColorRing } from "react-loader-spinner";

const Todolist = ({
  todoItems,
  headerPlaceHolder,
  headerId,
  setNewCategory,
}: {
  todoItems: TodoType;
  headerPlaceHolder?: string;
  headerId?: string;
  setNewCategory?: React.Dispatch<React.SetStateAction<TodoType | null>>;
}) => {
  const dispatch = useDispatch();
  const [initiateAutoSave, setInitiateAutoSave] = useState(false);
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [newItem, setNewItem] = useState<TodoItemType[] | null>(
    todoItems.todoItems
  );
  const [isSaving, setIsSaving] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(todoItems.headerTitle);
  const [trackValue, setTrackValue] = useState("");
  const [debouncedContent] = useDebounce(trackValue, 1000);

  const handleHeaderChange = (e: any) => {
    setHeaderTitle(e.target.value);
  };

  const handleSave = async () => {
    if (!isLogged) {
      return toast("Login required to save journal", {
        type: "error",
      });
    }
    if (!headerId) {
      // IF THERE UIS NO ID, IT'S A NEW ENTRY
      setIsSaving(true);
      await addDoc(todoCollectionRef, {
        userEmail: user.email,
        headerTitle,
      })
        .then((res) => {
          dispatch(
            createCategory({
              id: res.id,
              headerTitle,
              userEmail: user.email,
              todoItems: [],
            })
          );
          setNewCategory ? setNewCategory(null) : null;
          toast("Saved", {
            type: "success",
          });
        })
        .catch(() => {
          toast("Something went wrong", {
            type: "error",
          });
        });
    } else {
      // UPDATING AN EXISTING ENTRY
      const docRef = doc(db, "todo", headerId);

      setIsSaving(true);
      await setDoc(docRef, {
        userEmail: user.email,
        headerTitle,
        value: trackValue,
      })
        .then(() => {
          dispatch(
            updateCategoryHeader({
              id: headerId,
              headerTitle,
            })
          );
        })
        .catch(() => {
          toast("Something went wrong", {
            type: "error",
          });
        });
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (headerId) {
      const todoDelete = doc(db, "todo", headerId);
      dispatch(deleteTodoCategory({ id: headerId }));
      await deleteDoc(todoDelete);
    } else {
      setNewCategory ? setNewCategory(null) : null;
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
    setNewItem(todoItems.todoItems);
    console.log(todoItems.todoItems)
  }, [todoItems.todoItems]);
  return (
    <div className="shadow rounded-md bg-slate-50 h-fit">
      <div className="flex w-full py-2 px-4 border-b">
        <input
          type="text"
          value={headerTitle}
          onChange={(e) => {
            handleHeaderChange(e);
            setTrackValue(e.target.value);
            setInitiateAutoSave(true);
          }}
          placeholder={headerPlaceHolder}
          className=" w-full outline-none font-bold bg-slate-50 p-2 border border-slate-50 hover:border-black hover:border  hover:border-dashed rounded-md "
        />
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
        <button
          title="delete"
          type="button"
          onClick={handleDelete}
          className="text-red-500 group-hover:visible p-1.5 rounded-md hover:bg-red-200"
        >
          <FaTrash />
        </button>
      </div>
      <div className="flex flex-col">
        {newItem &&
          newItem.map((item, index) => (
            <TodoItemCard
              setNewItem={setNewItem}
              key={index}
              todoItem={item}
              categoryId={headerId}
              headerTitle={todoItems.headerTitle}
            />
          ))}
        {headerId && (
          <button
            type="button"
            onClick={() => {
              if (newItem) {
                setNewItem([
                  ...newItem,
                  {
                    id: "",
                    categoryId: headerId,
                    value: "",
                    userEmail: user.email,
                  },
                ]);
              } else {
                setNewItem([
                  {
                    id: "",
                    categoryId: headerId,
                    value: "",
                    userEmail: user.email,
                  },
                ]);
              }
            }}
            className="bg-emerald-500 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        )}
      </div>
    </div>
  );
};

export default Todolist;
