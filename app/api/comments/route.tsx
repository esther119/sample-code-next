import { comments } from "./data";

export async function GET() {
  // Send a JSON response with the sample data
  return Response.json(comments);
}

export async function POST(request: Request) {
  const incomingComment = await request.json();
  const newComment = {
    id: 15,
    ...incomingComment,
  };
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
