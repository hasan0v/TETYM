'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';
// import Link from 'next/link';

// This will later be fetched from Supabase
const sampleClubs = [
  {
    id: '1',
    name_en: 'Robotics Club',
    name_az: 'Robotika Dərnəyi',
    description_en: 'Design, build, and program robots. Learn mechanical engineering, electronics, and programming skills through hands-on projects.',
    description_az: 'Robotlar dizayn edin, qurun və proqramlaşdırın. Əməli layihələr vasitəsilə mexanik mühəndislik, elektronika və proqramlaşdırma bacarıqlarını öyrənin.',
    image_url: '/placeholder/club1.svg',
    members_count: 42,
    founded_date: '2023-09-15',
    category_en: 'Engineering',
    category_az: 'Mühəndislik'
  },
  {
    id: '2',
    name_en: 'AI Research Group',
    name_az: 'Süni İntellekt Tədqiqat Qrupu',
    description_en: 'Explore artificial intelligence, machine learning, and neural networks. Work on projects from basic algorithms to advanced applications.',
    description_az: 'Süni intellekt, maşın öyrənməsi və neyron şəbəkələrini araşdırın. Əsas alqoritmlərdən qabaqcıl tətbiqlərə qədər layihələr üzərində çalışın.',
    image_url: '/placeholder/club2.svg',
    members_count: 35,
    founded_date: '2024-01-20',
    category_en: 'Computer Science',
    category_az: 'Kompüter Elmləri'
  },
  {
    id: '3',
    name_en: 'Sustainable Innovation Hub',
    name_az: 'Davamlı İnnovasiya Mərkəzi',
    description_en: 'Develop eco-friendly technologies and solutions. Focus on renewable energy, waste reduction, and sustainable design principles.',
    description_az: 'Ekoloji cəhətdən təmiz texnologiyalar və həllər hazırlayın. Bərpa olunan enerji, tullantıların azaldılması və davamlı dizayn prinsiplərinə diqqət yetirin.',
    image_url: '/placeholder/club3.svg',
    members_count: 28,
    founded_date: '2024-03-05',
    category_en: 'Sustainability',
    category_az: 'Davamlılıq'
  },
  {
    id: '4',
    name_en: 'Game Development Society',
    name_az: 'Oyun İnkişafı Cəmiyyəti',
    description_en: 'Create video games from concept to completion. Learn game design, 2D/3D graphics, animation, programming, and sound design.',
    description_az: 'Konsepsiyadan tamamlanana qədər video oyunlar yaradın. Oyun dizaynı, 2D/3D qrafika, animasiya, proqramlaşdırma və səs dizaynını öyrənin.',
    image_url: '/placeholder/club1.svg',
    members_count: 31,
    founded_date: '2023-11-10',
    category_en: 'Game Development',
    category_az: 'Oyun İnkişafı'
  },
  {
    id: '5',
    name_en: 'Smart City Solutions',
    name_az: 'Ağıllı Şəhər Həlləri',
    description_en: 'Work on urban technologies to improve city living. Focus on IoT, data analytics, and automation to solve urban challenges.',
    description_az: 'Şəhər yaşayışını yaxşılaşdırmaq üçün şəhər texnologiyaları üzərində işləyin. Şəhər problemlərini həll etmək üçün IoT, data analitikası və avtomatlaşdırmaya diqqət yetirin.',
    image_url: '/placeholder/club2.svg',
    members_count: 23,
    founded_date: '2024-02-15',
    category_en: 'Smart Technologies',
    category_az: 'Ağıllı Texnologiyalar'
  },
  {
    id: '6',
    name_en: 'Biotech Explorers',
    name_az: 'Biotexnologiya Kaşifləri',
    description_en: 'Research biological applications of technology. Work on projects related to medical innovations, bioinformatics, and genetic engineering.',
    description_az: 'Texnologiyanın bioloji tətbiqlərini araşdırın. Tibbi innovasiyalar, bioinformatika və gen mühəndisliyi ilə bağlı layihələr üzərində işləyin.',
    image_url: '/placeholder/club3.svg',
    members_count: 19,
    founded_date: '2024-04-08',
    category_en: 'Biotechnology',
    category_az: 'Biotexnologiya'
  }
];

// Define interface for club objects
interface Club {
  id: string;
  name_en: string;
  name_az: string;
  description_en: string;
  description_az: string;
  image_url: string;
  members_count: number;
  founded_date: string;
  category_en: string;
  category_az: string;
}

// Get unique categories from clubs
const getCategories = (clubs: Club[], language: string) => {
  const categoryField = language === 'en' ? 'category_en' : 'category_az';
  const uniqueCategories = new Set();
  
  clubs.forEach(club => {
    if (club[categoryField]) {
      uniqueCategories.add(club[categoryField]);
    }
  });
  
  return ['All', ...Array.from(uniqueCategories)] as string[];
};

export default function ClubsPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  
  const categories = getCategories(sampleClubs, language);
  
  // Filter and sort clubs based on selected filters and sort option
  const filteredClubs = sampleClubs
    .filter(club => {
      const nameField = language === 'en' ? 'name_en' : 'name_az';
      const descriptionField = language === 'en' ? 'description_en' : 'description_az';
      const categoryField = language === 'en' ? 'category_en' : 'category_az';
      
      const matchesCategory = selectedCategory === 'All' || club[categoryField] === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        club[nameField].toLowerCase().includes(searchQuery.toLowerCase()) ||
        club[descriptionField].toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'alphabetical') {
        const nameFieldA = language === 'en' ? a.name_en : a.name_az;
        const nameFieldB = language === 'en' ? b.name_en : b.name_az;
        return nameFieldA.localeCompare(nameFieldB);
      } else if (sortBy === 'members') {
        return b.members_count - a.members_count;
      } else if (sortBy === 'newest') {
        return new Date(b.founded_date).getTime() - new Date(a.founded_date).getTime();
      }
      return 0;
    });

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('clubs.pageTitle')}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('clubs.pageSubtitle')}
          </motion.p>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          {/* Search */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder={t('clubs.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">{t('clubs.category')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">{t('clubs.sortBy')}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="alphabetical">{t('clubs.alphabetical')}</option>
                <option value="members">{t('clubs.mostMembers')}</option>
                <option value="newest">{t('clubs.newest')}</option>
              </select>
            </div>
            
            {/* Reset button */}
            {(selectedCategory !== 'All' || searchQuery !== '' || sortBy !== 'alphabetical') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSortBy('alphabetical');
                }}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
              >
                {t('clubs.resetFilters')}
              </button>
            )}
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          {t('clubs.showing')} {filteredClubs.length} {t('clubs.results')}
        </p>
        
        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map((club, index) => (
            <Card
              key={club.id}
              title={language === 'en' ? club.name_en : club.name_az}
              description={language === 'en' ? club.description_en : club.description_az}
              image={club.image_url}
              link={`/clubs/${club.id}`}
              index={index}
            />
          ))}
        </div>
        
        {/* No Results */}
        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">{t('clubs.noResults')}</h3>
              <p className="mt-1 text-gray-500">{t('clubs.tryAdjusting')}</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {t('clubs.resetFilters')}
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
