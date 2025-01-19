"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import MessageList from "@/components/MessageList";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: async () => {
            const response = await axios.post<Message[]>("/api/get-messages", {
                chatId,
            });
            return response.data;
        },
    });

    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chat",
        body: {
            chatId,
        },
        initialMessages: data || [],
    });

    React.useEffect(() => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <Card className="flex flex-col h-full rounded-none border-none bg-gray-50 text-gray-800">
            <CardContent className="flex-1 p-0" id="message-container">
                <ScrollArea className="h-[calc(100vh-9.5rem)]">
                    <MessageList messages={messages} isLoading={isLoading} />
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Send a message..."
                        className="flex-1 bg-white border-gray-300 text-gray-800 placeholder-gray-400 rounded-full py-2 px-4 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="bg-emerald-500 hover:bg-emerald-500 text-white rounded-full"
                        disabled={!input.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
};

export default ChatComponent;







