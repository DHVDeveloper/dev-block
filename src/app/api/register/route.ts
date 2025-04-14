import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid"; 
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  
  const { email, name, password } = await req.json();
  
  if (!email || !name || !password) {
    return new NextResponse(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return new NextResponse(
      JSON.stringify({ message: "This email is already registered" }),
      { status: 409 }
    );
  }

  if (password.length < 6) {
    return new NextResponse(
      JSON.stringify({ message: "The password must be at least 6 characters long" }),
      { status: 400 }
    );
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      ulid: ulid(), 
    },
  });

  return new NextResponse(JSON.stringify(user), { status: 201 });
}