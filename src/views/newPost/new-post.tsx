"use client";
import { Page } from "@/shared/components/page";
import { useState, useEffect, useRef } from "react";
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  ListsToggle,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function NewPostPage() {
  const [content, setContent] = useState("");
  const [title,setTitle] = useState("")
  const isMounted = useRef(false);
  const router = useRouter()
  useEffect(() => {
    setContent(`# Daniel Vieira
### Prueba de post
`);
    return () => {
      isMounted.current = false;
    };
  }, []);


  const handleMarkdownChange = (value: string) => {
      setContent(value);
  };

  const createPost = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content}),
      headers: { "Content-Type": "application/json" },
    });
    if(!res.ok) return
    router.push('/blog')
  };

  return (
    <Page title="Create post">
      <div className="h-[80vh]">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/blog"
            className="text-[#064e3b] text-sm transition-all p-3 py-2 text-center hover:bg-[#4cffcf25] flex items-center gap-1 group"
          >
            <span className=" transition-all scale-0 group-hover:scale-100">
              <FaLongArrowAltLeft />
            </span>
            Back to list
          </Link>
          <button
            onClick={createPost}
            className="bg-black px-4 py-2 text-sm cursor-pointer text-white transition-all rounded-md mb-3 hover:bg-black/80"
          >
            Create post +
          </button>
        </div>
        <div className="flex justify-center items-center flex-col w-full mb-2">
          <label htmlFor="title" className="text-sm font-bold">BLOG TITLE</label>
          <div className="w-full lg:w-[50%] border border-[#DFDFDF] px-2 h-8 rounded-md">
            <input onChange={(e) => setTitle(e.target.value)} value={title} name="title" type="text" className="outline-none w-full h-full"/>
          </div>
        </div>
        <MDXEditor
          markdown={content}
          onChange={handleMarkdownChange}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            quotePlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                </>
              ),
            }),
          ]}
          contentEditableClassName="prose max-w-none"
        />
      </div>
    </Page>
  );
}
