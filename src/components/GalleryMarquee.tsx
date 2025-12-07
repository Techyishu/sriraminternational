"use client";

import { motion } from "framer-motion";

const images = [
    "/images/facilities-hero.png",
    "/images/admissions-hero.png",
    "/images/staff-hero.png",
    "/images/contact-hero.png",
    "/images/about-hero.png",
    "/images/academics-hero.png",
];

export default function GalleryMarquee() {
    return (
        <section id="gallery" className="py-24 bg-stone-50 overflow-hidden">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#002147] mb-4">
                    Campus Life
                </h2>
                <p className="text-lg text-gray-600">
                    Moments that define the Sriram experience.
                </p>
            </div>

            <div className="relative flex w-full">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-50 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-50 to-transparent z-10" />

                {/* Marquee Animation */}
                <motion.div
                    className="flex gap-4 md:gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {[...images, ...images].map((src, index) => (
                        <div
                            key={`gallery-${index}`}
                            className="relative w-[300px] md:w-[400px] h-[200px] md:h-[250px] rounded-2xl overflow-hidden shadow-md shrink-0"
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
