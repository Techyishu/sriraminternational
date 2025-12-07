"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-stone-50 pt-24 mt-4">
            <div className="container mx-auto px-6 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8 lg:space-y-10"
                    >
                        {/* Eyebrow Label */}
                        <div className="inline-block">
                            <span className="text-xs uppercase tracking-[0.2em] text-amber-700 font-medium">
                                Excellence in Education
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-slate-900 leading-[1.1]">
                            Empowering the <br />
                            <span className="text-amber-700">
                                Next Generation
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl font-sans">
                            Cultivating excellence, creativity, and character in a world-class learning environment designed for the leaders of tomorrow.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-md font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-3 font-sans">
                                Tour Campus
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column - Image with Classic Arch Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
                    >
                        {/* Classic Arch Frame */}
                        <div className="relative w-full h-full rounded-t-[3rem] overflow-hidden shadow-2xl border border-slate-200">
                            <Image
                                src="/images/home-hero.png"
                                alt="Campus Life at Sriram International"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Subtle overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
