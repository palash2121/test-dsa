import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Topic from "@/models/Topic";
import Subtopic from "@/models/Subtopic";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all topics
    const topics = await Topic.find({}).lean();

    // Fetch all subtopics
    const subtopics = await Subtopic.find({}).lean();

    // Map subtopics to topics
    const topicsWithSubtopics = topics.map((topic: any) => {
      return {
        ...topic,
        subtopics: subtopics.filter(
          (sub: any) => sub.topicId.toString() === topic._id.toString()
        ),
      };
    });

    return NextResponse.json({ success: true, data: topicsWithSubtopics });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const topic = await Topic.create(body);
    return NextResponse.json({ success: true, data: topic }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
