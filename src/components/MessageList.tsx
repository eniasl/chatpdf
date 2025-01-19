import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, User } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
    isLoading: boolean;
    messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
        );
    }
    if (!messages) return null;

    return (
        <div className="flex flex-col space-y-4 px-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn("flex items-start space-x-4", {
                        "self-end": message.role === "user",
                    })}
                >
                    {message.role === "system" && (
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gray-300 text-white">AI</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                            "px-4 py-2 rounded-lg max-w-xs text-sm",
                            {
                                "bg-gray-300 text-black self-start": message.role === "system",
                                "bg-emerald-500 text-white self-end": message.role === "user",
                            }
                        )}
                    >
                        <p className="leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-emerald-500 text-white">
                                <User className="w-5 h-5" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MessageList;






