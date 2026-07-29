import { Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/auth";

const imageSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().optional(),
  album: z.string().default("General"),
});

export async function listImages(req: AuthedRequest, res: Response) {
  const album = typeof req.query.album === "string" ? req.query.album : undefined;
  const images = await prisma.galleryImage.findMany({
    where: album ? { album } : undefined,
    orderBy: { createdAt: "desc" },
  });
  res.json({ images });
}

export async function addImage(req: AuthedRequest, res: Response) {
  const data = imageSchema.parse(req.body);
  const image = await prisma.galleryImage.create({ data });
  res.status(201).json({ image });
}

export async function deleteImage(req: AuthedRequest, res: Response) {
  await prisma.galleryImage.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
