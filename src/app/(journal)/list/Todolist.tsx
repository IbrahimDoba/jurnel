import React, { useState } from "react";
import { itemProps } from "./page";

const Todolist = ({secondTitle,btnText}:any) => {
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState( secondTitle || "Grocery List" );
  const [items, setItems] = useState<itemProps[]>([]);

  const handleHeaderChange = (e: any) => {
    setHeader(e.target.value);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), text: title }]);
    setTitle("");
  };

  const deleteItem = (id: any) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const saveEdit = (index: any, newText: any) => {
    const newItems = [...items];
    newItems[index].text = newText;
    setItems(newItems);
  };
  return (
    <div className="shadow-md bg-slate-50">
      <div className=" w-full py-4 px-6 border-b shadow-sm ">
        <input
          type="text"
          value={header}
          onChange={handleHeaderChange}
          placeholder="Grocery List"
          className=" w-full outline-none font-bold bg-slate-50 p-2 border border-slate-50 hover:border-black hover:border  hover:border-dashed rounded-md "
        />
      </div>
      <ul className="justify-center items-center flex flex-col">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b border-gray-200  py-2 px-6 group"
          >
            <input
              type="text"
              // value={title}
              defaultValue={item.text}
              onChange={(e) => saveEdit(index, e.target.value)}
              autoFocus
              className=" w-full outline-none bg-slate-50 p-2 border border-slate-50 group-hover:border-black group-hover:border  group-hover:border-dashed rounded-md"
            />
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500 pl-10 invisible group-hover:visible"
            >
              Delete
            </button>
          </li>
        ))}
        <button
          onClick={addItem}
          className="bg-emerald-500 text-white px-4 py-2 rounded my-5 "
        >
         {btnText || "Add Item" }
        </button>
      </ul>
    </div>
  );
};

export default Todolist;
