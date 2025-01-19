import React from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { FileText, ArrowLeft } from 'lucide-react';
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";

type Props = {
  params: {
    chatid: string;
  }
};

const ChatPage = async ({ params: { chatid } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  if (!_chats) {
    console.log("chats not found");
    return redirect("/");
  }

  const currentChat = _chats.find(chat => chat.id === parseInt(chatid));

  if (!currentChat) {
    console.log("chat does not exist");
    return redirect("/");
  }

  return (
      <div className="flex flex-col h-screen bg-white text-gray-800">
        {/* Top bar with back button and icon */}
        <div className="h-16 flex items-center justify-between px-14 bg-gray-100">
          <Link href="/dashboard">
            <button
                className="flex items-center justify-center w-10 h-10 bg-emerald-500 text-white rounded-full hover:bg-green-600 transition-all">
              <ArrowLeft className="w-5 h-5"/>
            </button>
          </Link>
          <div className="flex items-center space-x-2">
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* PDF Viewer */}
          <div className="w-1/2 border-r border-gray-200">
          <div className="h-[calc(100vh-7rem)]">
              <PDFViewer pdfUrl={currentChat.pdfUrl || ""} />
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            <ChatComponent chatId={Number(chatid)} />
          </div>
        </div>
      </div>
  );
};

export default ChatPage;
