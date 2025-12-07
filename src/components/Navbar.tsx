"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Facilities", href: "/facilities" },
    { name: "Activities", href: "/activities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Toppers", href: "/toppers" },
    { name: "Staff", href: "/staff" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const [navHeight, setNavHeight] = useState(88);

    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <nav
            ref={navRef}
            className={cn(
                "sticky top-0 left-0 right-0 bg-white shadow-md z-50 py-4",
                isOpen ? "z-[9999]" : "z-50"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 group-hover:scale-110 transition-transform">
                        <Image
                            src="/images/SR_INTERNATIONAL_LOGO_1.png"
                            alt="Sriram International Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium transition-colors relative group text-gray-700 hover:text-purple-600"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Apply Now
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden transition-colors text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
                        />

                        {/* Dropdown Menu */}
                        <motion.div
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ top: `${navHeight}px`, maxHeight: `calc(100vh - ${navHeight}px)` }}
                            className="fixed left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl z-[9999] md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col items-center py-8 px-6 gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors py-2 w-full text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <button className="w-full max-w-xs bg-purple-600 text-white py-3 rounded-full text-base font-bold shadow-lg hover:bg-purple-700 transition-all mt-4">
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
