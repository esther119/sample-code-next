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
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
    }),
  });

  const data = await res.json();

  // Assuming Response.json is your intended response handling
  return Response.json(data);
}
