import React from 'react';
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats, DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import { eq } from "drizzle-orm";

const ChatPage = async () => {
    const { userId } = await auth();

    console.log("userId", userId);

    if (!userId) {
        return redirect("/sign-in");
    }

    const userChats = await db.select()
        .from(chats)
        .where(eq(chats.userId, userId)) as DrizzleChat[];

    console.log("userChats", userChats);

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex w-full h-full">
                <div className="flex-1 max-w-xs">
                    <Sidebar />
                </div>
                <div className="flex-1 p-4 overflow-auto bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {userChats.map((chat) => (
                            <div key={chat.id as React.Key} className="border p-4 rounded-lg shadow-md bg-white">
                                <h2 className="text-xl font-bold">{chat.pdfName}</h2>
                                <Link href={`chat/${chat.id}`}>
                                    <p className="text-blue-500 hover:underline mt-2 block">Open Chat</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
