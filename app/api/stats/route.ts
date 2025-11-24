import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Subtopic from "@/models/Subtopic";
import UserProgress from "@/models/UserProgress";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    await dbConnect();

    // Fetch all subtopics
    const allSubtopics = await Subtopic.find({});

    // Fetch user's progress
    const userProgress = await UserProgress.find({ userId: decoded.id });
    const completedSubtopicIds = new Set(
      userProgress.map((p: any) => p.subtopicId.toString())
    );

    // Calculate stats
    const stats = {
      total: allSubtopics.length,
      completed: completedSubtopicIds.size,
      percentage:
        allSubtopics.length > 0
          ? Math.round((completedSubtopicIds.size / allSubtopics.length) * 100)
          : 0,
      easy: { total: 0, completed: 0, percentage: 0 },
      medium: { total: 0, completed: 0, percentage: 0 },
      hard: { total: 0, completed: 0, percentage: 0 },
    };

    allSubtopics.forEach((subtopic: any) => {
      const level = subtopic.level.toLowerCase() as "easy" | "medium" | "hard";
      if (stats[level]) {
        stats[level].total++;
        if (completedSubtopicIds.has(subtopic._id.toString())) {
          stats[level].completed++;
        }
      }
    });

    // Calculate percentages for each level
    (["easy", "medium", "hard"] as const).forEach((level) => {
      if (stats[level].total > 0) {
        stats[level].percentage = Math.round(
          (stats[level].completed / stats[level].total) * 100
        );
      }
    });

    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
