import { authOptions } from "@/lib/auth";
import { NewPostPage } from "@/views/newPost/new-post";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewPost(){
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/login");
    }
  
    return(<NewPostPage/>)
}