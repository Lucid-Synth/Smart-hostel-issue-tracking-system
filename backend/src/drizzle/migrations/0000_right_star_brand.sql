CREATE TYPE "public"."issue_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."issue_status" AS ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');--> statement-breakpoint
CREATE TYPE "public"."issue_visibility" AS ENUM('PUBLIC', 'PRIVATE');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('STUDENT', 'MANAGEMENT');--> statement-breakpoint
CREATE TABLE "announcement_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"target_hostel" varchar(100),
	"target_block" varchar(50),
	"target_role" "role",
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_status_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"issue_id" integer NOT NULL,
	"old_status" "issue_status" NOT NULL,
	"new_status" "issue_status" NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(100),
	"priority" "issue_priority" NOT NULL,
	"status" "issue_status" DEFAULT 'OPEN' NOT NULL,
	"visibility" "issue_visibility" NOT NULL,
	"images" text[],
	"created_by" integer NOT NULL,
	"assigned_to" integer,
	"hostel" varchar(100),
	"block" varchar(50),
	"room" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" NOT NULL,
	"hostel" varchar(100),
	"block" varchar(50),
	"room" varchar(50),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "issue_status_table" ADD CONSTRAINT "issue_status_table_issue_id_issue_table_id_fk" FOREIGN KEY ("issue_id") REFERENCES "public"."issue_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_table" ADD CONSTRAINT "issue_table_created_by_users_table_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_table" ADD CONSTRAINT "issue_table_assigned_to_users_table_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;