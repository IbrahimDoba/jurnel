"use client";

import { useEffect, useState } from "react";
import LoadSpinner from "./loadSpinner";
function Word() {
  const [words, setWords] = useState([]);
  const [partOfSpeech, setPartOfSpeech] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [firstWord, setFirstWord] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);

  const generateWord = async () => {
    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => response.json())
      .then((data) => {
        // setQuote(data.content);
        // setAuthor(data.author);
        console.log(data);
        setWords(data);
      });
  };
  useEffect(() => {
    if (words.length > 0) {
      words.forEach((word) => {
        setisLoading(true);
        fetch(`https://api.freedictionary.dev/api/v1/entries/en/${word}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setPartOfSpeech(data[0].partOfSpeech);
            setMeaning(data[0].meanings[0].definition);
            setFirstWord(data[0].word);
            console.log(partOfSpeech, meaning, firstWord);
            setisLoading(false);
          })
          .catch((error) => console.error("Error fetching definition:", error));
      });
    }
  }, [words]);
  useEffect(() => {
    generateWord();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <section className="max-h-24 h-24 flex flex-auto justify-center mt-24">
        <div className="container flex justify-center flex-col items-center align-middle ">
          {isLoading ? (
            <div><LoadSpinner/></div>
          ) : (
            <div className="flex flex-col">
              <p className="text-3xl uppercase mb-4 text-emerald-500 justify-center font-bold">
                {firstWord}
              </p>
              <p className="text-lg text-emerald-500" id="quote-text">
                {meaning}
              </p>
              <p
                className="quote-type text-xs text-emerald-500 flex justify-end font-bold"
                id="quote-author"
              >
                {partOfSpeech}
              </p>
            </div>
          )}
        </div>
      </section>
      <div className="mt-5 flex justify-center flex-col items-center align-middle">
        <button
          type="button"
          onClick={generateWord}
          className="focus:outline-none text-white bg-accent hover:bg-emerald-600  font-medium rounded-lg text-xs px-5 py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
        >
          Another Quote!
        </button>
      </div>
    </div>
  );
}

export default Word;
