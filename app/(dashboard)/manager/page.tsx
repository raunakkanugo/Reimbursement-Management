import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ManagerDashboardClient from "./components/ManagerDashboardClient";

export default async function ManagerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  // Fetch expenses to manage
  // In a real app, you'd check workflows. Assuming Manager approves their team's SUBMITTED/PENDING expenses.
  const allTeamExpenses = await prisma.expense.findMany({
    where: { 
        companyId: session.user.companyId,
        employee: { managerId: session.user.id } 
    },
    include: { employee: true },
    orderBy: { submittedAt: 'desc' }
  });

  const pendingApprovals = allTeamExpenses.filter(e => e.status === 'SUBMITTED' || e.status === 'PENDING');
  const approvedToday = 8; // Stub: Calculate from approval table 
  const rejectedToday = 2; // Stub: Calculate from approval table
  const escalated = 1;     // Stub 

  const metrics = {
    pending: pendingApprovals.length,
    approved: approvedToday,
    rejected: rejectedToday,
    escalated: escalated,
    avgTime: "4.2 hrs"
  };

  return <ManagerDashboardClient user={session.user} metrics={metrics} pendingApprovals={pendingApprovals} allTeamExpenses={allTeamExpenses} />;
}
