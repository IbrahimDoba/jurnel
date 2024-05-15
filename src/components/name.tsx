"use client";
import { useState } from "react";
import namesAndMeaning from "@/data/names.json";

interface itemsProps {
  name: string;
  meaning: string;
}

function Name() {
  const [randomName, setRandomName] = useState<itemsProps>();
  const generateName = async () => {
    const randomItem = namesAndMeaning.sort(() => 0.5 - Math.random())[0];
    setRandomName(randomItem);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="max-h-24 h-24 flex flex-auto justify-center mt-24">
        <div className="container flex justify-center flex-col items-center align-middle ">
          <div className="flex flex-col">
            {randomName? (
              <div>
              <p className="text-4xl font-bold text-emerald-500" id="quote-text">
             {randomName?.name}
            </p>
            <p
              className="quote-type text-md text-emerald-500 flex justify-center "
              id="quote-author"
            >
            {randomName?.meaning}
            </p>
            </div>
            ): (
              <p>Click to generate name</p>
            )}
            
          </div>
        </div>
      </section>
      <div className="mt-5 flex justify-center flex-col items-center align-middle">
        <button
          type="button"
          onClick={generateName}
          className="focus:outline-none text-white bg-accent hover:bg-emerald-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Another Quote!
        </button>
      </div>
    </div>
  );
}

export default Name;
