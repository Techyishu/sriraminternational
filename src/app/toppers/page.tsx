"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const heroContent = {
    title: "Toppers",
    subtitle: "Celebrating Academic Excellence"
};

export default function ToppersPage() {
    const [toppers, setToppers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToppers = async () => {
            try {
                const response = await fetch("/api/toppers");
                const data = await response.json();
                setToppers(data.toppers || []);
            } catch (error) {
                console.error("Error fetching toppers:", error);
                setToppers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchToppers();
    }, []);

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
                {/* Toppers Grid */}
                {toppers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {toppers.map((topper: any, index: number) => (
                            <motion.div
                                key={topper.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                            >
                                {topper.image_url && (
                                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                                        <Image
                                            src={topper.image_url}
                                            alt={topper.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center justify-center mb-4">
                                    <Trophy className="w-8 h-8 text-[#FEC301] mr-2" />
                                    <h3 className="text-2xl font-bold text-[#002147]">{topper.name}</h3>
                                </div>
                                {topper.class && (
                                    <p className="text-lg text-gray-600 mb-2">Class: {topper.class}</p>
                                )}
                                {topper.percentage && (
                                    <p className="text-2xl font-bold text-[#FEC301] mb-2">{topper.percentage}%</p>
                                )}
                                {topper.year && (
                                    <p className="text-sm text-gray-500 mb-3">Year: {topper.year}</p>
                                )}
                                {topper.achievement && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{topper.achievement}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No toppers available yet. Check back soon!</p>
                    </div>
                )}

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-[#002147] to-[#003370] rounded-3xl p-12 text-center text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">Be Our Next Success Story</h2>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        Join SR INTERNATIONAL and become part of a legacy of academic excellence. With dedicated faculty, comprehensive support, and a nurturing environment, your success is our mission.
                    </p>
                    <a
                        href="/admissions"
                        className="inline-block bg-[#FEC301] text-[#002147] px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-all shadow-lg"
                    >
                        Apply for Admission
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
