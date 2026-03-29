import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient, Role, ApproverType } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';


const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log('Seeding database...');
  
  // Clean up
  await prisma.updateAnnouncement.deleteMany();
  await prisma.expenseApproval.deleteMany();
  await prisma.approvalStep.deleteMany();
  await prisma.approvalRule.deleteMany();
  await prisma.approvalWorkflow.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  // Create Company
  const company = await prisma.company.create({
    data: {
      name: 'Odoo Demo Corp',
      country: 'India',
      defaultCurrency: 'INR',
    },
  });

  const passwordHash = await bcrypt.hash('password123', 10);

  // Users
  const admin = await prisma.user.create({
    data: {
      fullName: 'Alice Admin',
      email: 'admin@odoo.com',
      passwordHash,
      role: Role.ADMIN,
      companyId: company.id,
      department: 'Management',
    },
  });

  const manager1 = await prisma.user.create({
    data: {
      fullName: 'Bob Manager',
      email: 'bob@odoo.com',
      passwordHash,
      role: Role.MANAGER,
      companyId: company.id,
      department: 'Engineering',
    },
  });

  const employee1 = await prisma.user.create({
    data: {
      fullName: 'Charlie Employee',
      email: 'charlie@odoo.com',
      passwordHash,
      role: Role.EMPLOYEE,
      companyId: company.id,
      managerId: manager1.id,
      department: 'Engineering',
    },
  });

  // Workflow
  const workflow = await prisma.approvalWorkflow.create({
    data: {
      name: 'Standard Engineering Expense Workflow',
      companyId: company.id,
      isActive: true,
      steps: {
        create: [
          {
            stepOrder: 1,
            approverType: ApproverType.MANAGER,
            isManagerApprover: true,
          },
          {
            stepOrder: 2,
            approverType: ApproverType.SPECIFIC_USER,
            specificUserId: admin.id,
            isManagerApprover: false,
          }
        ]
      }
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
