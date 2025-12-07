"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Menu, X, Phone, Mail, MapPin, Search, User,
    Facebook, Twitter, Instagram, Linkedin, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);


    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Academics", href: "/academics" },
        { name: "Facilities", href: "/facilities" },
        { name: "Activities", href: "/activities" },
        { name: "Gallery", href: "/gallery" },
        { name: "Toppers", href: "/toppers" },
        { name: "Staff", href: "/staff" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="w-full font-sans">
            {/* Top Bar */}
            <div className="bg-[#002147] text-white py-2 text-sm hidden lg:block">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[#FEC301]" />
                            <span>Lalupura, Uttar Pradesh, India</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-[#FEC301]" />
                            <span>srisofficial007@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-[#FEC301]" />
                            <span>+91 9991702040</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="flex items-center gap-2 hover:text-[#FEC301] transition-colors">
                            <User size={14} />
                            <span>Login / Register</span>
                        </Link>
                        <div className="flex items-center gap-3 border-l border-white/20 pl-4">
                            <Link href="#" className="hover:text-[#FEC301] transition-colors"><Facebook size={14} /></Link>
                            <Link href="#" className="hover:text-[#FEC301] transition-colors"><Twitter size={14} /></Link>
                            <Link href="#" className="hover:text-[#FEC301] transition-colors"><Instagram size={14} /></Link>
                            <Link href="#" className="hover:text-[#FEC301] transition-colors"><Linkedin size={14} /></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-white shadow-sm relative z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative w-20 h-20 md:w-28 md:h-28">
                                {/* Using a placeholder logo style if image fails, but keeping original path */}
                                <Image
                                    src="/images/SR_INTERNATIONAL_LOGO_1.png"
                                    alt="Sriram International"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">


                            {/* Links */}
                            <nav className="flex items-center gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-[#002147] font-bold hover:text-[#FEC301] transition-colors text-sm uppercase tracking-wide"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>


                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden flex items-center gap-4">

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="bg-[#FEC301] p-2 rounded text-[#002147] hover:bg-[#002147] hover:text-[#FEC301] transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 bg-[#002147] z-[100] mt-[0px] overflow-y-auto lg:hidden pt-24" // pt-24 to offset fixed header if needed, but current header isn't fixed
                    >
                        {/* Close button inside overlay if needed, but the toggle is sticky in the main header */}
                        <div className="container mx-auto px-6 py-8 space-y-6 relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-0 right-6 text-white hover:text-[#FEC301] transition-colors"
                            >
                                <X size={32} />
                            </button>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-xl font-bold text-white border-b border-white/10 pb-4 hover:text-[#FEC301] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 space-y-4">
                                <Link href="/login" className="flex items-center gap-3 text-white hover:text-[#FEC301]">
                                    <User size={20} /> Login / Register
                                </Link>
                                <div className="flex items-center gap-4 text-white/70">
                                    <Facebook size={20} />
                                    <Twitter size={20} />
                                    <Instagram size={20} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
