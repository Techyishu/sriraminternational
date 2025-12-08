"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Library, Monitor, FlaskConical, Trophy, Bus, Utensils } from "lucide-react";

const facilities = [
    {
        icon: Library,
        title: "Library & Learning Resource Center",
        description: "A well-stocked library with over 15,000 books, journals, periodicals, and digital resources. Our library provides a quiet, conducive environment for research and study, with dedicated reading areas and computer stations for accessing online databases and e-books."
    },
    {
        icon: Monitor,
        title: "Computer Labs",
        description: "State-of-the-art computer laboratories equipped with the latest hardware and software. High-speed internet connectivity, multimedia projectors, and modern workstations ensure students have access to cutting-edge technology for learning programming, digital design, and research."
    },
    {
        icon: FlaskConical,
        title: "Science Laboratories",
        description: "Fully equipped physics, chemistry, and biology laboratories designed to meet international standards. Our labs feature modern equipment, safety protocols, and hands-on learning opportunities that make scientific concepts come alive through practical experimentation."
    },
    {
        icon: Trophy,
        title: "Sports Complex",
        description: "Extensive sports facilities including a large playground for cricket and football, basketball courts, volleyball courts, and indoor games facilities. We also have a well-maintained athletics track and facilities for table tennis, badminton, and other indoor sports."
    },
    {
        icon: Bus,
        title: "Transport Services",
        description: "Safe and reliable transport facility with GPS-enabled buses covering all major routes in the city and surrounding areas. Our fleet is regularly maintained, and all drivers are trained professionals committed to student safety."
    },
    {
        icon: Utensils,
        title: "Cafeteria & Dining",
        description: "A spacious, hygienic cafeteria serving nutritious and balanced meals. Our kitchen follows strict hygiene standards and offers a variety of healthy food options. The dining area provides a comfortable space for students to enjoy their meals and socialize."
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
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        At SR INTERNATIONAL, we believe that excellent facilities are fundamental to quality education. Our campus is equipped with modern infrastructure designed to support comprehensive learning and holistic development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
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

                {/* Additional Facilities Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#002147] to-[#003370] rounded-3xl p-12 text-white"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">Additional Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "Smart Classrooms with Interactive Boards",
                            "Medical Room with First Aid",
                            "Security & CCTV Surveillance",
                            "Wi-Fi Enabled Campus",
                            "Auditorium for Events",
                            "Art & Music Rooms",
                            "Prayer Hall",
                            "Parking Facilities"
                        ].map((amenity, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#FEC301] rounded-full" />
                                <span className="text-gray-200">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
