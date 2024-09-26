"use client"
import React from 'react';
import {Input} from './ui/Input';
import {useChat} from "ai/react";


const ChatComponent = () => {
    const {input, handleInputChange} = useChat();
    return (
        <div className="relative max-h-screen overflow-scroll">
            {/* Header */}
            <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
                <h3 className="text-xl font-bold">Chat</h3>
            </div>
            {/* Message List */}
            <form>
                <Input value={input} onChange={handleInputChange} />

            </form>
            
        </div>
    );
};

export default ChatComponent;