import { Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/auth";

const sponsorSchema = z.object({
  name: z.string().min(2),
  tier: z.string().min(2),
  logoUrl: z.string().url(),
  website: z.string().url().optional(),
});

export async function listSponsors(_req: AuthedRequest, res: Response) {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { tier: "asc" } });
  res.json({ sponsors });
}

export async function createSponsor(req: AuthedRequest, res: Response) {
  const data = sponsorSchema.parse(req.body);
  const sponsor = await prisma.sponsor.create({ data });
  res.status(201).json({ sponsor });
}

export async function deleteSponsor(req: AuthedRequest, res: Response) {
  await prisma.sponsor.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
