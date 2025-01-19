import React from 'react';
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {LogIn, BookOpen, Brain, Zap, Clock, Users, Star, Upload} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
    const { userId } = await auth()
    const isAuth = !!userId

    return (
        <div className="bg-white relative">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Navigation Bar */}
            <nav className="sticky top-0 left-0 right-0 z-50 border-b border-emerald-600/20 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <span className="ml-2 text-emerald-600 font-bold text-xl">PDFChat</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="#features" className="text-emerald-600 hover:text-emerald-700">Features</Link>
                            <Link href="#testimonials" className="text-emerald-600 hover:text-emerald-700">Testimonials</Link>
                            <Link href="#pricing" className="text-emerald-600 hover:text-emerald-700">Pricing</Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left side - Content */}
                        <div className="flex-1">
                            <h1 className="text-6xl font-bold leading-tight mb-6 text-emerald-600">
                                Transform Your Study Experience with AI
                            </h1>
                            <p className="text-xl mb-8 text-emerald-600/60">
                                Upload any PDF and get instant AI-powered insights, summaries, and answers to your questions. Join thousands of students studying smarter, not harder.
                            </p>

                            <div className="space-y-4">
                                {isAuth ? (
                                    <div>
                                        <FileUpload />
                                        <Link href="/dashboard" className="block w-fit animate-bounce">
                                            <Button className="mt-4 w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700">
                                                Go to My Chats
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href="/sign-in" className="block w-fit animate-bounce">
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                            Login to get started
                                            <LogIn className="w-4 h-4 ml-2"/>
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <div className="mt-8 flex items-center gap-4 text-sm text-emerald-600/60">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    No Credit Card Required
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Instant Access
                                </div>
                            </div>
                        </div>

                        {/* Right side - Feature list */}
                        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-600/20">
                            <h2 className="text-2xl font-semibold mb-6 text-emerald-600">Why Students Love It</h2>
                            <div className="space-y-4">
                                {[
                                    "Smart Summaries - Get key insights instantly",
                                    "Interactive Q&A - Ask anything about your PDF",
                                    "Study Guides - AI-generated study materials",
                                    "24/7 Availability - Learn at your own pace"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-emerald-600/10 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-emerald-600 font-medium">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-emerald-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { number: "50,000+", label: "Active Students", icon: Users },
                            { number: "1M+", label: "PDFs Analyzed", icon: BookOpen },
                            { number: "4.9/5", label: "Average Rating", icon: Star },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600/10 mb-4">
                                    <stat.icon className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-4xl font-bold text-emerald-600 mb-2">{stat.number}</h3>
                                <p className="text-emerald-600/60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-emerald-600 mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Upload,
                                title: "1. Upload Your PDF",
                                description: "Simply drag and drop your study material or textbook"
                            },
                            {
                                icon: Brain,
                                title: "2. AI Analysis",
                                description: "Our AI reads and understands your document instantly"
                            },
                            {
                                icon: Zap,
                                title: "3. Start Learning",
                                description: "Ask questions, get summaries, and accelerate your learning"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl border border-emerald-600/20 bg-white/80 backdrop-blur-sm">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600/10 mb-4">
                                    <feature.icon className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-emerald-600 mb-2">{feature.title}</h3>
                                <p className="text-emerald-600/60">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-emerald-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-emerald-600 mb-12">What Students Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Transformed how I study. I can understand complex topics much faster now.",
                                author: "Sarah K.",
                                role: "Medical Student"
                            },
                            {
                                quote: "The AI explanations are incredibly helpful. It's like having a tutor available 24/7.",
                                author: "James R.",
                                role: "Law Student"
                            },
                            {
                                quote: "This tool helped me ace my exams. The summaries are precise and helpful.",
                                author: "Michael T.",
                                role: "Engineering Student"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="p-6 rounded-2xl border border-emerald-600/20 bg-white">
                                <p className="text-emerald-600/60 mb-4">"{testimonial.quote}"</p>
                                <p className="font-semibold text-emerald-600">{testimonial.author}</p>
                                <p className="text-emerald-600/60">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-emerald-600 mb-12">Simple Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                plan: "Free",
                                price: "$0",
                                features: ["5 PDFs per month", "Basic summaries", "Standard support"]
                            },
                            {
                                plan: "Pro",
                                price: "$9.99",
                                features: ["Unlimited PDFs", "Advanced summaries", "Priority support", "Custom study guides"]
                            },
                            {
                                plan: "Team",
                                price: "$19.99",
                                features: ["Everything in Pro", "Team collaboration", "Admin dashboard", "API access"]
                            }
                        ].map((tier, index) => (
                            <div key={index} className="p-6 rounded-2xl border border-emerald-600/20 bg-white/80 backdrop-blur-sm text-center">
                                <h3 className="text-xl font-semibold text-emerald-600 mb-2">{tier.plan}</h3>
                                <p className="text-4xl font-bold text-emerald-600 mb-4">{tier.price}<span className="text-lg">/mo</span></p>
                                <ul className="space-y-3 mb-6">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="text-emerald-600/60">{feature}</li>
                                    ))}
                                </ul>
                                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-emerald-600/20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <Link href="/" className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <span className="ml-2 text-emerald-600 font-bold text-xl">PDFChat</span>
                            </Link>
                            <p className="text-emerald-600/60">Making study smarter, not harder.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-600 mb-4">Product</h4>
                            <ul className="space-y-2 text-emerald-600/60">
                                <li>
                                    <Link href="#features" className="hover:text-emerald-700">Features</Link>
                                </li>
                                <li>
                                    <Link href="#pricing" className="hover:text-emerald-700">Pricing</Link>
                                </li>
                                <li>
                                    <Link href="#testimonials" className="hover:text-emerald-700">Testimonials</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-600 mb-4">Company</h4>
                            <ul className="space-y-2 text-emerald-600/60">
                                <li>
                                    <Link href="/about" className="hover:text-emerald-700">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="hover:text-emerald-700">Careers</Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-emerald-700">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-600 mb-4">Support</h4>
                            <ul className="space-y-2 text-emerald-600/60">
                                <li>
                                    <Link href="/help" className="hover:text-emerald-700">Help Center</Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:text-emerald-700">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="hover:text-emerald-700">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-emerald-600/60">
                        <p>&copy; {new Date().getFullYear()} PDFChat. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
