import { Response } from "express";
import { z } from "zod";
import QRCode from "qrcode";
import { prisma } from "../lib/prisma";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";

export async function createRegistration(req: AuthedRequest, res: Response) {
  const { eventId } = z.object({ eventId: z.string() }).parse(req.body);
  const userId = req.user!.userId;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) throw new ApiError(404, "Event not found.");

  if (event._count.registrations >= event.maxParticipants) {
    throw new ApiError(400, "This event is full.");
  }

  const existing = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (existing) throw new ApiError(409, "You're already registered for this event.");

  // Free events are confirmed instantly. Paid events wait for payment.
  const registration = await prisma.registration.create({
    data: {
      userId,
      eventId,
      status: event.fee === 0 ? "CONFIRMED" : "PENDING_PAYMENT",
    },
    include: { event: true },
  });

  if (event.fee > 0) {
    await prisma.payment.create({
      data: { registrationId: registration.id, amount: event.fee, status: "PENDING" },
    });
  }

  res.status(201).json({ registration });
}

export async function myRegistrations(req: AuthedRequest, res: Response) {
  const registrations = await prisma.registration.findMany({
    where: { userId: req.user!.userId },
    include: { event: true, payment: true },
    orderBy: { createdAt: "desc" },
  });
  res.json({ registrations });
}

export async function cancelRegistration(req: AuthedRequest, res: Response) {
  const registration = await prisma.registration.findUnique({ where: { id: req.params.id } });
  if (!registration || registration.userId !== req.user!.userId) {
    throw new ApiError(404, "Registration not found.");
  }
  await prisma.registration.update({ where: { id: registration.id }, data: { status: "CANCELLED" } });
  res.json({ message: "Registration cancelled." });
}

export async function getTicket(req: AuthedRequest, res: Response) {
  const registration = await prisma.registration.findUnique({
    where: { id: req.params.id },
    include: { event: true, user: true },
  });
  if (!registration || registration.userId !== req.user!.userId) {
    throw new ApiError(404, "Registration not found.");
  }
  if (registration.status !== "CONFIRMED") {
    throw new ApiError(400, "Ticket is only available once registration is confirmed.");
  }

  const qrDataUrl = await QRCode.toDataURL(registration.ticketCode);
  res.json({
    ticket: {
      code: registration.ticketCode,
      qrDataUrl,
      eventTitle: registration.event.title,
      venue: registration.event.venue,
      startsAt: registration.event.startsAt,
      attendee: registration.user.name,
    },
  });
}
