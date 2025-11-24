"use client";

interface User {
    id: string;
    name: string;
    email: string;
    mobile: string;
}

interface ProfileClientProps {
    user: User;
}

export default function ProfileClient({ user }: ProfileClientProps) {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome {user.name}</h1>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500">Mobile: {user.mobile}</p>
            {/* Add more dashboard content here */}
        </div>
    );
}
