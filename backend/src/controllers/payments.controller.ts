import { Response } from "express";
import { prisma } from "../lib/prisma";
import { paymentProvider } from "../lib/paymentProvider";
import { ApiError } from "../middleware/errorHandler";
import { AuthedRequest } from "../middleware/auth";

export async function initiatePayment(req: AuthedRequest, res: Response) {
  const registration = await prisma.registration.findUnique({
    where: { id: req.params.registrationId },
    include: { payment: true, event: true },
  });

  if (!registration || registration.userId !== req.user!.userId) {
    throw new ApiError(404, "Registration not found.");
  }
  if (!registration.payment) throw new ApiError(400, "This event does not require payment.");
  if (registration.payment.status === "SUCCESS") throw new ApiError(400, "Already paid.");

  const order = await paymentProvider.createOrder({
    amount: registration.payment.amount,
    registrationId: registration.id,
  });

  await prisma.payment.update({
    where: { registrationId: registration.id },
    data: { providerRefId: order.providerRefId },
  });

  res.json({
    order,
    provider: paymentProvider.name,
    event: { title: registration.event.title, fee: registration.event.fee },
  });
}

export async function confirmPayment(req: AuthedRequest, res: Response) {
  const registration = await prisma.registration.findUnique({
    where: { id: req.params.registrationId },
    include: { payment: true },
  });

  if (!registration || registration.userId !== req.user!.userId) {
    throw new ApiError(404, "Registration not found.");
  }
  if (!registration.payment) throw new ApiError(400, "This event does not require payment.");

  const verified = await paymentProvider.verifyPayment({
    providerRefId: registration.payment.providerRefId || "",
    payload: req.body ?? {},
  });

  if (!verified) {
    await prisma.payment.update({ where: { registrationId: registration.id }, data: { status: "FAILED" } });
    throw new ApiError(400, "Payment verification failed.");
  }

  await prisma.$transaction([
    prisma.payment.update({ where: { registrationId: registration.id }, data: { status: "SUCCESS" } }),
    prisma.registration.update({ where: { id: registration.id }, data: { status: "CONFIRMED" } }),
  ]);

  res.json({ message: "Payment successful. Registration confirmed." });
}
