'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';
import Link from 'next/link';

// This will later be fetched from Supabase
const sampleBlogPosts = [
  {
    id: '1',
    title_en: 'BSU Students Win National Innovation Award',
    title_az: 'BDU Tələbələri Milli İnnovasiya Mükafatını Qazandılar',
    content_preview_en: 'A team of BSU computer science students has been awarded the prestigious National Innovation Award for their groundbreaking work in artificial intelligence.',
    content_preview_az: 'BDU kompüter elmləri tələbələrindən ibarət komanda süni intellekt sahəsində inqilabi işlərinə görə nüfuzlu Milli İnnovasiya Mükafatına layiq görülüb.',
    image_url: '/placeholder/blog1.svg',
    created_at: '2025-05-01',
    author: 'Dr. Nadir Aliyev',
    category_en: 'Awards',
    category_az: 'Mükafatlar'
  },
  {
    id: '2',
    title_en: 'New Robotics Lab Opens at SSTCC',
    title_az: 'TETYM-də Yeni Robotika Laboratoriyası Açıldı',
    content_preview_en: 'The Student Scientific-Technical Creativity Center has opened a state-of-the-art robotics lab equipped with the latest technology for student projects.',
    content_preview_az: 'Tələbə Texniki Yaradıcılıq Mərkəzi tələbə layihələri üçün ən son texnologiya ilə təchiz edilmiş müasir robotika laboratoriyası açıb.',
    image_url: '/placeholder/blog2.svg',
    created_at: '2025-04-20',
    author: 'Leyla Mammadova',
    category_en: 'Facilities',
    category_az: 'Obyektlər'
  },
  {
    id: '3',
    title_en: 'Tech Industry Leaders Visit BSU for Innovation Summit',
    title_az: 'Texnologiya Sənayesi Liderləri İnnovasiya Sammiti üçün BDU-ya Səfər Etdilər',
    content_preview_en: 'Leading figures from tech companies across Europe and Asia gathered at BSU for a two-day summit focused on university-industry collaboration.',
    content_preview_az: 'Avropa və Asiyadan texnologiya şirkətlərinin aparıcı şəxsiyyətləri universitet-sənaye əməkdaşlığına həsr olunmuş iki günlük sammit üçün BDU-da toplandılar.',
    image_url: '/placeholder/blog3.svg',
    created_at: '2025-04-15',
    author: 'Kamran Hasanov',
    category_en: 'Events',
    category_az: 'Tədbirlər'
  },
  {
    id: '4',
    title_en: 'Student Startup Secures Major Funding',
    title_az: 'Tələbə Startapı Böyük Maliyyələşmə Əldə Etdi',
    content_preview_en: 'A health tech startup founded by three BSU students has secured €1.2 million in seed funding to develop their innovative medical device.',
    content_preview_az: 'Üç BDU tələbəsi tərəfindən qurulan səhiyyə texnologiyaları startapı innovativ tibbi cihazlarını inkişaf etdirmək üçün 1,2 milyon avro ilkin maliyyələşdirmə əldə edib.',
    image_url: '/placeholder/blog1.svg',
    created_at: '2025-04-10',
    author: 'Sabina Ahmadova',
    category_en: 'Success Stories',
    category_az: 'Uğur Hekayələri'
  },
  {
    id: '5',
    title_en: 'SSTCC Launches New Mentorship Program',
    title_az: 'TETYM Yeni Mentorluq Proqramını İşə Salır',
    content_preview_en: 'The center has initiated a mentorship program connecting students with industry professionals to guide innovation projects and career development.',
    content_preview_az: 'Mərkəz innovasiya layihələri və karyera inkişafına rəhbərlik etmək üçün tələbələri sənaye mütəxəssisləri ilə əlaqələndirən mentorluq proqramını başladıb.',
    image_url: '/placeholder/blog2.svg',
    created_at: '2025-04-05',
    author: 'Dr. Elnur Hasanov',
    category_en: 'Programs',
    category_az: 'Proqramlar'
  },
  {
    id: '6',
    title_en: 'BSU Hosts International Science Olympiad',
    title_az: 'BDU Beynəlxalq Elm Olimpiadasına Ev Sahibliyi Edir',
    content_preview_en: 'Students from 15 countries participated in the International Science Olympiad hosted by BSU, showcasing innovative solutions to global challenges.',
    content_preview_az: 'BDU-nun ev sahibliyi etdiyi Beynəlxalq Elm Olimpiadasında 15 ölkədən tələbələr iştirak edərək qlobal çağırışlara innovativ həllər nümayiş etdirdilər.',
    image_url: '/placeholder/blog3.svg',
    created_at: '2025-03-25',
    author: 'Nigar Ismayilova',
    category_en: 'Events',
    category_az: 'Tədbirlər'
  }
];

// Get unique categories from blog posts
const getCategories = (posts: any[], language: string) => {
  const categoryField = language === 'en' ? 'category_en' : 'category_az';
  const uniqueCategories = new Set();
  
  posts.forEach(post => {
    if (post[categoryField]) {
      uniqueCategories.add(post[categoryField]);
    }
  });
  
  return ['All', ...Array.from(uniqueCategories)] as string[];
};

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const categories = getCategories(sampleBlogPosts, language);
  
  // Filter and sort blog posts based on selected filters and sort option
  const filteredPosts = sampleBlogPosts
    .filter(post => {
      const titleField = language === 'en' ? 'title_en' : 'title_az';
      const contentField = language === 'en' ? 'content_preview_en' : 'content_preview_az';
      const categoryField = language === 'en' ? 'category_en' : 'category_az';
      
      const matchesCategory = selectedCategory === 'All' || post[categoryField] === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        post[titleField].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post[contentField].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === 'alphabetical') {
        const titleFieldA = language === 'en' ? a.title_en : a.title_az;
        const titleFieldB = language === 'en' ? b.title_en : b.title_az;
        return titleFieldA.localeCompare(titleFieldB);
      }
      return 0;
    });

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('blog.pageTitle')}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('blog.pageSubtitle')}
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
              placeholder={t('blog.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">{t('blog.category')}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <label className="text-sm text-gray-600 block mb-1">{t('blog.sortBy')}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">{t('blog.newest')}</option>
                <option value="oldest">{t('blog.oldest')}</option>
                <option value="alphabetical">{t('blog.alphabetical')}</option>
              </select>
            </div>
            
            {/* Reset button */}
            {(selectedCategory !== 'All' || searchQuery !== '' || sortBy !== 'newest') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSortBy('newest');
                }}
                className="px-4 py-2 text-sm text-green-600 hover:text-green-800"
              >
                {t('blog.resetFilters')}
              </button>
            )}
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          {t('blog.showing')} {filteredPosts.length} {t('blog.results')}
        </p>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Card
              key={post.id}
              title={language === 'en' ? post.title_en : post.title_az}
              description={language === 'en' ? post.content_preview_en : post.content_preview_az}
              image={post.image_url}
              link={`/blog/${post.id}`}
              index={index}
            />
          ))}
        </div>
        
        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">{t('blog.noResults')}</h3>
              <p className="mt-1 text-gray-500">{t('blog.tryAdjusting')}</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800"
              >
                {t('blog.resetFilters')}
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
