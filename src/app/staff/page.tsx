"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const heroContent = {
    title: "Our Staff",
    subtitle: "The Pillars of Our Institution"
};

export default function StaffPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await fetch("/api/staff");
                const data = await response.json();
                setStaff(data.staff || []);
            } catch (error) {
                console.error("Error fetching staff:", error);
                setStaff([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
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
                {/* Staff Grid */}
                {staff.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {staff.map((member: any, index: number) => (
                            <motion.div
                                key={member.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                            >
                                {member.image_url && (
                                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                                        <Image
                                            src={member.image_url}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-[#002147] mb-2">{member.name}</h3>
                                {member.designation && (
                                    <p className="text-lg text-gray-600 mb-3">{member.designation}</p>
                                )}
                                {member.qualification && (
                                    <p className="text-sm text-gray-500 mb-2">{member.qualification}</p>
                                )}
                                {member.experience && (
                                    <p className="text-sm text-gray-500 mb-3">Experience: {member.experience}</p>
                                )}
                                {member.bio && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                                )}
                                {member.email && (
                                    <p className="text-sm text-blue-600 mt-3">{member.email}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No staff members available yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
