'use client';

import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function IdeaCallToAction() {
  const { t } = useLanguage();
  console.log(t('cta.title'));
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have an Innovative Idea?</h2>
          <p className="text-lg text-indigo-100 mb-8">
            We support BSU students in turning their creative and innovative ideas into reality. 
            Submit your idea and get access to mentorship, resources, and potential funding.
          </p>
          <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-4">
            <Link 
              href="/submit-idea"
              className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Submit Your Idea
            </Link>
            <Link 
              href="/idea-process"
              className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
            >
              Learn About the Process
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
