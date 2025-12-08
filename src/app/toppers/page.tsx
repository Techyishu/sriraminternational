"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

const defaultContent = {
    hero: {
        title: "Toppers",
        subtitle: "Celebrating Academic Excellence"
    },
    description: "We take immense pride in celebrating the academic excellence of our students. Our toppers exemplify dedication, hard work, and the pursuit of knowledge. They inspire their peers and set benchmarks for future generations.",
    achievements: [
        {
            title: "Board Examinations",
            description: "Outstanding performers in CBSE board examinations across all streams - Science, Commerce, and Arts.",
            icon: "📚"
        },
        {
            title: "Competitive Exams",
            description: "Students who have excelled in national-level competitive examinations and Olympiads.",
            icon: "🏆"
        },
        {
            title: "Scholarship Recipients",
            description: "Meritorious students who have earned scholarships and recognition for their academic achievements.",
            icon: "🎓"
        }
    ],
    cta: {
        title: "Be Our Next Success Story",
        description: "Join SR INTERNATIONAL and become part of a legacy of academic excellence. With dedicated faculty, comprehensive support, and a nurturing environment, your success is our mission.",
        buttonText: "Apply for Admission"
    }
};

export default function ToppersPage() {
    const { content, loading } = usePageContent('toppers');
    
    const heroContent = content.hero || defaultContent.hero;
    const description = content.description || defaultContent.description;
    const achievements = content.achievements || defaultContent.achievements;
    const cta = content.cta || defaultContent.cta;

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
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">{heroContent.title}</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            {heroContent.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Toppers Content */}
            <div className="container mx-auto px-6 py-20">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Achievement Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {achievements.map((category: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                        >
                            <div className="text-5xl mb-4">{category.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{category.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#002147] to-[#003370] rounded-3xl p-12 text-center text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        {cta.description}
                    </p>
                    <button className="bg-[#FEC301] text-[#002147] px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-all shadow-lg">
                        {cta.buttonText}
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
