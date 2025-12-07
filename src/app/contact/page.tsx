"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="min-h-screen bg-gray-50 overflow-hidden" ref={containerRef}>
            {/* Typographic Hero Section */}
            <section className="pt-32 pb-16 bg-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Contact Us</h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            We're Here to Help
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Split Screen Content */}
            <div className="container mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

                    {/* Left Side: Info & Map */}
                    <div className="lg:w-1/2 p-12 bg-gray-50 flex flex-col justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">Get in Touch</h2>
                            <div className="space-y-8">
                                {[
                                    { icon: MapPin, title: "Address", content: ["Lalupura,", "Uttar Pradesh, India"] },
                                    { icon: Phone, title: "Phone", content: ["+91 9991702040"] },
                                    { icon: Mail, title: "Email", content: ["srisofficial007@gmail.com"] },
                                    { icon: Clock, title: "Office Hours", content: ["Monday - Saturday: 8:00 AM - 4:00 PM", "Sunday: Closed"] }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-6 group cursor-pointer">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1 text-lg">{item.title}</h3>
                                            {item.content.map((line, i) => (
                                                <p key={i} className="text-gray-600 group-hover:text-primary transition-colors duration-300 relative inline-block">
                                                    {line}
                                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 flex gap-4">
                                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mt-12 h-64 rounded-2xl overflow-hidden shadow-inner border border-gray-200"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.688636734674!2d77.3478953150824!3d28.61189598242596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50000000001%3A0x1234567890abcdef!2sSriram%20International%20School!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%)" }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-1/2 p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5" />
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below.</p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700 ml-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white/50 backdrop-blur-sm focus:bg-white"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white/50 backdrop-blur-sm focus:bg-white"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-700 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white/50 backdrop-blur-sm focus:bg-white"
                                        placeholder="Inquiry about..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none bg-white/50 backdrop-blur-sm focus:bg-white"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                                >
                                    Send Message
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
