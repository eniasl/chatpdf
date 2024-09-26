import React from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import SideBar from "@/components/SideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";

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

  console.log("chatId: ", chatid);
  console.log("chats: ", _chats);

  let chatExists = false;
  let currentChat = null;

  for (const chat of _chats) {
    console.log("chat.id: ", chat.id);
    if (chat.id === parseInt(chatid)) {
      chatExists = true;
      currentChat = chat;
      break;
    }
  }

  console.log(currentChat);

  if (!chatExists) {
    console.log("chat does not exist");
    return redirect("/");
  }

  return (
      <div className="flex w-full h-full">
        <div className="flex-1 max-w-xs">
          <SideBar />
        </div>
        <div className="flex-1 max-h-screen p-4 overflow-scroll">
          <PDFViewer pdfUrl={currentChat?.pdfUrl || ""} />
        </div>
        <div className="flex-1 max-h-screen p-4 overflow-scroll">
          <ChatComponent/>
        </div>
      </div>
  );
};

export default ChatPage;
