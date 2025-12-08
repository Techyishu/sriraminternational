"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

const defaultContent = {
    hero: {
        title: "Our Staff",
        subtitle: "The Pillars of Our Institution"
    },
    description: "Our faculty members are the cornerstone of our educational excellence. With years of experience, advanced qualifications, and a passion for teaching, they create an inspiring learning environment that nurtures every student's potential.",
    categories: [
        { title: "Senior Faculty", count: "25+", description: "Experienced educators with advanced degrees" },
        { title: "Subject Specialists", count: "40+", description: "Experts in their respective fields" },
        { title: "Support Staff", count: "30+", description: "Dedicated administrative and support team" },
        { title: "Counselors", count: "5+", description: "Student guidance and career counseling" }
    ],
    highlights: [
        {
            title: "Qualified & Experienced",
            description: "All our teachers hold advanced degrees in their subjects and undergo regular professional development to stay updated with the latest teaching methodologies.",
            icon: "🎓"
        },
        {
            title: "Student-Centered Approach",
            description: "Our faculty focuses on individual attention, understanding each student's learning style and providing personalized guidance for academic success.",
            icon: "👨‍🏫"
        },
        {
            title: "Innovative Teaching Methods",
            description: "We employ modern teaching techniques including interactive sessions, project-based learning, and technology-integrated classrooms to make learning engaging and effective.",
            icon: "💡"
        }
    ]
};

export default function StaffPage() {
    const { content, loading } = usePageContent('staff');
    
    const heroContent = content.hero || defaultContent.hero;
    const description = content.description || defaultContent.description;
    const categories = content.categories || defaultContent.categories;
    const highlights = content.highlights || defaultContent.highlights;

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Typographic Hero Section */}
            <section className="pt-32 pb-16 bg-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">{heroContent.title}</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            {heroContent.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Staff Content */}
            <div className="container mx-auto px-6 py-20">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Faculty Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {categories.map((category: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
                        >
                            <div className="text-4xl font-bold text-[#002147] mb-2">{category.count}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Faculty Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((highlight: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="text-5xl mb-4">{highlight.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
