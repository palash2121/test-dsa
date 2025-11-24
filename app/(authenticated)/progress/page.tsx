import dbConnect from "@/lib/db";
import Subtopic from "@/models/Subtopic";
import UserProgress from "@/models/UserProgress";
import { getServerUserId } from "@/lib/server-utils";
import ProgressClient from "./progress-client";

export const dynamic = "force-dynamic";

async function getProgressData() {
    await dbConnect();

    const userId = await getServerUserId();

    if (!userId) {
        throw new Error("Not authenticated");
    }

    // Fetch all subtopics
    const allSubtopics = await Subtopic.find({}).lean();

    // Fetch user's progress
    const userProgress = await UserProgress.find({ userId }).lean();
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

    return stats;
}

export default async function ProgressPage() {
    const stats = await getProgressData();

    return <ProgressClient stats={stats} />;
}
