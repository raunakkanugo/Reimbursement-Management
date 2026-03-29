import "./employee.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EmployeeLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "EMPLOYEE") {
    if (session?.user.role === "MANAGER") redirect("/manager");
    if (session?.user.role === "ADMIN") redirect("/admin");
  }

  return <div className="employee-scope">{children}</div>;
}
