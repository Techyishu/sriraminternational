"use client";

import { motion } from "framer-motion";
import { Users, Trophy, BookOpen, Globe } from "lucide-react";
import Image from "next/image";

const stats = [
    {
        label: "Trusted by Parents",
        value: "150+",
        icon: Users,
        color: "bg-[#FEC301] text-[#002147]",
        description: "Families who have entrusted us with their children's education.",
    },
    {
        label: "Proven Success",
        value: "15",
        icon: Trophy,
        color: "bg-[#FEC301] text-[#002147]",
        description: "Personalized attention for every student's growth.",
    },
    {
        label: "AP Courses",
        value: "25+",
        icon: BookOpen,
        color: "bg-[#FEC301] text-[#002147]",
        description: "Rigorous academic curriculum for advanced learning.",
    },
    {
        label: "Nationalities",
        value: "40+",
        icon: Globe,
        color: "bg-[#FEC301] text-[#002147]",
        description: "A diverse community fostering global perspectives.",
    },
];

export default function Stats() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[600px]">
                    {/* Large Image Tile */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden relative group h-[400px] md:h-full shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                        <Image
                            src="/images/whatsapp-image-2024-12-11-at-09.39.58_cfab3f28-AoPvjXEbpZuapNXx.jpg"
                            alt="Student Life"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute bottom-8 left-8 z-20 text-white">
                            <h3 className="text-2xl font-bold mb-2">
                                Life at SR INTERNATIONAL
                            </h3>
                            <p className="text-gray-200">
                                Experience a vibrant community dedicated to holistic growth.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group hover:border-[#FEC301]/20"
                            >
                                <div
                                    className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                                >
                                    <stat.icon size={24} />
                                </div>
                                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </h4>
                                <p className="text-base md:text-lg font-medium text-gray-800 mb-2">
                                    {stat.label}
                                </p>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
