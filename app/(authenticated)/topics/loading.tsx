export default function TopicsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <div className="h-9 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-4 bg-white dark:bg-neutral-900"
                    >
                        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
