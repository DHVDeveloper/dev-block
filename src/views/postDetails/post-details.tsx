'use client'
import { PostView } from "@/domain/interfaces/post/post.interface";
import { Page } from "@/shared/components/page";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuCalendar } from "react-icons/lu";
import { PostDetailsSkeleton } from "./post-details.skeleton";
import ReactMarkdown from "react-markdown";

export function PostDetailsPage({ ulid }: { ulid: string }) {
    const [post, setPost] = useState<PostView>();

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`http://localhost:3000/api/posts/${ulid}`);
            const postsResponse: PostView = await response.json();
            setPost(postsResponse);
        };
        getPostDetails();
    }, [ulid]);

    if (!post) return <PostDetailsSkeleton />;

    return (
        <Page title={post.title}>
            <div className="flex justify-center items-center gap-2">
                <span className="px-2 py-1 flex items-center gap-1 rounded-md text-[#064e3b] bg-[#4cffcf25]">
                    <FaRegUser /> {post.author.name}
                </span>
                <span className="px-2 py-1 flex items-center gap-1 rounded-md text-[#064e3b] bg-[#4cffcf25]">
                    <LuCalendar /> {formatDate(post.createdAt)}
                </span>
            </div>

            <hr className="my-6 block border-b border-t-0 border border-[#ebecf0]" />

            <div className="prose prose-neutral max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </Page>
    );
}