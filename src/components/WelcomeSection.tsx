"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function WelcomeSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#002147]">
                            Welcome To Our Campus
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                At SR INTERNATIONAL, we believe in nurturing young minds through a holistic approach to education. Our campus provides a vibrant learning environment where students are encouraged to explore, innovate, and excel in all aspects of their development.
                            </p>
                            <p>
                                With state-of-the-art facilities, experienced faculty, and a curriculum designed to foster critical thinking and creativity, we prepare our students to become confident leaders and responsible global citizens. Our commitment to excellence extends beyond academics, encompassing sports, arts, and character building.
                            </p>
                        </div>
                        <button className="bg-[#FEC301] text-[#002147] px-8 py-3 font-bold uppercase tracking-wide hover:bg-[#002147] hover:text-white transition-all shadow-md mt-4">
                            Read More
                        </button>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full"
                    >
                        {/* Main Image */}
                        <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src="/images/WhatsApp Image 2025-12-08 at 14.16.24.jpeg"
                                alt="SR International School Campus"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
