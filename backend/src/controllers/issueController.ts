import { eq, or } from "drizzle-orm";
import { db } from "../config/db.js";
import { issueTable, userTable } from "../drizzle/schema.js";


export default async function addIssues(req:any,res:any){
    try{
        const {
            title,
            description,
            category,
            priority,
            visibility,
            images,
            createdBy,
            assignedTo,
            hostel,
            block,
            room,
        } = req.body;

        if(!title || !priority || !visibility || !createdBy) {
            return res.status(400).json({
                message: "Missing required field"
            });
        }

        const issue = await db.insert(issueTable).values({
            title,
            description,
            category,
            priority,
            visibility,
            images,
            createdBy,
            assignedTo,
            hostel,
            block,
            room,
        })
        .returning()

        res.status(201).json({
            message:"issue created successfully",
            issue:issue[0]
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Failed to create issue"
        })
    }
    
}

export const getIssues = async (req: any, res: any) => {
  try {
    const { status, hostel } = req.query;

    let query: any = db.select().from(issueTable);

    if (status) {
      query = query.where(eq(issueTable.status, status as any));
    }

    if (hostel) {
      query = query.where(eq(issueTable.hostel, hostel as string));
    }

    const issues = await query;

    res.status(200).json({
      count: issues.length,
      issues,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch issues",
    });
  }
};

export const getMyIssue = async(req:any,res:any) => {
  try{
    const userId = req.user?.id;

    if(!userId){
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const issues = await db.select()
    .from(issueTable)
    .where(
      or(
        eq(issueTable.createdBy,userId)
      )
    )

    return res.status(200).json({
      success: true,
      count:issues.length,
      issues
    })
  }catch(error){
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}