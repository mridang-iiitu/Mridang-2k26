import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  await prisma.user.upsert({
    where: { email: "admin@mridangfest.in" },
    update: {},
    create: {
      name: "Fest Admin",
      email: "admin@mridangfest.in",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  const events = [
    {
      title: "Battle of Bands",
      slug: "battle-of-bands",
      category: "Music",
      description: "College bands go head to head in a high-energy live showdown on the main stage.",
      rules: "Bands of 4-8 members. 15 minute slot including setup. Original compositions earn bonus points.",
      venue: "Main Amphitheatre",
      startsAt: new Date("2026-10-10T18:00:00Z"),
      endsAt: new Date("2026-10-10T21:00:00Z"),
      fee: 500,
      maxParticipants: 20,
      prizePool: "₹50,000",
      posterUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    },
    {
      title: "Street Dance Circuit",
      slug: "street-dance-circuit",
      category: "Dance",
      description: "A knockout-style street dance battle with judges scoring on rhythm, energy, and originality.",
      rules: "Solo or crew (max 6). No props involving fire or liquids. Track submitted 48 hours in advance.",
      venue: "Open Air Theatre",
      startsAt: new Date("2026-10-11T16:00:00Z"),
      endsAt: new Date("2026-10-11T19:00:00Z"),
      fee: 300,
      maxParticipants: 40,
      prizePool: "₹30,000",
      posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800",
    },
    {
      title: "Hack the Fest",
      slug: "hack-the-fest",
      category: "Technology",
      description: "24-hour hackathon building tools for campus life. Bring a team, ship something real.",
      rules: "Teams of 2-4. All code written on-site. Open source libraries allowed.",
      venue: "Innovation Lab",
      startsAt: new Date("2026-10-09T09:00:00Z"),
      endsAt: new Date("2026-10-10T09:00:00Z"),
      fee: 0,
      maxParticipants: 100,
      prizePool: "₹1,00,000",
      posterUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    },
    {
      title: "Open Mic Poetry",
      slug: "open-mic-poetry",
      category: "Literary",
      description: "An intimate evening of spoken word, verse, and stories from campus voices.",
      rules: "5 minutes per performer. Original work only. Any language welcome.",
      venue: "Black Box Theatre",
      startsAt: new Date("2026-10-09T17:00:00Z"),
      endsAt: new Date("2026-10-09T19:30:00Z"),
      fee: 0,
      maxParticipants: 30,
      prizePool: "Certificates + Book Vouchers",
      posterUrl: "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=800",
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }

  await prisma.sponsor.createMany({
    data: [
      { name: "Nimbus Tech", tier: "Title Sponsor", logoUrl: "https://dummyimage.com/200x80/111/fff&text=NIMBUS" },
      { name: "Quartz Beverages", tier: "Powered By", logoUrl: "https://dummyimage.com/200x80/111/fff&text=QUARTZ" },
      { name: "Foundry Studios", tier: "Associate", logoUrl: "https://dummyimage.com/200x80/111/fff&text=FOUNDRY" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete. Admin login: admin@mridangfest.in / Admin@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
