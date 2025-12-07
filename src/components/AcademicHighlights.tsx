"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Microscope, Palette, Dumbbell } from "lucide-react";

const highlights = [
    {
        title: "STEM Excellence",
        icon: Microscope,
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
        description: "State-of-the-art labs and robotics programs fostering innovation.",
        color: "bg-purple-600",
    },
    {
        title: "Creative Arts",
        icon: Palette,
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
        description: "Nurturing expression through visual arts, music, and drama.",
        color: "bg-purple-500",
    },
    {
        title: "Athletics",
        icon: Dumbbell,
        image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2070&auto=format&fit=crop",
        description: "Championing teamwork, discipline, and physical well-being.",
        color: "bg-purple-400",
    },
];

export default function AcademicHighlights() {
    return (
        <section id="academics" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-600 font-medium tracking-wider uppercase text-sm">
                        Academics & Beyond
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                        A Curriculum for the Future
                    </h2>
                    <p className="text-lg text-gray-600">
                        We provide a balanced education that integrates rigorous academics with creative and physical development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                            />

                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                    <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
                                        <item.icon size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-200 mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-white font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        Learn More <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
