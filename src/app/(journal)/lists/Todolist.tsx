import React, { useEffect, useState } from "react";
import { itemProps } from "./page";
import { Trash } from "lucide-react";
import { TodoItemType, TodoType } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, todoCollectionRef, todoItemsCollectionRef } from "@/firebase";
import {
  addTodoItem,
  createCategory,
  deleteTodoCategory,
  updateCategoryHeader,
} from "@/redux/todo/todoSlice";
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
  headerId: string;
  setNewCategory?: React.Dispatch<React.SetStateAction<TodoType | null>>;
}) => {
  const dispatch = useDispatch();
  const [initiateAutoSave, setInitiateAutoSave] = useState(false);
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [newItem, setNewItem] = useState<TodoItemType[] | null>(
    todoItems.todoItems
  );
  const [disableAddNew, setDisableAddNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(todoItems.headerTitle);
  const [trackValue, setTrackValue] = useState("");
  const [debouncedContent] = useDebounce(trackValue, 1000);

  const handleHeaderChange = (e: any) => {
    setHeaderTitle(e.target.value);
  };
  const handleDisableAddNew = (val: boolean) => {
    setDisableAddNew(val);
  };

  const handleAddeNewItem = async () => {
    handleDisableAddNew(true);
    await addDoc(todoItemsCollectionRef, {
      categoryId: headerId,
      value: "",
      userEmail: user.email,
    })
      .then((res) => {
        dispatch(
          addTodoItem({
            categoryId: headerId,
            item: {
              categoryId: headerId,
              value: "",
              userEmail: user.email,
              id: res.id,
            },
          })
        );
        handleDisableAddNew(false);
        setNewItem(null);
      })
      .catch((e) => {
        toast("Something went wrong", {
          type: "error",
        });
      });
  };


  const handleSave = async () => {
    if (!isLogged) {
      return toast("Login required to save journal", {
        type: "error",
      });
    }
    const docRef = doc(db, "todo", headerId);
    setIsSaving(true);
    setDisableAddNew(true);
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
        setDisableAddNew(false);
      })
      .catch(() => {
        toast("Something went wrong", {
          type: "error",
        });
      });

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
    // console.log("TODO ITEMS: ", todoItems.todoItems);
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
          <Trash size={20}/>
        </button>
      </div>
      <div className="flex flex-col">
        {newItem &&
          newItem.map((item, index) => (
            <TodoItemCard
              handleDisableAddNew={handleDisableAddNew}
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
            onClick={handleAddeNewItem}
            className={`${
              disableAddNew ? "bg-emerald-200" : "bg-emerald-500"
            } text-white px-4 py-2 rounded flex justify-center items-center`}
            disabled={disableAddNew}
          >
            {disableAddNew ? (
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
              "Add Item"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Todolist;


