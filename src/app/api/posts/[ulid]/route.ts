import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { ulid: string } }) {
  const post = await prisma.post.findUnique({
    where: { ulid: params.ulid },
    include: {
      author: { select: { id: true, name: true } },
      comments: {
        include: { author: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' }
      },
      categories: true,
      _count: { select: { likes: true } }
    }
  })

  if (!post) return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 })

  return NextResponse.json(post)
}
