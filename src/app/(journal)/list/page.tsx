"use client";
import React, { useState } from "react";
import Todolist from "./Todolist";

export interface itemProps {
  id: number;
  text: string;
}

const ListPage = () => {
 const secondTitle = "Positive Affirmations"
 const btnText = "Add Affirmation"
  
  return (
    // create for how are you feeling today / grocery list / postivie affirmation
    <div className="flex w-full justify-center items-center">
      <div className="transperant flex  flex-wrap justify-between items-around  min-w-[800px] mt-[25px] mx-[24px]  rounded-xl  ">
      <Todolist/>
      <Todolist secondTitle = {secondTitle} btnText={btnText}/>
      
      </div>
     
    </div>
  );
}

export default ListPage;
