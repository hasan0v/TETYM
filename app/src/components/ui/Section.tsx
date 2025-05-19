'use client';

import { ReactNode } from 'react';
import { useLanguage } from '@/lib/language';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string; // Translation key
  viewAllLink?: string;
  bgColor?: string;
  children: ReactNode;
}

export default function Section({ title, viewAllLink, bgColor = 'bg-white', children }: SectionProps) {
  const { t } = useLanguage();

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t(title)}
          </motion.h2>
          
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              {t('home.ideas.viewAll')}
              <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </section>
  );
}
