"use client";

import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/images/SR_INTERNATIONAL_LOGO_1.png"
                                    alt="Sriram International Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-serif font-bold">
                                Sriram International
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering students to become global leaders through excellence in education and character development.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400">
                            {["About Us", "Admissions", "Academics", "Campus Life", "News & Events", "Contact"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>Lalupura,</li>
                            <li>Uttar Pradesh, India</li>
                            <li>+91 9991702040</li>
                            <li>srisofficial007@gmail.com</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest updates and news.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                            <button className="bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>© 2025 Sriram International School. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
