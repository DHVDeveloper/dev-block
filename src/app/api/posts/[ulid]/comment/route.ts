import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthUser } from "@/utils/getUserFromCookie"
import { ulid } from "ulid"

export async function POST(req: NextRequest, { params }: { params: Promise <{ ulid: string }> }) {
  const user = await getAuthUser(req)
  const { ulid: postUlid } = await params
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const { content } = await req.json()

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "Contenido no válido" }, { status: 400 })
  }

  const post = await prisma.post.findUnique({
    where: { ulid: postUlid }
  })

  if (!post) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 })
  }

  const comment = await prisma.comment.create({
    data: {
      ulid: ulid(),
      content: content.trim(),
      authorId: parseInt(user.id),
      postId: post.id
    }
  })

  return NextResponse.json(comment, { status: 201 })
}
