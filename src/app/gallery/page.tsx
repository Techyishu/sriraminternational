"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const heroContent = {
    title: "Gallery",
    subtitle: "Capturing Moments, Celebrating Excellence"
};

const description = "Explore our vibrant school community through these beautiful moments captured throughout the year.";

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
                    // No images in database - dynamic gallery will be empty
                    setImages([]);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
                // On error, show empty dynamic gallery
                setImages([]);
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

            {/* Gallery Grid - Dynamic from Admin Panel */}
            <div className="container mx-auto px-6 py-20">
                <div className="mb-12 text-center">
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                {images.length > 0 ? (
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
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No images available yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
