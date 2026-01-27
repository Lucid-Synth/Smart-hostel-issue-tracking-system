import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["STUDENT", "MANAGEMENT"]);

export const issueVisibilityEnum = pgEnum("issue_visibility", [
  "PUBLIC",
  "PRIVATE",
]);

export const issuePriorityEnum = pgEnum("issue_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
]);

export const issueStatusEnum = pgEnum("issue_status", [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
]);

export const userTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull(),
  hostel: varchar("hostel", { length: 100 }),
  block: varchar("block", { length: 50 }),
  room: varchar("room", { length: 50 }),
});


export const issueTable = pgTable("issue_table", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  priority: issuePriorityEnum("priority").notNull(),
  status: issueStatusEnum("status").notNull().default("OPEN"),
  visibility: issueVisibilityEnum("visibility").notNull(),
  images: text("images").array(), // array of image URLs
  createdBy: integer("created_by")
    .notNull()
    .references(() => userTable.id),
  assignedTo: integer("assigned_to").references(() => userTable.id),
  hostel: varchar("hostel", { length: 100 }),
  block: varchar("block", { length: 50 }),
  room: varchar("room", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const issueStatusTable = pgTable("issue_status_table", {
  id: serial("id").primaryKey(),
  issueId: integer("issue_id")
    .notNull()
    .references(() => issueTable.id),
  oldStatus: issueStatusEnum("old_status").notNull(),
  newStatus: issueStatusEnum("new_status").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const announcementTable = pgTable("announcement_table", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  targetHostel: varchar("target_hostel", { length: 100 }),
  targetBlock: varchar("target_block", { length: 50 }),
  targetRole: roleEnum("target_role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});