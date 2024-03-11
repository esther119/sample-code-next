import { NextApiRequest, NextApiResponse } from "next";

interface PostData {
  userInput: string;
}

const genSampleCodeInstructions =
  "you are a skillful coding teacher, who is capable of creating the exact, personalized coding tutorial that I want. i will ask you for code for a particular app, you will respond with just the code. do not provide any explanations but label each section of code with the appropriate file name so i can re-create it on my end. Make sure to include a README.md file with the proper instructions so I can understand. Output valid json";
const getTutorialTool = {
  name: "generate_tutorial",
  description: "Create files for a coding tutorials",
  parameters: {
    type: "object",
    properties: {
      files: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of file",
            },
            content: {
              type: "string",
              description: "content in file",
            },
          },
        },
        description:
          "file containing a particular piece of code tutorial functionality.",
      },
      project_type: {
        type: "string",
        description: "type of project (e.g. NextJS, React, etc.)",
      },
    },
    required: ["files", "project_type"],
  },
};
// File: app/api/postData.tsx

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // Check the HTTP method of the request
//   if (req.method === "POST") {
//     try {
//       // Parse the request body to get the data sent by the client
//       const data = req.body;

//       // Implement your logic here. For example, you might want to store this data in a database
//       // For this example, we'll just log it to the console and return a success response
//       console.log("Received data:", data);

//       // Send a JSON response indicating success
//       res
//         .status(200)
//         .json({ message: "Data received successfully", receivedData: data });
//     } catch (error) {
//       // If there's an error, send a 500 (Internal Server Error) response
//       res.status(500).json({ message: "Error processing request", error });
//     }
//   } else {
//     // If the request is not a POST, send a 405 (Method Not Allowed) response
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

export async function POST(req: Request, res: NextApiResponse) {
  // Check the HTTP method of the request

  let userInput = "";
  if (req.method === "POST") {
    try {
      userInput = await req.json();
      userInput = JSON.stringify(userInput);
      console.log("userInput", userInput);
    } catch (error) {
      // If there's an error, send a 500 (Internal Server Error) response
      res.status(500).json({ message: "Error processing request", error });
    }
  } else {
    // If the request is not a POST, send a 405 (Method Not Allowed) response
    res.status(405).json({ message: "Method not allowed" });
  }

  // console.log("Hello, world! and the userInput is", userInput);
  // console.log("user input type", typeof userInput); // This will print the type of userInput
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Ensure that the OPENAI_API_KEY environment variable is set properly
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: genSampleCodeInstructions },
        {
          role: "user",
          content: userInput,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
      tools: [{ type: "function", function: getTutorialTool }],
    }),
  });

  const data = await response.json();
  console.log("data from openai", data);

  // Assuming Response.json is your intended response handling
  return Response.json(data);
}
