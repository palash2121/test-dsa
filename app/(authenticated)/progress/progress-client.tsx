"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Stats {
    total: number;
    completed: number;
    percentage: number;
    easy: { total: number; completed: number; percentage: number };
    medium: { total: number; completed: number; percentage: number };
    hard: { total: number; completed: number; percentage: number };
}

interface ProgressClientProps {
    stats: Stats;
}

export default function ProgressClient({ stats }: ProgressClientProps) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Your Progress</h1>
                <p className="text-gray-500">
                    Track your journey through Data Structures and Algorithms.
                </p>
            </div>

            {/* Overall Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Completion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>{stats.percentage}% Completed</span>
                        <span>
                            {stats.completed} / {stats.total} Problems
                        </span>
                    </div>
                    <Progress value={stats.percentage} className="h-4" />
                </CardContent>
            </Card>

            {/* Difficulty Breakdown */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-green-600">Easy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm font-medium">
                            <span>{stats.easy.percentage}%</span>
                            <span>
                                {stats.easy.completed} / {stats.easy.total}
                            </span>
                        </div>
                        <Progress
                            value={stats.easy.percentage}
                            className="h-2 bg-green-100"
                            indicatorColor="bg-green-600"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-yellow-600">Medium</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm font-medium">
                            <span>{stats.medium.percentage}%</span>
                            <span>
                                {stats.medium.completed} / {stats.medium.total}
                            </span>
                        </div>
                        <Progress
                            value={stats.medium.percentage}
                            className="h-2 bg-yellow-100"
                            indicatorColor="bg-yellow-600"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-600">Hard</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm font-medium">
                            <span>{stats.hard.percentage}%</span>
                            <span>
                                {stats.hard.completed} / {stats.hard.total}
                            </span>
                        </div>
                        <Progress
                            value={stats.hard.percentage}
                            className="h-2 bg-red-100"
                            indicatorColor="bg-red-600"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Completed Tasks Distribution */}
            {stats.completed > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Completed Tasks Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">
                            Out of {stats.completed} completed tasks:
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-green-600">Easy</span>
                                    <span className="font-bold">
                                        {Math.round((stats.easy.completed / stats.completed) * 100)}
                                        %
                                    </span>
                                </div>
                                <Progress
                                    value={(stats.easy.completed / stats.completed) * 100}
                                    className="h-2 bg-green-100"
                                    indicatorColor="bg-green-600"
                                />
                                <p className="text-xs text-gray-500">
                                    {stats.easy.completed} tasks
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-yellow-600">Medium</span>
                                    <span className="font-bold">
                                        {Math.round(
                                            (stats.medium.completed / stats.completed) * 100
                                        )}
                                        %
                                    </span>
                                </div>
                                <Progress
                                    value={(stats.medium.completed / stats.completed) * 100}
                                    className="h-2 bg-yellow-100"
                                    indicatorColor="bg-yellow-600"
                                />
                                <p className="text-xs text-gray-500">
                                    {stats.medium.completed} tasks
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-red-600">Hard</span>
                                    <span className="font-bold">
                                        {Math.round((stats.hard.completed / stats.completed) * 100)}
                                        %
                                    </span>
                                </div>
                                <Progress
                                    value={(stats.hard.completed / stats.completed) * 100}
                                    className="h-2 bg-red-100"
                                    indicatorColor="bg-red-600"
                                />
                                <p className="text-xs text-gray-500">
                                    {stats.hard.completed} tasks
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
