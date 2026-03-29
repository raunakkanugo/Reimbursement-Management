import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user.role !== "MANAGER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { expenseId, decision, comment } = await req.json();

    if (!expenseId || !decision) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const expense = await prisma.expense.findUnique({
      where: { id: expenseId }
    });

    if (!expense) {
       return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    // Workflow Engine Simulation. 
    // Usually, we'd check `ApprovalStep` against `currentApprovalStep`, 
    // log the ExpenseApproval, and advance the step or finalize.
    // For demo purposes, we will finalize it in one step.

    const newStatus = decision === "APPROVED" ? "APPROVED" : "REJECTED";

    // Find or create workflow and step separately to avoid nested connect TS issues
    let workflow = await prisma.approvalWorkflow.findFirst({
      where: { companyId: session.user.companyId }
    });

    if (!workflow) {
      workflow = await prisma.approvalWorkflow.create({
        data: {
          name: "Default Workflow",
          companyId: session.user.companyId
        }
      });
    }

    let step = await prisma.approvalStep.findFirst({
      where: { workflowId: workflow.id, approverType: "MANAGER" }
    });

    if (!step) {
      step = await prisma.approvalStep.create({
        data: {
          stepOrder: 1,
          approverType: "MANAGER",
          workflowId: workflow.id,
          isManagerApprover: true
        }
      });
    }

    // 1. Log the approval action
    await prisma.expenseApproval.create({
      data: {
        decision: decision as "APPROVED" | "REJECTED",
        comment,
        decidedAt: new Date(),
        expenseId,
        approverId: session.user.id,
        stepId: step.id
      }
    });

    // 2. Update the Expense status
    await prisma.expense.update({
      where: { id: expenseId },
      data: { status: newStatus }
    });

    return NextResponse.json({ message: "Approval processed" });
  } catch (error) {
    console.error("Approval error", error);
    return NextResponse.json({ error: "Failed to process approval" }, { status: 500 });
  }
}
