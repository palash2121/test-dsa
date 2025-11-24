"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Subtopic {
    _id: string;
    name: string;
    leetCodeLink?: string;
    youtubeLink?: string;
    articleLink?: string;
    level: "Easy" | "Medium" | "Hard";
}

interface Topic {
    _id: string;
    name: string;
    subtopics: Subtopic[];
}

interface TopicsClientProps {
    initialData: {
        topics: Topic[];
        completedSubtopicIds: string[];
    };
}

export default function TopicsClient({ initialData }: TopicsClientProps) {
    const [completedSubtopics, setCompletedSubtopics] = useState<Set<string>>(
        new Set(initialData.completedSubtopicIds)
    );

    const handleCheckboxChange = async (
        subtopicId: string,
        topicId: string,
        checked: boolean
    ) => {
        // Optimistic update
        const newCompleted = new Set(completedSubtopics);
        if (checked) {
            newCompleted.add(subtopicId);
        } else {
            newCompleted.delete(subtopicId);
        }
        setCompletedSubtopics(newCompleted);

        try {
            await fetch("/api/user-progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subtopicId, topicId, completed: checked }),
            });
        } catch (error) {
            console.error("Failed to update progress", error);
            // Revert on failure
            if (checked) {
                newCompleted.delete(subtopicId);
            } else {
                newCompleted.add(subtopicId);
            }
            setCompletedSubtopics(new Set(newCompleted));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Topics</h1>
                <p className="text-gray-500">
                    Explore and track your progress across various DSA topics.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {initialData.topics.map((topic) => {
                    const completedCount = topic.subtopics.filter((s) =>
                        completedSubtopics.has(s._id)
                    ).length;
                    const totalCount = topic.subtopics.length;
                    const isTopicCompleted =
                        totalCount > 0 && completedCount === totalCount;

                    return (
                        <AccordionItem key={topic._id} value={topic._id}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <span>{topic.name}</span>
                                    <Badge
                                        variant={isTopicCompleted ? "default" : "secondary"}
                                        className={
                                            isTopicCompleted ? "bg-green-600 hover:bg-green-700" : ""
                                        }
                                    >
                                        {isTopicCompleted ? "Completed" : "Pending"}
                                    </Badge>
                                    <span className="text-sm font-normal text-gray-500">
                                        ({completedCount}/{totalCount} problems)
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]"></TableHead>
                                                <TableHead className="w-[100px]">Name</TableHead>
                                                <TableHead className="w-[100px]">
                                                    LeetCode Link
                                                </TableHead>
                                                <TableHead className="w-[100px]">
                                                    YouTube Link
                                                </TableHead>
                                                <TableHead className="w-[100px]">
                                                    Article Link
                                                </TableHead>
                                                <TableHead className="w-[100px]">Level</TableHead>
                                                <TableHead className="w-[100px]">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {topic.subtopics.map((subtopic) => (
                                                <TableRow key={subtopic._id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={completedSubtopics.has(subtopic._id)}
                                                            onCheckedChange={(checked) =>
                                                                handleCheckboxChange(
                                                                    subtopic._id,
                                                                    topic._id,
                                                                    checked as boolean
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {subtopic.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {subtopic.leetCodeLink ? (
                                                            <a
                                                                href={subtopic.leetCodeLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                Link
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">N/A</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {subtopic.youtubeLink ? (
                                                            <a
                                                                href={subtopic.youtubeLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-red-500 hover:underline"
                                                            >
                                                                Link
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">N/A</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {subtopic.articleLink ? (
                                                            <a
                                                                href={subtopic.articleLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-green-500 hover:underline"
                                                            >
                                                                Link
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">N/A</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                subtopic.level === "Easy"
                                                                    ? "default"
                                                                    : subtopic.level === "Medium"
                                                                        ? "secondary"
                                                                        : "destructive"
                                                            }
                                                            className={
                                                                subtopic.level === "Easy"
                                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                    : subtopic.level === "Medium"
                                                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                                            }
                                                        >
                                                            {subtopic.level}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                completedSubtopics.has(subtopic._id)
                                                                    ? "default"
                                                                    : "destructive"
                                                            }
                                                            className={
                                                                completedSubtopics.has(subtopic._id)
                                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                                                            }
                                                        >
                                                            {completedSubtopics.has(subtopic._id)
                                                                ? "Completed"
                                                                : "Pending"}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}
