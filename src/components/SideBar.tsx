"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'; // To get the current active route

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current path

    return (
        <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
            <h1>ChatPdf</h1>
            <div className="flex flex-col gap-3 mt-4">
                <button
                    onClick={() => router.push(`/chat`)}
                    className={`w-full h-10 rounded-lg ${
                        pathname === '/dashboard' ? 'bg-indigo-600' : 'border-solid border-white border'
                    }`}
                >
                    Chats
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
