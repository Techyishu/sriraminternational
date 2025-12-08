"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const defaultActivities = [
    {
        title: "Sports & Athletics",
        description: "From cricket and football to basketball and athletics, our sports programs promote physical fitness, teamwork, and sportsmanship. Regular inter-school competitions and annual sports meets keep the competitive spirit alive.",
        icon: "🏆"
    },
    {
        title: "Cultural Events",
        description: "Annual day celebrations, cultural festivals, and talent shows provide platforms for students to showcase their artistic abilities in music, dance, drama, and fine arts.",
        icon: "🎭"
    },
    {
        title: "Educational Tours",
        description: "Field trips to historical sites, science centers, and industries enhance learning beyond the classroom, providing real-world context to academic concepts.",
        icon: "🚌"
    },
    {
        title: "Clubs & Societies",
        description: "Debate club, science club, literary society, and environmental club offer students opportunities to pursue their interests and develop leadership skills.",
        icon: "👥"
    },
    {
        title: "Community Service",
        description: "Regular community outreach programs and social service initiatives instill values of empathy, responsibility, and civic engagement in our students.",
        icon: "❤️"
    },
    {
        title: "Competitions",
        description: "We encourage participation in various inter-school competitions including Olympiads, quizzes, debates, and creative writing contests to challenge and inspire excellence.",
        icon: "🏅"
    }
];

const defaultGalleryImages = [
    "/images/mov_7181-YbNvjR4LjLsaMPjN.jpg",
    "/images/whatsapp-image-2024-12-11-at-09.39.58_cfab3f28-AoPvjXEbpZuapNXx.jpg",
    "/images/whatsapp-image-2024-12-09-at-17.54.00_9cb5ef76-ALpnK42Wvns3O2lK.jpg"
];

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<any[]>([]);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activitiesRes, galleryRes] = await Promise.all([
                    fetch("/api/activities"),
                    fetch("/api/gallery")
                ]);
                
                const activitiesData = await activitiesRes.json();
                const galleryData = await galleryRes.json();
                
                if (activitiesData.activities && activitiesData.activities.length > 0) {
                    setActivities(activitiesData.activities);
                } else {
                    setActivities(defaultActivities);
                }
                
                if (galleryData.images && galleryData.images.length > 0) {
                    setGalleryImages(galleryData.images.slice(0, 3).map((img: any) => img.image_url));
                } else {
                    setGalleryImages(defaultGalleryImages);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setActivities(defaultActivities);
                setGalleryImages(defaultGalleryImages);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Activities</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Beyond the Classroom
                        </p>
                    </motion.div>
                </div>
            </section>

            {loading ? (
                <div className="container mx-auto px-6 py-20 text-center">
                    <div className="text-xl">Loading...</div>
                </div>
            ) : (
                <>
                    {/* Activities Grid */}
                    <div className="container mx-auto px-6 py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {activities.map((activity: any, index: number) => (
                                <motion.div
                                    key={activity.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="text-5xl mb-4">{activity.icon || "📋"}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{activity.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Image Gallery Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16"
                        >
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Activity Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galleryImages.map((src: string, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg group"
                            >
                                <Image
                                    src={src}
                                    alt={`Activity ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </main>
    );
}
