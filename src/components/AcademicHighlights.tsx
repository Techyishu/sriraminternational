"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Heart, Microscope, Palette, Dumbbell, ArrowRight } from "lucide-react";

const highlights = [
    {
        title: "STEM Excellence",
        icon: Microscope,
        image: "/images/academics-hero.png",
        description: "State-of-the-art labs and robotics programs fostering innovation.",
        category: "Science",
        rating: 5,
        price: "Top Rated"
    },
    {
        title: "Creative Arts",
        icon: Palette,
        image: "/images/gallery-hero.png",
        description: "Nurturing expression through visual arts, music, and drama.",
        category: "Arts",
        rating: 5,
        price: "Featured"
    },
    {
        title: "Athletics Program",
        icon: Dumbbell,
        image: "/images/activities-hero.png",
        description: "Championing teamwork, discipline, and physical well-being.",
        category: "Sports",
        rating: 5,
        price: "Popular"
    },
    {
        title: "Global Leadership",
        icon: ArrowRight, // Placeholder
        image: "/images/toppers-hero.png",
        description: "Preparing students for global challenges and leadership.",
        category: "Leadership",
        rating: 5,
        price: "New"
    }
];

export default function AcademicHighlights() {
    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#002147]">Academic Highlights</h2>
                        <p className="text-gray-500 mt-2">Discover our world-class programs</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#FEC301] p-2 rounded hover:bg-[#002147] hover:text-white transition-colors">
                            <ArrowLeftIcon />
                        </button>
                        <button className="bg-[#FEC301] p-2 rounded hover:bg-[#002147] hover:text-white transition-colors">
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white group rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-[#FEC301] text-[#002147] text-xs font-bold px-3 py-1 rounded">
                                    {item.price}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#002147]">
                                        <item.icon size={16} />
                                    </div>
                                    <span className="text-sm text-gray-500">{item.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#002147] leading-tight mb-2 group-hover:text-[#FEC301] transition-colors line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                                    {item.description}
                                </p>


                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArrowLeftIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
    )
}

function ArrowRightIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
    )
}
