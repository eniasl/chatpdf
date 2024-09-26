import React from 'react';
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";

const ChatPage = async () => {
    const userId = await auth();
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex w-full h-full">
                <div className="flex-1 max-w-xs">
                    <Sidebar/>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                    <p>Card Page</p>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;