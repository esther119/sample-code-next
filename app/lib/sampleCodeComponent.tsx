"use client";
import { useState, FC } from "react";

interface SampleCodeProps {
  userInput: string;
}
interface Choice {
  index: number;
  message: Message;
}

interface Message {
  role: string;
  content: string | null;
  tool_calls: ToolCall[];
}

interface ToolCall {
  id: string;
  type: string;
  function: ToolFunction;
}

interface ToolFunction {
  name: string;
  arguments: string;
}
interface ChatMessage {
  id: string;
  created: number;
  model: string;
  choices: Choice[];
}
interface File {
  name: string;
  content: string;
}
type FilesAccumulator = {
  [key: string]: { content: string; isBinary: boolean };
};

const SampleCode: FC<SampleCodeProps> = (userInput) => {
  console.log("userInput in SampleCode", userInput);
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    const requestBody = {
      userInput: userInput,
    };

    try {
      const res = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle the error state appropriately
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <button onClick={handleClick}>Generate Sample Code</button>;
  // The button is now clickable and will trigger the fetch when clicked.
  const output = JSON.stringify(data, null, 2);
  // console.log("openai output in the frontend", output);

  const openCodeSandbox = async ({ message }: { message: ChatMessage }) => {
    // Replace with the actual URL of the code sandbox
    const toolCallArguments =
      message.choices[0].message.tool_calls[0].function.arguments;
    const parsedArguments = JSON.parse(toolCallArguments);
    const files: File[] = parsedArguments.files;
    console.log("files", files);
    let sandboxId: string;
    try {
      const resp = await fetch(
        "https://codesandbox.io/api/v1/sandboxes/define?json=1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            files: files.reduce(
              (acc: FilesAccumulator, curr: File) => {
                acc[curr.name] = { content: curr.content, isBinary: false };
                return acc;
              },
              {} as {
                [key: string]: {
                  content: string;
                  isBinary: boolean;
                };
              }
            ),
          }),
        }
      );
      const respJson = await resp.json();
      sandboxId = respJson.sandbox_id;
    } catch (e) {
      console.error(e);
      alert("Failed to open in codesandbox");
      return;
    }

    if (!sandboxId) {
      alert("Failed to open in codesandbox, missing sandbox id");
      return;
    }
    // console.log("[Codesandbox] open in new tab: ", sandboxId);
    window.open(
      `https://codesandbox.io/p/sandbox/${sandboxId}?file=%2FREADME.md`,
      "_blank"
    );
  };
  return (
    <div>
      <button onClick={() => openCodeSandbox({ message: data })}>
        Open Code Sandbox
      </button>
    </div>
  );
};

export default SampleCode;
