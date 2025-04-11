import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/utils/getUserFromCookie'
import { NextRequest, NextResponse } from 'next/server'
import { ulid } from 'ulid'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const skip = (page - 1) * pageSize

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: pageSize,
      where: { published: true },
      include: {
        author: { select: { id: true, name: true } },
        _count: { select: { likes: true, comments: true } }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.post.count({ where: { published: true } })
  ])

  return NextResponse.json({ posts, total })
}


export async function POST(req: NextRequest) {
    const user = await getAuthUser(req)
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'No autenticado' }),
        { status: 401 }
      )
    }
  
    const { title, content } = await req.json()
  
    if (!title || !content) {
      return new NextResponse(
        JSON.stringify({ error: 'Título y contenido son requeridos' }),
        { status: 400 }
      )
    }
  
    try {
      const newPost = await prisma.post.create({
        data: {
          ulid: ulid(),
          title,
          content,
          authorId: Number(user.id),
          published: true,
        }
      })
  
      return NextResponse.json(newPost)
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: 'Error al crear el post' }),
        { status: 500 }
      )
    }
  }
  