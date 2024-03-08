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

export async function POST() {
  console.log("Hello, world!");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Ensure that the OPENAI_API_KEY environment variable is set properly
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: genSampleCodeInstructions }],
      temperature: 0.7,
      response_format: { type: "json_object" },
      tools: [{ type: "function", function: getTutorialTool }],
    }),
  });

  const data = await res.json();

  // Assuming Response.json is your intended response handling
  return Response.json(data);
}
