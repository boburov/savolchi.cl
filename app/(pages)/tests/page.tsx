"use client";

import tests from "@/app/api/service/tests.service";
import { FileQuestion, Users, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Subjects {
  name: string;
  id: string;
  Test: [];
}

export default function Page() {
  const [subjects, setSubjects] = useState<Subjects[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await tests.all();
      setSubjects(res);
    }
    fetchData();
  }, []);

  return (
    <section className="min-h-[80vh] container mx-auto py-10 border-x border-gray-300">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-12 flex items-center gap-3 text-purple-600 drop-shadow-sm"
      >
        <Sparkles className="text-purple-500" size={32} /> Test mavzulari
      </motion.h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject, i) => (
          <motion.section
            key={subject.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="backdrop-blur-xl bg-gray-200 border border-gray-300 shadow-sm rounded-3xl p-6 flex flex-col justify-between h-44 hover:bg-white/50 transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-purple-700 drop-shadow-sm">
                {subject.name}
              </h2>
              <FileQuestion className="text-purple-500" />
            </div>

            <div className="text-sm text-gray-700 mt-3">ID: {subject.id}</div>

            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Users size={18} className="text-purple-500" />
              <span>Testni bajarganlar: {subjects.length}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Users size={18} className="text-purple-500" />
              <span>Umumiy Testlar Soni: {subject.Test.length}</span>
            </div>

            <motion.a
              href={`tests/${subject.id}`}
              whileHover={{ x: 4 }}
              className="mt-1 text-white font-semibold flex items-center gap-1 bg-purple-600 w-10 h-10 rounded-full justify-center absolute bottom-3 right-3"
            >
              <ArrowRight size={20} />
            </motion.a>
          </motion.section>
        ))}
      </section>
    </section>
  );
}
