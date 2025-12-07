"use client";

import { motion } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1577896334614-544d3b946e9e?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2070&auto=format&fit=crop",
];

export default function GalleryMarquee() {
    return (
        <section id="gallery" className="py-24 bg-purple-50 overflow-hidden">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Campus Life
                </h2>
                <p className="text-lg text-gray-600">
                    Moments that define the Sriram experience.
                </p>
            </div>

            <div className="relative flex w-full">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-purple-50 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-purple-50 to-transparent z-10" />

                {/* Mobile: Native Scroll */}
                <div className="flex md:hidden gap-4 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                    {images.map((src, index) => (
                        <div
                            key={`mobile-${index}`}
                            className="relative w-[85vw] h-[250px] rounded-2xl overflow-hidden shadow-md shrink-0 snap-center"
                        >
                            <img
                                src={src}
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: Marquee Animation */}
                <motion.div
                    className="hidden md:flex gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...images, ...images].map((src, index) => (
                        <div
                            key={`desktop-${index}`}
                            className="relative w-[400px] h-[250px] rounded-2xl overflow-hidden shadow-md shrink-0"
                        >
                            <img
                                src={src}
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
