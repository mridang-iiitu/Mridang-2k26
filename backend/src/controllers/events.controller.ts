import { Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const eventSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  rules: z.string().min(5),
  venue: z.string().min(2),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  fee: z.number().int().min(0),
  maxParticipants: z.number().int().min(1),
  prizePool: z.string().optional(),
  posterUrl: z.string().url().optional(),
  coordinators: z.array(z.object({ name: z.string(), phone: z.string() })).optional(),
});

export async function listEvents(req: AuthedRequest, res: Response) {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const search = typeof req.query.search === "string" ? req.query.search : undefined;

  const events = await prisma.event.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: { startsAt: "asc" },
    include: { coordinators: true, _count: { select: { registrations: true } } },
  });

  res.json({ events });
}

export async function getEvent(req: AuthedRequest, res: Response) {
  const event = await prisma.event.findUnique({
    where: { slug: req.params.slug },
    include: { coordinators: true, _count: { select: { registrations: true } } },
  });
  if (!event) throw new ApiError(404, "Event not found.");

  const related = await prisma.event.findMany({
    where: { category: event.category, id: { not: event.id } },
    take: 3,
  });

  res.json({ event, related });
}

export async function createEvent(req: AuthedRequest, res: Response) {
  const data = eventSchema.parse(req.body);
  const event = await prisma.event.create({
    data: {
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: new Date(data.endsAt),
      slug: slugify(data.title),
      coordinators: data.coordinators ? { create: data.coordinators } : undefined,
    },
  });
  res.status(201).json({ event });
}

export async function updateEvent(req: AuthedRequest, res: Response) {
  const data = eventSchema.partial().parse(req.body);
  const event = await prisma.event.update({
    where: { id: req.params.id },
    data: {
      ...data,
      ...(data.startsAt ? { startsAt: new Date(data.startsAt) } : {}),
      ...(data.endsAt ? { endsAt: new Date(data.endsAt) } : {}),
      ...(data.title ? { slug: slugify(data.title) } : {}),
    },
  });
  res.json({ event });
}

export async function deleteEvent(req: AuthedRequest, res: Response) {
  await prisma.event.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
