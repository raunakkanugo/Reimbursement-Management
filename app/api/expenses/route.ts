import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, amountOriginal, originalCurrency, category, expenseDate, description, notes, status } = body;

    if (!title || !amountOriginal || !category || !expenseDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Default currency simulation / fallback 
    let amountInCompanyCurrency = amountOriginal;
    if (originalCurrency !== "INR") {
      // Mock currency conversion logic
      amountInCompanyCurrency = amountOriginal * 80; // Assuming USD -> INR
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amountOriginal,
        originalCurrency,
        amountInCompanyCurrency,
        category,
        description,
        notes,
        expenseDate: new Date(expenseDate),
        status,
        submittedAt: status === "SUBMITTED" ? new Date() : null,
        employeeId: session.user.id,
        companyId: session.user.companyId,
      }
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Expense creation error", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
