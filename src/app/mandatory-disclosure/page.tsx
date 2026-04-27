"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Building, GraduationCap, Users, BookOpen, Award, ChevronDown, ChevronUp } from "lucide-react";

interface Disclosure {
    id: string;
    category: string;
    title: string;
    value: string;
    display_order: number;
}

interface GroupedDisclosures {
    [category: string]: Disclosure[];
}

const categoryIcons: Record<string, any> = {
    "General Information": Building,
    "School Infrastructure": Building,
    "Teaching Staff": Users,
    "Academics": BookOpen,
    "Fee Structure": Award,
    "Recognition & Affiliation": Shield,
    "Contact Details": Building,
    "Results": GraduationCap,
};

const categoryColors: Record<string, string> = {
    "General Information": "from-blue-500 to-blue-600",
    "School Infrastructure": "from-emerald-500 to-emerald-600",
    "Teaching Staff": "from-purple-500 to-purple-600",
    "Academics": "from-amber-500 to-amber-600",
    "Fee Structure": "from-rose-500 to-rose-600",
    "Recognition & Affiliation": "from-indigo-500 to-indigo-600",
    "Contact Details": "from-teal-500 to-teal-600",
    "Results": "from-orange-500 to-orange-600",
};

export default function MandatoryDisclosurePage() {
    const containerRef = useRef(null);
    const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchDisclosures();
    }, []);

    const fetchDisclosures = async () => {
        try {
            const res = await fetch("/api/disclosures");
            const data = await res.json();
            const items = data.disclosures || [];
            setDisclosures(items);
            // Auto-expand all categories on load
            const cats = new Set<string>(items.map((d: Disclosure) => d.category));
            setExpandedCategories(cats);
        } catch (error) {
            console.error("Error fetching disclosures:", error);
        } finally {
            setLoading(false);
        }
    };

    const groupedDisclosures: GroupedDisclosures = disclosures.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as GroupedDisclosures);

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }
            return next;
        });
    };

    return (
        <main className="min-h-screen bg-gray-50 overflow-hidden" ref={containerRef}>
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 w-80 h-80 bg-secondary rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm mb-8">
                            <Shield size={20} className="text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Transparency</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                            Mandatory<br />
                            <span className="text-primary">Disclosure</span>
                        </h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Complete transparency in accordance with regulatory requirements
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-16">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-gray-500 font-medium">Loading disclosures...</p>
                        </div>
                    </div>
                )}

                {/* Disclosure Categories */}
                {!loading && Object.keys(groupedDisclosures).length > 0 && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {Object.entries(groupedDisclosures).map(([category, items], catIndex) => {
                            const IconComponent = categoryIcons[category] || Shield;
                            const colorGradient = categoryColors[category] || "from-gray-500 to-gray-600";
                            const isExpanded = expandedCategories.has(category);

                            return (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorGradient} flex items-center justify-center shadow-md`}>
                                                <IconComponent size={22} className="text-white" />
                                            </div>
                                            <div className="text-left">
                                                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                                                <p className="text-sm text-gray-500">{items.length} item{items.length > 1 ? "s" : ""}</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-400">
                                            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                        </div>
                                    </button>

                                    {/* Category Items */}
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-gray-100"
                                        >
                                            <div className="divide-y divide-gray-50">
                                                {items.map((item, index) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3 sm:w-2/5">
                                                            <span className="text-xs font-bold text-gray-400 min-w-[24px]">
                                                                {String(index + 1).padStart(2, "0")}
                                                            </span>
                                                            <span className="font-semibold text-gray-800 text-sm">{item.title}</span>
                                                        </div>
                                                        <div className="sm:w-3/5 pl-9 sm:pl-0">
                                                            <span className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                                                                {item.value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {!loading && disclosures.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                            No Disclosures Available
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Mandatory disclosure information will be published here by the school administration.
                        </p>
                    </motion.div>
                )}

                {/* Disclaimer */}
                {!loading && disclosures.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/10"
                    >
                        <p className="text-sm text-gray-600 text-center leading-relaxed">
                            <strong className="text-primary">Disclaimer:</strong> The information provided above is in accordance with the mandatory disclosure requirements.
                            For any queries or clarifications, please contact the school administration.
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
