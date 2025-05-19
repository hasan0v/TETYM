// Simple script to create Card.tsx
const fs = require('fs');
const path = require('path');

const cardContent = `'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index?: number;
}

export default function Card({ title, description, image, link, index = 0 }: CardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <motion.div 
      className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        {!imageError ? (
          <Image 
            src={image} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : null}
        
        {/* Always show as fallback for error or while loading */}
        <div className={\`absolute inset-0 flex items-center justify-center text-4xl font-bold \${imageError ? 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-500' : 'text-gray-300 z-0'}\`}>
          {title.substring(0, 2).toUpperCase()}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">{description}</p>
        <Link 
          href={link}
          className="inline-flex self-start items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm"
        >
          Learn More
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}`;

// Write the file
fs.writeFileSync('src/components/ui/Card.tsx', cardContent);

console.log('Card.tsx has been created successfully!');
