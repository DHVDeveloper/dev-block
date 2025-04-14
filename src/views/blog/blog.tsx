"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PostView } from "@/domain/interfaces/post/post.interface";
import { Paginable } from "@/service/interfaces/paginable.interface";
import { Page } from "@/shared/components/page";
import { Post } from "@/shared/components/post";
import { BlogSkeleton } from "./blog.skeleton";

export function BlogPage() {
  const [posts, setPosts] = useState<PostView[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/posts");
      const postsResponse: Paginable<PostView> = await response.json();
      setPosts(postsResponse.items);
    };
    getData();
  }, []);

  const handleCreatePost = () => {
    if (status === "authenticated") {
      router.push("/blog/new-post");
    } else {
      router.push("/login");
    }
  };

  if (posts.length === 0) return <BlogSkeleton />;

  return (
    <Page title="Blog">
      <div className="w-full flex justify-end items-center">
        <button
          onClick={handleCreatePost}
          className="bg-black px-4 py-2 text-sm text-white rounded-md mb-3 hover:bg-black/80 transition"
        >
          Create post +
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {posts.map((post) => (
          <Post key={post.ulid} post={post} />
        ))}
      </div>
    </Page>
  );
}
