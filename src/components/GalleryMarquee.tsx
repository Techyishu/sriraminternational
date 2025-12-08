"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    "/images/mov_7181-YbNvjR4LjLsaMPjN.jpg",
    "/images/whatsapp-image-2023-09-06-at-5.36.44-am.jpeg-mv0DGRPPoPfVQnXv.jpg",
    "/images/whatsapp-image-2024-03-10-at-6.30.48-pm.jpeg-AGB6XwzzlNfQpNag.jpg",
    "/images/whatsapp-image-2024-12-09-at-17.53.59_a545b9dd-AzGeolMMpVH7B2RL.jpg",
    "/images/whatsapp-image-2024-12-09-at-17.54.00_9cb5ef76-ALpnK42Wvns3O2lK.jpg",
    "/images/whatsapp-image-2024-12-11-at-09.39.58_cfab3f28-AoPvjXEbpZuapNXx.jpg",
];

export default function GalleryMarquee() {
    return (
        <section id="gallery" className="py-24 bg-stone-50 overflow-hidden">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-[#002147] mb-4">
                    Campus Life
                </h2>
                <p className="text-lg text-gray-600">
                    Moments that define the SR INTERNATIONAL experience.
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
                            <Image
                                src={src}
                                alt={`Campus Life ${index + 1}`}
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 300px, 400px"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
