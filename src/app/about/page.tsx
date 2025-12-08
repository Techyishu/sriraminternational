"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { History, Target, Eye, Award, Users, BookOpen } from "lucide-react";

const timelineEvents = [
    { year: "1995", title: "Foundation", description: "Established with a vision to provide quality education to the community." },
    { year: "2005", title: "Expansion", description: "Added new wings for Science and Arts, expanding our capacity to 1000 students." },
    { year: "2015", title: "International Tie-ups", description: "Partnered with global institutions to offer exchange programs and international curriculum." },
    { year: "2023", title: "Digital Transformation", description: "Implemented smart classrooms and a fully digital learning management system." },
];

export default function AboutPage() {
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
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">About Us</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Nurturing Minds, Building Character, Shaping Futures
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Zig-Zag History Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="space-y-24">
                    {/* Block 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 space-y-6"
                        >
                            <div className="flex items-center gap-4 text-primary mb-2">
                                <History size={28} />
                                <span className="text-sm font-bold uppercase tracking-widest">Our Legacy</span>
                            </div>
                            <h2 className="text-4xl font-serif font-bold text-gray-900">A Tradition of Excellence</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Founded with a vision to provide world-class education, SR INTERNATIONAL has been a beacon of learning and excellence. Our journey began with a humble commitment to nurture young minds and has grown into a premier institution known for its holistic approach to education.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <Image src="/images/about-hero.png" alt="History" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    </div>

                    {/* Block 2 (Swapped) */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 space-y-6"
                        >
                            <div className="flex items-center gap-4 text-primary mb-2">
                                <Target size={28} />
                                <span className="text-sm font-bold uppercase tracking-widest">Our Mission</span>
                            </div>
                            <h2 className="text-4xl font-serif font-bold text-gray-900">Empowering Future Leaders</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To nurture well-rounded individuals prepared for future challenges. We strive to create a nurturing atmosphere that emphasizes learning and exploration, complemented by comprehensive facilities. We believe in fostering curiosity, creativity, and critical thinking in every student.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <Image src="/images/academics-hero.png" alt="Mission" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Animated History Timeline */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
                        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200" />

                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="hidden md:block md:w-5/12" />

                                {/* Marker */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>

                                {/* Content */}
                                <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <span className="text-primary font-bold text-xl block mb-2">{event.year}</span>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                                        <p className="text-gray-600 text-sm">{event.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
