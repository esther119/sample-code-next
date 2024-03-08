"use client";
import { useState, FC } from "react";

interface SampleCodeProps {}
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
  arguments: {
    files: File[];
    project_type: string;
  };
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

const SampleCode: FC<SampleCodeProps> = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    // Define the request body if necessary. For example:
    const requestBody = {
      key: "value", // Replace with actual key-value pairs expected by your API
    };
    console.log("calling the api");
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include other headers if needed
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        // Ensure the response is OK before attempting to parse JSON
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
        // Handle the error state appropriately
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <button onClick={handleClick}>Generate Sample Code</button>;
  // The button is now clickable and will trigger the fetch when clicked.
  const output = JSON.stringify(data, null, 2);
  console.log(output);
  const message = {
    id: "chatcmpl-90LOnUEvuQZEarpLboB47SvEOe0J0",
    object: "chat.completion",
    created: 1709869285,
    model: "gpt-3.5-turbo-0125",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_DX9DT70Rd6gIKKDDbc2Nki5s",
              type: "function",
              function: {
                name: "generate_tutorial",
                arguments:
                  '{"files": [{"name": "README.md", "content": "# Tutorial\\nThis tutorial will guide you through creating a basic JSON file.\\n\\n## Steps\\n1. Create a new JSON file\\n2. Add data to the JSON file\\n3. Save the JSON file\\n\\n## Example\\n```json\\n{\\n  \\"name\\": \\"John Doe\\",\\n  \\"age\\": 30,\\n  \\"city\\": \\"New York\\"\\n}\\n```\\n"}], "project_type": "JSON"}',
              },
            },
            {
              id: "call_yjSzfsMfr0hWMxkXbgHiGbV4",
              type: "function",
              function: {
                name: "generate_tutorial",
                arguments:
                  '{"files": [{"name": "app.json", "content": "{\\n  \\"name\\": \\"John Doe\\",\\n  \\"age\\": 30,\\n  \\"city\\": \\"New York\\"\\n}\\n"}], "project_type": "JSON"}',
              },
            },
          ],
        },
        logprobs: null,
        finish_reason: "tool_calls",
      },
    ],
    usage: {
      prompt_tokens: 184,
      completion_tokens: 183,
      total_tokens: 367,
    },
    system_fingerprint: "fp_4f0b692a78",
  };

  const openCodeSandbox = async ({ message: ChatMessage }) => {
    // Replace with the actual URL of the code sandbox
    const { files } = message[messageId];
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
    console.log("[Codesandbox] open in new tab: ", sandboxId);
    window.open(
      `https://codesandbox.io/p/sandbox/${sandboxId}?file=%2FREADME.md`,
      "_blank"
    );
  };
  return (
    <div>
      <button onClick={() => openCodeSandbox(message)}>
        Open Code Sandbox
      </button>
    </div>
  );
};

export default SampleCode;
