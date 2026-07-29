import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/auth";

export async function dashboardStats(_req: AuthedRequest, res: Response) {
  const [totalUsers, totalEvents, totalRegistrations, confirmedRegistrations, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.payment.aggregate({ where: { status: "SUCCESS" }, _sum: { amount: true } }),
  ]);

  const byCategory = await prisma.event.groupBy({
    by: ["category"],
    _count: { _all: true },
  });

  res.json({
    stats: {
      totalUsers,
      totalEvents,
      totalRegistrations,
      confirmedRegistrations,
      revenue: revenue._sum.amount ?? 0,
      byCategory: byCategory.map((c) => ({ category: c.category, count: c._count._all })),
    },
  });
}

export async function listUsers(req: AuthedRequest, res: Response) {
  const search = typeof req.query.search === "string" ? req.query.search : undefined;
  const users = await prisma.user.findMany({
    where: search
      ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }] }
      : undefined,
    select: { id: true, name: true, email: true, role: true, college: true, createdAt: true, _count: { select: { registrations: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ users });
}

export async function listRegistrations(req: AuthedRequest, res: Response) {
  const search = typeof req.query.search === "string" ? req.query.search : undefined;
  const eventId = typeof req.query.eventId === "string" ? req.query.eventId : undefined;

  const registrations = await prisma.registration.findMany({
    where: {
      ...(eventId ? { eventId } : {}),
      ...(search
        ? {
            OR: [
              { user: { name: { contains: search, mode: "insensitive" } } },
              { user: { email: { contains: search, mode: "insensitive" } } },
              { event: { title: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    include: { user: true, event: true, payment: true },
    orderBy: { createdAt: "desc" },
  });
  res.json({ registrations });
}

export async function exportRegistrationsCsv(req: AuthedRequest, res: Response) {
  const registrations = await prisma.registration.findMany({
    include: { user: true, event: true, payment: true },
    orderBy: { createdAt: "desc" },
  });

  const header = "Ticket Code,User Name,Email,Event,Status,Amount,Payment Status,Registered At\n";
  const rows = registrations
    .map((r) =>
      [
        r.ticketCode,
        r.user.name,
        r.user.email,
        r.event.title,
        r.status,
        r.payment?.amount ?? 0,
        r.payment?.status ?? "N/A",
        r.createdAt.toISOString(),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=registrations.csv");
  res.send(header + rows);
}
