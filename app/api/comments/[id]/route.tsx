// dynamic routing
import { comments } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const comment = comments.find(
    (comment) => comment.id === parseInt(params.id)
  );
  // Send a JSON response with the sample data
  return Response.json(comment);
}
