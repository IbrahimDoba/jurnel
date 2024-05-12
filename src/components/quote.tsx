"use client";
import React, { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState<String>("");
  const [author, setAuthor] = useState<String>("");
  const [isLoading, setisLoading] = useState<boolean>(false);

  const generateQuote = () => {
    setisLoading(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
        setisLoading(false);
      });
  };
  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <section className="max-h-24 h-24 flex flex-auto justify-center mt-24 ">
        <div className="container flex justify-center flex-col items-center align-middle ">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col">
              <p className="text-lg text-emerald-500" id="quote-text">
                {quote}
              </p>
              <p
                className="quote-type text-md text-emerald-500 flex justify-end font-bold"
                id="quote-author"
              >
                {author}
              </p>
            </div>
          )}
        </div>
      </section>
      <div className="mt-5 flex justify-center flex-col items-center align-middle">
        <button
          type="button"
          onClick={generateQuote}
          className="focus:outline-none text-white bg-accent hover:bg-emerald-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Another Quote!
        </button>
      </div>
    </div>
  );
}

export default Quote;
