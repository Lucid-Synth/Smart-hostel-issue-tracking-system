import { db } from "../config/db.js";
import { announcementTable } from "../drizzle/schema.js";

export const createAnnouncement = async (req:any, res:any) => {
  const {
    title,
    message,
  } = req.body;

  const [announcement] = await db
    .insert(announcementTable)
    .values({
      title,
      message,
    })
    .returning();

  res.status(201).json(announcement);
};

export const getAnnouncements = async (req:any, res:any) => {

  const data = await db
    .select()
    .from(announcementTable)
    .orderBy(announcementTable.createdAt);

  res.json(data);
};