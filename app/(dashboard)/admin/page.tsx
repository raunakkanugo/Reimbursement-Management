import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./components/AdminDashboardClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const companyId = session.user.companyId;

  // Real Database Metrics
  const totalEmployees = await prisma.user.count({ where: { companyId, role: "EMPLOYEE" }});
  const activeManagers = await prisma.user.count({ where: { companyId, role: "MANAGER" }});
  
  const companyExpenses = await prisma.expense.findMany({ where: { companyId }});
  const pendingApprovals = companyExpenses.filter(e => e.status === 'PENDING' || e.status === 'SUBMITTED').length;
  
  const totalCompanyExpenses = companyExpenses.reduce((sum, e) => sum + e.amountInCompanyCurrency, 0);
  const completedReimbursements = companyExpenses.filter(e => e.status === 'REIMBURSED').length;

  const metrics = {
    totalEmployees,
    activeManagers,
    pendingApprovals,
    totalCompanyExpenses,
    completedReimbursements
  };

  return <AdminDashboardClient metrics={metrics} />;
}
