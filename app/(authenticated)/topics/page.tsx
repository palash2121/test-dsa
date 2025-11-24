import dbConnect from "@/lib/db";
import Topic from "@/models/Topic";
import Subtopic from "@/models/Subtopic";
import UserProgress from "@/models/UserProgress";
import { getServerUserId } from "@/lib/server-utils";
import TopicsClient from "./topics-client";

export const dynamic = "force-dynamic";

async function getTopicsData() {
    await dbConnect();

    const userId = await getServerUserId();

    if (!userId) {
        throw new Error("Not authenticated");
    }

    // Fetch all topics
    const topics = await Topic.find({}).lean();

    // Fetch all subtopics
    const subtopics = await Subtopic.find({}).lean();

    // Fetch user progress
    const userProgress = await UserProgress.find({ userId }).lean();

    // Map subtopics to topics
    const topicsWithSubtopics = topics.map((topic: any) => {
        return {
            _id: topic._id.toString(),
            name: topic.name,
            subtopics: subtopics
                .filter((sub: any) => sub.topicId.toString() === topic._id.toString())
                .map((sub: any) => ({
                    _id: sub._id.toString(),
                    name: sub.name,
                    leetCodeLink: sub.leetCodeLink,
                    youtubeLink: sub.youtubeLink,
                    articleLink: sub.articleLink,
                    level: sub.level,
                })),
        };
    });

    // Get completed subtopic IDs
    const completedSubtopicIds = userProgress.map((p: any) =>
        p.subtopicId.toString()
    );

    return {
        topics: topicsWithSubtopics,
        completedSubtopicIds,
    };
}

export default async function TopicsPage() {
    const data = await getTopicsData();

    return <TopicsClient initialData={data} />;
}
