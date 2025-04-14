import { PostDetailsPage } from "@/views/postDetails/post-details";

export default async function PostDetails({
  params,
}: {
  params: Promise<{ ulid: string }>;
}) {
  const { ulid } = await params;
  return <PostDetailsPage ulid={ulid}/>;
}
