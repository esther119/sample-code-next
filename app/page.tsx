"use client";
import { useState } from "react";
import Image from "next/image";
import SampleCode from "./lib/sampleCodeComponent";
import InputBar from "./lib/inputBar";

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const callAPI = async (input: string) => {
    setUserInput(input);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <InputBar submission={callAPI} />
        <SampleCode userInput={userInput} />
      </div>
    </main>
  );
}
