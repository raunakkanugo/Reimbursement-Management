import "./manager.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ManagerLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "EMPLOYEE") redirect("/employee");
  
  return <div className="manager-scope">{children}</div>;
}
