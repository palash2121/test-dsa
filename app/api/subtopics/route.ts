import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subtopic from "@/models/Subtopic";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const subtopic = await Subtopic.create(body);
    return NextResponse.json(
      { success: true, data: subtopic },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
