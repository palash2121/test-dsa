import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getServerUserId } from "@/lib/server-utils";
import ProfileClient from "./profile-client";

export const dynamic = "force-dynamic";

async function getUserData() {
    await dbConnect();

    const userId = await getServerUserId();

    if (!userId) {
        throw new Error("Not authenticated");
    }

    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    };
}

export default async function ProfilePage() {
    const user = await getUserData();

    return <ProfileClient user={user} />;
}
