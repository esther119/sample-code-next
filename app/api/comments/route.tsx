import { comments } from "./data";
import { NextResponse } from "next/server";

export async function GET() {
  // Send a JSON response with the sample data
  return Response.json(comments);
}

// Sol 1
// export async function POST(request: Request) {
//   const incomingComment = await request.json(); //syntax importance
//   const newComment = {
//     id: 15,
//     ...incomingComment,
//   };
//   comments.push(newComment);
//   return new Response(JSON.stringify(newComment), {
//     headers: { "Content-Type": "application/json" },
//     status: 201,
//   });
// }

// Sol 2
export async function POST(request: NextResponse) {
  const incomingComment = await request.json(); //syntax importance
  const newComment = {
    id: 15,
    ...incomingComment,
  };
  comments.push(newComment);
  return new NextResponse(JSON.stringify(newComment), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
