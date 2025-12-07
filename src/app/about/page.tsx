"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { History, Target, Eye, Award, Users, BookOpen } from "lucide-react";

const teamMembers = [
    {
        name: "Dr. Rajesh Kumar",
        role: "Principal",
        image: "/images/team-principal.png",
        bio: "With over 30 years of experience in education, Dr. Kumar leads with wisdom and a vision for holistic growth.",
    },
    {
        name: "Mrs. Sarah Jenkins",
        role: "Vice Principal",
        image: "/images/team-vice-principal.png",
        bio: "A champion of innovative teaching methods, Mrs. Jenkins ensures our curriculum stays ahead of the curve.",
    },
    {
        name: "Mr. Amit Patel",
        role: "Head of Academics",
        image: "/images/team-head-academics.png",
        bio: "Dedicated to academic excellence, Mr. Patel oversees our rigorous and diverse educational programs.",
    },
];

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
                                Founded with a vision to provide world-class education, Sriram International has been a beacon of learning and excellence. Our journey began with a humble commitment to nurture young minds and has grown into a premier institution known for its holistic approach to education.
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

            {/* Team Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Guided by experienced educators and visionaries dedicated to shaping the future of education.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-primary-foreground/80 font-medium mb-4">{member.role}</p>
                                <div className="h-auto md:h-0 md:group-hover:h-auto overflow-hidden transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
