"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const defaultImages = [
    "/images/mov_7181-YbNvjR4LjLsaMPjN.jpg",
    "/images/whatsapp-image-2023-09-06-at-5.36.44-am.jpeg-mv0DGRPPoPfVQnXv.jpg",
    "/images/whatsapp-image-2024-03-10-at-6.30.48-pm.jpeg-AGB6XwzzlNfQpNag.jpg",
    "/images/whatsapp-image-2024-12-09-at-17.53.59_a545b9dd-AzGeolMMpVH7B2RL.jpg",
    "/images/whatsapp-image-2024-12-09-at-17.54.00_9cb5ef76-ALpnK42Wvns3O2lK.jpg",
    "/images/whatsapp-image-2024-12-11-at-09.39.58_cfab3f28-AoPvjXEbpZuapNXx.jpg"
];

export default function GalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/gallery");
                const data = await response.json();
                if (data.images && data.images.length > 0) {
                    setImages(data.images);
                } else {
                    // Use default images if database is empty
                    setImages(defaultImages.map((url, index) => ({
                        id: `default-${index}`,
                        image_url: url,
                        alt_text: `Gallery Image ${index + 1}`
                    })));
                }
            } catch (error) {
                console.error("Error fetching images:", error);
                setImages(defaultImages.map((url, index) => ({
                    id: `default-${index}`,
                    image_url: url,
                    alt_text: `Gallery Image ${index + 1}`
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </main>
        );
    }

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
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">{heroContent.title}</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            {heroContent.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <div className="container mx-auto px-6 py-20">
                <div className="mb-12 text-center">
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image: any, index: number) => (
                        <motion.div
                            key={image.id || index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                        >
                            <Image
                                src={image.image_url}
                                alt={image.alt_text || `Gallery Image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
