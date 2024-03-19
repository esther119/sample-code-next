import { comments } from "./data";

export async function GET() {
  // Send a JSON response with the sample data
  return Response.json(comments);
}
