"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function TopicsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Topics page error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Something went wrong!</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {error.message || "Failed to load topics. Please try again."}
            </p>
            <Button onClick={reset} variant="outline">
                Try again
            </Button>
        </div>
    );
}
