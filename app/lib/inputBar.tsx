// Input bar function
"use client";
import { useState } from "react";
import SampleCode from "./sampleCodeComponent";

interface InputBarProps {
  submission: (input: string) => Promise<void>;
}

export default function InputBar({ submission }: InputBarProps) {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submission(input);
    setInput("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="What code do you want to generate?"
            onChange={handleInputChange}
            value={input}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <SampleCode userInput={input}></SampleCode>
          </button>
        </div>
      </form>
    </div>
  );
}
