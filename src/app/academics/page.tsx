"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Atom, Palette, Globe, Calculator, BookOpen, Code, X, ChevronRight } from "lucide-react";

const subjects = [
    {
        id: "stem",
        title: "STEM Education",
        icon: Atom,
        color: "bg-blue-500",
        image: "/images/academics-hero.png",
        description: "Fostering innovation through Science, Technology, Engineering, and Mathematics.",
        details: [
            "Robotics and Coding Labs",
            "Advanced Physics & Chemistry Experiments",
            "Mathematics Olympiad Preparation",
            "AI & Machine Learning Workshops"
        ]
    },
    {
        id: "arts",
        title: "Creative Arts",
        icon: Palette,
        color: "bg-purple-500",
        image: "/images/gallery-hero.png",
        description: "Unleashing creativity through visual and performing arts.",
        details: [
            "Fine Arts & Sculpture",
            "Music (Vocal & Instrumental)",
            "Dance & Theatre",
            "Digital Design & Media"
        ]
    },
    {
        id: "humanities",
        title: "Humanities",
        icon: Globe,
        color: "bg-orange-500",
        image: "/images/about-hero.png",
        description: "Understanding the world through history, geography, and social sciences.",
        details: [
            "Global Perspectives",
            "History & Civilization",
            "Geography & Environmental Studies",
            "Sociology & Psychology"
        ]
    },
    {
        id: "languages",
        title: "Languages",
        icon: BookOpen,
        color: "bg-green-500",
        image: "/images/activities-hero.png",
        description: "Mastering communication in multiple global languages.",
        details: [
            "English Literature & Language",
            "Hindi & Regional Languages",
            "French & German Electives",
            "Public Speaking & Debate"
        ]
    },
    {
        id: "commerce",
        title: "Commerce",
        icon: Calculator,
        color: "bg-teal-500",
        image: "/images/facilities-hero.png",
        description: "Building financial literacy and business acumen.",
        details: [
            "Accountancy & Finance",
            "Business Studies",
            "Economics",
            "Entrepreneurship Programs"
        ]
    },
    {
        id: "tech",
        title: "Computer Science",
        icon: Code,
        color: "bg-indigo-500",
        image: "/images/contact-hero.png",
        description: "Equipping students with digital skills for the future.",
        details: [
            "Programming (Python, Java)",
            "Web Development",
            "Cybersecurity Basics",
            "Data Science Fundamentals"
        ]
    }
];

export default function AcademicsPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="min-h-screen bg-gray-50 overflow-hidden" ref={containerRef}>
            {/* Typographic Hero Section */}
            <section className="pt-32 pb-16 bg-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Academics</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Excellence in Education Through Innovation
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Comprehensive Curriculum</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our diverse curriculum is designed to challenge and inspire students across all disciplines.
                        Click on a subject to explore more.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {subjects.map((subject, index) => (
                        <motion.div
                            key={subject.id}
                            layoutId={subject.id}
                            onClick={() => setSelectedId(subject.id)}
                            className={`relative group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
                        >
                            <Image
                                src={subject.image}
                                alt={subject.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className={`${subject.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300`}>
                                    <subject.icon size={24} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{subject.title}</h3>
                                <p className="text-white/80 line-clamp-2 group-hover:text-white transition-colors">
                                    {subject.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal for Details */}
                <AnimatePresence>
                    {selectedId && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />

                            <motion.div
                                layoutId={selectedId}
                                className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
                            >
                                {subjects.map((subject) => {
                                    if (subject.id !== selectedId) return null;
                                    return (
                                        <div key={subject.id} className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
                                            <div className="relative h-64 md:h-full md:w-2/5">
                                                <Image src={subject.image} alt={subject.title} fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/30" />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
                                                >
                                                    <X size={24} />
                                                </button>
                                                <div className="absolute bottom-8 left-8 text-white">
                                                    <div className={`${subject.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                                        <subject.icon size={24} />
                                                    </div>
                                                    <h2 className="text-3xl font-bold">{subject.title}</h2>
                                                </div>
                                            </div>

                                            <div className="p-8 md:w-3/5 overflow-y-auto">
                                                <h3 className="text-xl font-bold text-gray-900 mb-4">Curriculum Highlights</h3>
                                                <p className="text-gray-600 mb-8 leading-relaxed">
                                                    {subject.description} Our program is designed to provide deep theoretical knowledge combined with practical application.
                                                </p>

                                                <div className="space-y-4">
                                                    {subject.details.map((detail, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"
                                                        >
                                                            <div className={`w-8 h-8 rounded-full ${subject.color.replace('bg-', 'bg-opacity-10 text-').replace('500', '600')} flex items-center justify-center`}>
                                                                <ChevronRight size={16} />
                                                            </div>
                                                            <span className="font-medium text-gray-800">{detail}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}
