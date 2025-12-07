"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Library, Monitor, FlaskConical, Trophy, Bus, Utensils } from "lucide-react";

const facilities = [
    {
        icon: Library,
        title: "Library",
        description: "A well-stocked library with a vast collection of books, journals, and digital resources."
    },
    {
        icon: Monitor,
        title: "Computer Labs",
        description: "State-of-the-art computer labs with high-speed internet and modern software."
    },
    {
        icon: FlaskConical,
        title: "Science Labs",
        description: "Fully equipped physics, chemistry, and biology labs for practical learning."
    },
    {
        icon: Trophy,
        title: "Sports Complex",
        description: "Extensive sports facilities including basketball courts, football ground, and indoor games."
    },
    {
        icon: Bus,
        title: "Transport",
        description: "Safe and reliable transport facility covering all major routes in the city."
    },
    {
        icon: Utensils,
        title: "Cafeteria",
        description: "Hygienic and nutritious food served in a clean and spacious cafeteria."
    }
];

export default function FacilitiesPage() {
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
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Our Facilities</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Modern Classrooms, Labs, and Vibrant Play Areas
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Facilities Grid */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <facility.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                {facility.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {facility.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
