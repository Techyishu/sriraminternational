"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Calendar, User, Hash, BookOpen } from "lucide-react";

interface SlcRecord {
    id: string;
    student_name: string;
    father_name: string | null;
    class: string | null;
    section: string | null;
    admission_no: string | null;
    slc_no: string | null;
    date_of_issue: string | null;
    reason: string | null;
    academic_year: string | null;
    remarks: string | null;
}

export default function SlcPage() {
    const containerRef = useRef(null);
    const [records, setRecords] = useState<SlcRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await fetch("/api/slc");
            const data = await res.json();
            setRecords(data.records || []);
        } catch (error) {
            console.error("Error fetching SLC records:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRecords = records.filter((record) => {
        const query = searchQuery.toLowerCase();
        return (
            record.student_name?.toLowerCase().includes(query) ||
            record.father_name?.toLowerCase().includes(query) ||
            record.admission_no?.toLowerCase().includes(query) ||
            record.slc_no?.toLowerCase().includes(query) ||
            record.class?.toLowerCase().includes(query) ||
            record.academic_year?.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-gray-50 overflow-hidden" ref={containerRef}>
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm mb-8">
                            <FileText size={20} className="text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wider">School Records</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                            School Leaving<br />
                            <span className="text-primary">Certificate</span>
                        </h1>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Official SLC records issued by S.R. International School
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search & Content Section */}
            <div className="container mx-auto px-6 py-16">
                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-2xl mx-auto mb-16"
                >
                    <div className="relative group">
                        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by student name, admission no, SLC no..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border border-gray-200 shadow-lg focus:shadow-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <p className="text-gray-500 font-medium">Loading records...</p>
                        </div>
                    </div>
                )}

                {/* Records Table */}
                {!loading && filteredRecords.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {/* Desktop Table */}
                        <div className="hidden lg:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-primary to-[#003370]">
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">S.No</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Student Name</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Father&apos;s Name</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Class</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Adm. No</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">SLC No</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Date of Issue</th>
                                            <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredRecords.map((record, index) => (
                                            <tr
                                                key={record.id}
                                                className="hover:bg-primary/5 transition-colors group"
                                            >
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-500">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                        {record.student_name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{record.father_name || "—"}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                                                        {record.class || "—"}{record.section ? ` - ${record.section}` : ""}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{record.admission_no || "—"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{record.slc_no || "—"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{record.date_of_issue || "—"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{record.reason || "—"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-4">
                            {filteredRecords.map((record, index) => (
                                <motion.div
                                    key={record.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            #{index + 1}
                                        </span>
                                        {record.date_of_issue && (
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {record.date_of_issue}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{record.student_name}</h3>
                                    <div className="space-y-2 text-sm">
                                        {record.father_name && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <User size={14} className="text-gray-400" />
                                                <span>Father: {record.father_name}</span>
                                            </div>
                                        )}
                                        {record.class && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <BookOpen size={14} className="text-gray-400" />
                                                <span>Class: {record.class}{record.section ? ` - ${record.section}` : ""}</span>
                                            </div>
                                        )}
                                        {record.admission_no && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Hash size={14} className="text-gray-400" />
                                                <span>Adm. No: {record.admission_no}</span>
                                            </div>
                                        )}
                                        {record.slc_no && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FileText size={14} className="text-gray-400" />
                                                <span>SLC No: {record.slc_no}</span>
                                            </div>
                                        )}
                                        {record.reason && (
                                            <p className="text-gray-500 mt-2 pt-2 border-t border-gray-100">
                                                Reason: {record.reason}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Results Count */}
                        <p className="text-center text-sm text-gray-500 mt-8">
                            Showing {filteredRecords.length} of {records.length} records
                        </p>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && filteredRecords.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                            {searchQuery ? "No Records Found" : "No SLC Records Available"}
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {searchQuery
                                ? "Try adjusting your search query to find the record you're looking for."
                                : "SLC records will appear here once they are published by the school administration."}
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
