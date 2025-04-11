import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthUser } from "@/utils/getUserFromCookie"
import { ulid } from "ulid"

export async function POST(req: NextRequest, { params }: { params: Promise <{ ulid: string }> }) {
  const user = await getAuthUser(req)
  const { ulid:postUlid } = await params

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const post = await prisma.post.findUnique({
    where: { ulid: postUlid }
  })

  if (!post) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 })
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: parseInt(user.id),
        postId: post.id
      }
    }
  })

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } })
    return NextResponse.json({ liked: false })
  } else {
    await prisma.like.create({
      data: {
        ulid: ulid(),
        userId: parseInt(user.id),
        postId: post.id
      }
    })
    return NextResponse.json({ liked: true })
  }
}
