import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, country, fullName, email, password } = body;

    if (!companyName || !country || !fullName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Default currency logic
    const defaultCurrency = country === "India" ? "INR" : "USD";

    // Create Company and Admin user in a transaction
    const company = await prisma.$transaction(async (tx) => {
      const newComp = await tx.company.create({
        data: {
          name: companyName,
          country,
          defaultCurrency,
        },
      });

      await tx.user.create({
        data: {
          fullName,
          email,
          passwordHash,
          role: Role.ADMIN,
          companyId: newComp.id,
        },
      });

      return newComp;
    });

    return NextResponse.json({ message: "Account created successfully", companyId: company.id }, { status: 201 });
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
