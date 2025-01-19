'use client';

import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import FileUpload from "@/components/FileUpload";
import Link from "next/link";
import { FileText, MessageSquare, Search, Upload, User } from "lucide-react";
import {UserButton} from "@clerk/nextjs";

const ChatPageClient = ({ initialChats }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredChats = initialChats.filter(chat =>
        chat.pdfName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_30%,transparent_70%)]" />

            {/* Navigation Bar */}
            <nav className="sticky top-0 left-0 right-0 z-50  bg-neutral-100 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <span className="ml-2 text-emerald-600 font-bold text-xl">PDFChat</span>
                            </Link>
                        </div>

                        {/* Profile Icon */}
                        <div className="flex items-center">
                            <UserButton afterSignOutUrl="/"/>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto flex relative pt-8">
                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* Upload Section */}
                    <div className="mb-8">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-600/20 shadow-xl cursor-pointer hover:border-emerald-600/40 transition-colors">
                            {/* Overlay FileUpload */}
                            <div className="flex items-center gap-4 z-0 mb-3">
                                <div className="p-3 bg-emerald-600/10 rounded-full">
                                    <Upload className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-emerald-600">Upload New PDF</h3>
                                    <p className="text-sm text-emerald-600/60">
                                        Drop your file here or click to browse
                                    </p>
                                </div>
                            </div>
                            <FileUpload className="absolute inset-0 z-10 opacity-0" />
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="mb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600/60 w-5 h-5"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search your PDFs..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-emerald-600/20 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-emerald-600 placeholder-emerald-600/40"
                            />
                        </div>
                    </div>

                    {/* Chats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredChats.map(chat => (
                            <Link href={`dashboard/chat/${chat.id}`} key={chat.id}>
                                <div
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-600/20 p-6 shadow-xl hover:border-emerald-600 hover:shadow-2xl transition-all ease-in-out duration-300">
                                    <div className="flex items-center mb-4">
                                        <FileText className="w-6 h-6 text-emerald-600 mr-3" />
                                        <h2 className="text-lg font-bold text-emerald-600 truncate">{chat.pdfName}</h2>
                                    </div>
                                    <div className="flex items-center text-sm text-emerald-600/60">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        <span>Open conversation</span>
                                        <span className="ml-auto text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No Chats Message */}
                    {filteredChats.length === 0 && !initialChats.length && (
                        <div className="text-center py-12">
                            <p className="text-emerald-600/60">
                                {searchTerm
                                    ? 'No matching PDFs found.'
                                    : 'Upload your first PDF to get started!'}
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ChatPageClient;