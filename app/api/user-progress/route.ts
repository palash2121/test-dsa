import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
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

    const progress = await UserProgress.find({ userId: decoded.id });

    // Return a map or list of completed subtopic IDs
    const completedSubtopicIds = progress.map((p) => p.subtopicId.toString());

    return NextResponse.json({ success: true, data: completedSubtopicIds });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
    const { subtopicId, topicId, completed } = await req.json();

    await dbConnect();

    if (completed) {
      // Create progress record
      await UserProgress.create({
        userId: decoded.id,
        subtopicId,
        topicId,
        status: "Completed",
      });
    } else {
      // Remove progress record
      await UserProgress.findOneAndDelete({
        userId: decoded.id,
        subtopicId,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Handle duplicate key error gracefully (if user clicks fast)
    if (error.code === 11000) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
