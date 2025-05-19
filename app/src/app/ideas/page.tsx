'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';

// This will later be fetched from Supabase
const sampleIdeas = [
  {
    id: '1',
    title_en: 'Smart Campus Navigation System',
    title_az: 'Ağıllı Kampus Naviqasiya Sistemi',
    description_en: 'A mobile app using AR to help students navigate university buildings, find classes, and discover facilities with real-time information.',
    description_az: 'Tələbələrə universitet binalarında naviqasiya etməyə, dərsləri tapmağa və real vaxt rejimində məlumatlarla obyektləri tapmağa kömək etmək üçün AR istifadə edən mobil tətbiq.',
    cover_image_url: '/placeholder/idea1.svg',
    status: 'approved',
    category_en: 'Mobile Apps',
    category_az: 'Mobil Tətbiqlər',
    created_at: '2025-03-10'
  },
  {
    id: '2',
    title_en: 'Lab Equipment Sharing Platform',
    title_az: 'Laboratoriya Avadanlıqları Paylaşma Platforması',
    description_en: 'A system for different departments to share expensive lab equipment and coordinate usage schedules to maximize research efficiency.',
    description_az: 'Müxtəlif şöbələrin bahalı laboratoriya avadanlıqlarını paylaşması və tədqiqat səmərəliliyini maksimuma çatdırmaq üçün istifadə qrafiklərini əlaqələndirməsi üçün sistem.',
    cover_image_url: '/placeholder/idea2.svg',
    status: 'approved',
    category_en: 'Web Platforms',
    category_az: 'Veb Platformalar',
    created_at: '2025-02-15'
  },
  {
    id: '3',
    title_en: 'Renewable Energy Monitoring',
    title_az: 'Bərpa Olunan Enerji Monitorinqi',
    description_en: 'A project to install small renewable energy generators across campus with real-time monitoring of energy production and consumption.',
    description_az: 'Kampusda kiçik bərpa olunan enerji generatorlarını qurmaq və enerjinin istehsalını və istehlakını real vaxt rejimində izləmək üçün layihə.',
    cover_image_url: '/placeholder/idea3.svg',
    status: 'approved',
    category_en: 'Sustainability',
    category_az: 'Davamlılıq',
    created_at: '2025-01-20'
  },
  {
    id: '4',
    title_en: 'Virtual Study Groups',
    title_az: 'Virtual Tədris Qrupları',
    description_en: 'A platform for creating and joining virtual study groups with integrated tools for collaboration, scheduling, and resource sharing.',
    description_az: 'Əməkdaşlıq, planlaşdırma və resurs paylaşımı üçün inteqrasiya olunmuş alətlərlə virtual tədris qrupları yaratmaq və onlara qoşulmaq üçün platforma.',
    cover_image_url: '/placeholder/idea1.svg',
    status: 'approved',
    category_en: 'Education',
    category_az: 'Təhsil',
    created_at: '2024-12-05'
  },
  {
    id: '5',
    title_en: 'Smart Waste Management',
    title_az: 'Ağıllı Tullantıların İdarə Edilməsi',
    description_en: 'IoT-enabled waste bins across campus that monitor fill levels and optimize collection routes for the maintenance staff.',
    description_az: 'Kampus boyunca IoT-yə qoşulmuş tullantı qabları dolma səviyyələrini izləyir və texniki xidmət işçiləri üçün toplama marşrutlarını optimallaşdırır.',
    cover_image_url: '/placeholder/idea2.svg',
    status: 'approved',
    category_en: 'IoT',
    category_az: 'IoT',
    created_at: '2024-11-12'
  },
  {
    id: '6',
    title_en: 'Student Mentorship Network',
    title_az: 'Tələbə Mentorluq Şəbəkəsi',
    description_en: 'A platform connecting senior students with freshmen for academic guidance, university life advice, and career mentorship.',
    description_az: 'Akademik rəhbərlik, universitet həyatı məsləhətləri və karyera mentorluğu üçün yuxarı kurs tələbələrini birinci kurs tələbələri ilə əlaqələndirən platforma.',
    cover_image_url: '/placeholder/idea3.svg',
    status: 'approved',
    category_en: 'Community',
    category_az: 'İcma',
    created_at: '2024-10-25'
  }
];

// Get unique categories from ideas
const getCategories = (ideas: any[], language: string) => {
  const categoryField = language === 'en' ? 'category_en' : 'category_az';
  const uniqueCategories = new Set();
  
  ideas.forEach(idea => {
    if (idea[categoryField]) {
      uniqueCategories.add(idea[categoryField]);
    }
  });
  
  return ['All', ...Array.from(uniqueCategories)] as string[];
};

export default function IdeasPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getCategories(sampleIdeas, language);
  
  // Filter ideas based on selected category and search query
  const filteredIdeas = sampleIdeas.filter(idea => {
    const titleField = language === 'en' ? 'title_en' : 'title_az';
    const descriptionField = language === 'en' ? 'description_en' : 'description_az';
    const categoryField = language === 'en' ? 'category_en' : 'category_az';
    
    const matchesCategory = selectedCategory === 'All' || idea[categoryField] === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      idea[titleField].toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea[descriptionField].toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('ideas.title')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">{t('ideas.subtitle')}</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder={t('ideas.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          {t('ideas.showing')} {filteredIdeas.length} {t('ideas.results')}
        </p>
        
        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea, index) => (
            <Card
              key={idea.id}
              title={language === 'en' ? idea.title_en : idea.title_az}
              description={language === 'en' ? idea.description_en : idea.description_az}
              image={idea.cover_image_url}
              link={`/ideas/${idea.id}`}
              index={index}
            />
          ))}
        </div>
        
        {/* No Results */}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">{t('ideas.noResults')}</h3>
              <p className="mt-1 text-gray-500">{t('ideas.tryAdjusting')}</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
              >
                {t('ideas.resetFilters')}
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
