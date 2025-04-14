import { PostView } from "@/domain/interfaces/post/post.interface";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { HiMiniUser, HiOutlineUserCircle } from "react-icons/hi2";
import { LuCalendar } from "react-icons/lu";
import { TiUser } from "react-icons/ti";
import ReactMarkdown from "react-markdown";

export function Post({ post }: { post: PostView }) {
  return (
    <div className="border w-full border-[#e5e7eb] bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg rounded-2xl">
      <div className="flex flex-col gap-2 space-y-1.5 p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <div
              key={category.ulid}
              className="inline-flex items-center border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-xs font-medium"
              data-v0-t="badge"
            ></div>
          ))}
        </div>
        <h3 className="text-xl text-wrap mb-0 max-w-[950%] font-bold leading-tight line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-3">
          <span className="relative flex shrink-0 overflow-hidden rounded-full justify-center items-center bg-[#efefef] h-8 w-8">
            {post.author.image ? (
              <img
                className="aspect-square h-full w-full"
                alt="User image"
                src={post.author.image}
              />
            ) : (
              <div className="text-[30px] text-[#3a3a3a]">
                <TiUser />
              </div>
            )}
          </span>
          <div className="text-sm">
            <p className="font-medium">{post.author.name}</p>
          </div>
        </div>
        <div className="text-sm line-clamp-3 text-[#71717a]">
          <div className="prose prose-neutral max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex text-[#71717a] gap-2 items-center">
              <LuCalendar />{" "}
              <span className="text-xs">{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex text-[#71717a] gap-2 items-center">
              <FaRegHeart />{" "}
              <span className="text-xs">{post.likes.length}</span>
            </div>
          </div>
          <Link
            href={`blog/${post.ulid}`}
            className=" transition-all text-sm rounded-md px-3 py-1 hover:bg-[#4cffcf25] hover:text-[#064e3b]"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
