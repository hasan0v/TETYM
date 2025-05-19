'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';

// This will later be fetched from Supabase
const sampleAchievements = [
  {
    id: '1',
    title_en: 'Gold Medal at International Science Olympiad',
    title_az: 'Beynəlxalq Elm Olimpiadasında Qızıl Medal',
    description_en: 'BSU students won gold medal at the International Science Olympiad for their innovative renewable energy solution.',
    description_az: 'BDU tələbələri innovativ bərpa olunan enerji həlli üçün Beynəlxalq Elm Olimpiadasında qızıl medal qazandılar.',
    image_url: '/placeholder/achievement1.svg',
    date_achieved: '2025-03-15',
    category_en: 'Competition',
    category_az: 'Yarış'
  },
  {
    id: '2',
    title_en: 'Best Innovation Award',
    title_az: 'Ən Yaxşı İnnovasiya Mükafatı',
    description_en: 'Our Artificial Intelligence research team received the Best Innovation Award at the European Tech Conference.',
    description_az: 'Süni İntellekt tədqiqat qrupumuz Avropa Texnologiya Konfransında Ən Yaxşı İnnovasiya Mükafatını aldı.',
    image_url: '/placeholder/achievement2.svg',
    date_achieved: '2025-01-22',
    category_en: 'Recognition',
    category_az: 'Tanınma'
  },
  {
    id: '3',
    title_en: 'National Science Foundation Grant',
    title_az: 'Milli Elm Fondu Qrantı',
    description_en: 'SSTCC received a major grant for expanding our research facilities and supporting more student projects.',
    description_az: 'TETYM tədqiqat obyektlərimizi genişləndirmək və daha çox tələbə layihəsini dəstəkləmək üçün böyük qrant aldı.',
    image_url: '/placeholder/achievement3.svg',
    date_achieved: '2024-12-05',
    category_en: 'Funding',
    category_az: 'Maliyyələşdirmə'
  },
  {
    id: '4',
    title_en: 'First Place at Hackathon 2025',
    title_az: 'Hackathon 2025-də Birinci Yer',
    description_en: 'BSU students won first place at the national Hackathon 2025 with their smart city solution.',
    description_az: 'BDU tələbələri ağıllı şəhər həlləri ilə milli Hackathon 2025 yarışmasında birinci yeri qazandılar.',
    image_url: '/placeholder/achievement1.svg',
    date_achieved: '2025-02-10',
    category_en: 'Competition',
    category_az: 'Yarış'
  },
  {
    id: '5',
    title_en: 'Best Research Paper Award',
    title_az: 'Ən Yaxşı Tədqiqat Məqaləsi Mükafatı',
    description_en: 'Our robotics team received the Best Research Paper award at the International Conference on Automation and Robotics.',
    description_az: 'Robotexnika komandamız Avtomatlaşdırma və Robotexnika üzrə Beynəlxalq Konfransında Ən Yaxşı Tədqiqat Məqaləsi mükafatını aldı.',
    image_url: '/placeholder/achievement2.svg',
    date_achieved: '2024-11-18',
    category_en: 'Recognition',
    category_az: 'Tanınma'
  },
  {
    id: '6',
    title_en: 'Technology Innovation Grant',
    title_az: 'Texnologiya İnnovasiya Qrantı',
    description_en: 'Our center was awarded a substantial grant to develop next-generation educational technology solutions for universities.',
    description_az: 'Mərkəzimizə universitetlər üçün növbəti nəsil təhsil texnologiyaları həllərini inkişaf etdirmək üçün böyük qrant verildi.',
    image_url: '/placeholder/achievement3.svg',
    date_achieved: '2024-09-30',
    category_en: 'Funding',
    category_az: 'Maliyyələşdirmə'
  }
];

// Get unique categories from achievements
const getCategories = (achievements: any[], language: string) => {
  const categoryField = language === 'en' ? 'category_en' : 'category_az';
  const uniqueCategories = new Set();
  
  achievements.forEach(achievement => {
    if (achievement[categoryField]) {
      uniqueCategories.add(achievement[categoryField]);
    }
  });
  
  return ['All', ...Array.from(uniqueCategories)] as string[];
};

// Get achievement years for filtering
const getYears = (achievements: any[]) => {
  const years = new Set();
  
  achievements.forEach(achievement => {
    if (achievement.date_achieved) {
      const year = new Date(achievement.date_achieved).getFullYear();
      years.add(year);
    }
  });
  
  return ['All', ...Array.from(years).sort().reverse()] as (string | number)[];
};

export default function AchievementsPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getCategories(sampleAchievements, language);
  const years = getYears(sampleAchievements);
  
  // Filter achievements based on selected filters
  const filteredAchievements = sampleAchievements.filter(achievement => {
    const titleField = language === 'en' ? 'title_en' : 'title_az';
    const descriptionField = language === 'en' ? 'description_en' : 'description_az';
    const categoryField = language === 'en' ? 'category_en' : 'category_az';
    
    const matchesCategory = selectedCategory === 'All' || achievement[categoryField] === selectedCategory;
    const matchesYear = selectedYear === 'All' || 
      (achievement.date_achieved && new Date(achievement.date_achieved).getFullYear() === selectedYear);
    const matchesSearch = searchQuery === '' || 
      achievement[titleField].toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement[descriptionField].toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesYear && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('achievements.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('achievements.subtitle')}
          </motion.p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          {/* Search */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder={t('achievements.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">{t('achievements.category')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Year Filter */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">{t('achievements.year')}</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Reset button */}
            {(selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedYear('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800"
              >
                {t('achievements.resetFilters')}
              </button>
            )}
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          {t('achievements.showing')} {filteredAchievements.length} {t('achievements.results')}
        </p>
        
        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <Card
              key={achievement.id}
              title={language === 'en' ? achievement.title_en : achievement.title_az}
              description={language === 'en' ? achievement.description_en : achievement.description_az}
              image={achievement.image_url}
              link={`/achievements/${achievement.id}`}
              index={index}
            />
          ))}
        </div>
        
        {/* No Results */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">{t('achievements.noResults')}</h3>
              <p className="mt-1 text-gray-500">{t('achievements.tryAdjusting')}</p>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
