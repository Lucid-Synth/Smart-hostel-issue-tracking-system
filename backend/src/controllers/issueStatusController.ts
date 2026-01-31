import { db } from "../config/db.js";
import { issueTable } from "../drizzle/schema.js";
import { issueStatusTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const updateIssueStatus = async (req: any, res: any) => {
  try {
    const { issueId } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "OPEN",
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const issue = await db
      .select()
      .from(issueTable)
      .where(eq(issueTable.id, Number(issueId)))
      .limit(1);

    if (issue.length === 0) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    const oldStatus = issue[0]?.status;

    if (oldStatus === status) {
      return res.status(400).json({
        message: "Issue already has this status",
      });
    }

    if (!oldStatus) {
      return res.status(400).json({
        message: "Invalid issue status",
      });
    }

    await db
      .update(issueTable)
      .set({ status })
      .where(eq(issueTable.id, Number(issueId)));


    await db.insert(issueStatusTable).values({
      issueId: Number(issueId),
      oldStatus,
      newStatus: status,
    });

    return res.status(200).json({
      message: "Issue status updated successfully",
    });
  } catch (error) {
    console.error("Update Issue Status Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
