import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {chats} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import ChatPageClient from "@/components/ChatPageClient";

const ChatPage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect("/sign-in");

    const userChats = await db.select()
        .from(chats)
        .where(eq(chats.userId, userId));

    return <ChatPageClient initialChats={userChats} />;
};

export default ChatPage;