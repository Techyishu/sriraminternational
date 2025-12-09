"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Award, Microscope, Palette } from "lucide-react";

const programs = [
    {
        icon: GraduationCap,
        title: "CBSE Curriculum",
        description: "Comprehensive education following the Central Board of Secondary Education framework, ensuring academic excellence and holistic development.",
        color: "bg-blue-100 text-blue-700"
    },
    {
        icon: BookOpen,
        title: "Play Way to Nursery",
        description: "Early childhood education through play-based learning, nurturing curiosity and creativity in our youngest learners.",
        color: "bg-green-100 text-green-700"
    },
    {
        icon: Users,
        title: "Small Class Sizes",
        description: "Personalized attention with optimal student-teacher ratios, ensuring every child receives the support they need to thrive.",
        color: "bg-purple-100 text-purple-700"
    },
    {
        icon: Award,
        title: "Academic Excellence",
        description: "Consistent track record of outstanding results, with students excelling in board examinations and competitive assessments.",
        color: "bg-yellow-100 text-yellow-700"
    },
    {
        icon: Microscope,
        title: "Science & Technology",
        description: "State-of-the-art laboratories and technology integration, preparing students for the challenges of tomorrow.",
        color: "bg-red-100 text-red-700"
    },
    {
        icon: Palette,
        title: "Arts & Creativity",
        description: "Vibrant arts programs including visual arts, music, and drama, fostering creative expression and cultural appreciation.",
        color: "bg-pink-100 text-pink-700"
    }
];

export default function ProgramsSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#002147] mb-4">
                        Our Programs
                    </h2>
                    <div className="h-1.5 w-24 bg-[#FEC301] mx-auto rounded-full mb-4" />
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive educational programs designed to nurture every aspect of your child's growth
                    </p>
                </motion.div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
                        >
                            <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <program.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#002147] mb-4 group-hover:text-[#FEC301] transition-colors">
                                {program.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {program.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-[#002147] rounded-2xl p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">
                            Ready to Begin Your Journey?
                        </h3>
                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                            Join our community of learners and discover the difference that quality education makes
                        </p>
                        <a
                            href="/admissions"
                            className="inline-block bg-[#FEC301] text-[#002147] px-8 py-4 font-bold text-lg rounded-lg hover:bg-white transition-all shadow-lg"
                        >
                            Explore Admissions
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

