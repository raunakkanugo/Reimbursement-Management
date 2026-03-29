import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Navbar, Hero, DashboardMetrics, QuickActions, RecentClaims, ApprovalTracker, OcrUpload, Footer
} from "./components/EmployeeComponents";
import ExpenseForm from "./components/ExpenseForm";

export default async function EmployeeDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) return null;

  // Fetch relevant server-side data
  const expenses = await prisma.expense.findMany({
    where: { employeeId: session.user.id },
    orderBy: { submittedAt: 'desc' },
    include: { approvals: true }
  });

  const totalSubmitted = expenses.length;
  const pending = expenses.filter(e => e.status === 'PENDING' || e.status === 'SUBMITTED').length;
  const approved = expenses.filter(e => e.status === 'APPROVED' || e.status === 'REIMBURSED').length;
  const reimbursedAmount = expenses
    .filter(e => e.status === 'REIMBURSED')
    .reduce((sum, e) => sum + e.amountInCompanyCurrency, 0);

  const metrics = { totalSubmitted, pending, approved, reimbursedAmount };

  return (
    <>
      <Navbar user={session.user} />
      <Hero />
      <DashboardMetrics metrics={metrics} />
      <QuickActions />
      <ExpenseForm companyId={session.user.companyId} employeeId={session.user.id} />
      <RecentClaims expenses={expenses} />
      <ApprovalTracker recentExpense={expenses[0]} />
      <OcrUpload />
      <Footer />
    </>
  );
}
