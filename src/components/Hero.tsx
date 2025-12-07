"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users, BookOpen } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: GraduationCap,
        title: "Scholarship Facility",
        description: "Financial aid for deserving students",
    },
    {
        icon: Users,
        title: "Skilled Lecturers",
        description: "Learn from the best educators",
    },
    {
        icon: BookOpen,
        title: "Book Library & Store",
        description: "Vast collection of resources",
    },
];

export default function Hero() {
    return (
        <section className="relative">
            {/* Main Hero Content */}
            <div className="relative w-full h-[600px] lg:h-[750px] flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/home-hero.png"
                        alt="Campus Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#002147]/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans">
                            Empowering the <br />
                            <span className="text-[#FEC301]">Next Generation</span>
                        </h1>
                        <p className="text-lg text-gray-200 max-w-xl leading-relaxed">
                            Cultivating excellence, creativity, and character in a world-class learning environment designed for the leaders of tomorrow.
                        </p>
                        <div className="pt-4">
                            <button className="bg-[#FEC301] text-[#002147] px-8 py-4 font-bold text-sm tracking-wide uppercase hover:bg-white hover:text-[#002147] transition-all duration-300 shadow-lg flex items-center gap-2">
                                Start A Course
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Overlapping Features Bar */}
            <div className="relative z-20 -mt-16 container mx-auto px-4 lg:px-6 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 shadow-2xl">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`
                flex items-center gap-6 p-8
                ${index === 0 ? "bg-[#002147]" : ""}
                ${index === 1 ? "bg-[#002a5c]" : ""}
                ${index === 2 ? "bg-[#003370]" : ""}
                text-white transition-transform hover:-translate-y-1
              `}
                        >
                            <feature.icon className="w-12 h-12 text-[#FEC301]" />
                            <div>
                                <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                                <p className="text-sm text-gray-300">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
