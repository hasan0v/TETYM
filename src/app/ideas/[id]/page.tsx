'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Define the Idea interface
interface Idea {
  id: string;
  title_en: string;
  title_az: string;
  description_en: string;
  description_az: string;
  full_description_en?: string;
  full_description_az?: string;
  cover_image_url: string;
  status: string;
  category_en: string;
  category_az: string;
  created_at: string;
  author_name?: string;
  technologies?: string[];
  upvotes?: number;
  team_size?: number;
  duration_months?: number;
  current_phase?: string;
}

// This will later be fetched from Supabase based on the ID
const sampleIdeas: Idea[] = [
  {
    id: '1',
    title_en: 'Smart Campus Navigation System',
    title_az: 'Ağıllı Kampus Naviqasiya Sistemi',
    description_en: 'A mobile app using AR to help students navigate university buildings, find classes, and discover facilities with real-time information.',
    description_az: 'Tələbələrə universitet binalarında naviqasiya etməyə, dərsləri tapmağa və real vaxt rejimində məlumatlarla obyektləri tapmağa kömək etmək üçün AR istifadə edən mobil tətbiq.',
    full_description_en: `This project aims to develop a comprehensive mobile application that leverages Augmented Reality (AR) technology to enhance the campus navigation experience for students, faculty, and visitors at Baku State University.

Key Features:
- Interactive 3D maps of all university buildings and outdoor spaces
- Real-time location tracking and navigation with AR overlays
- Classroom and facility finder with schedule integration
- Points of interest highlighting (cafeterias, libraries, administration offices)
- Accessibility routes for students with mobility challenges
- Event integration showing current and upcoming events in different locations
- Search functionality for quickly locating specific rooms or facilities
- User customization options for personalized experience

Technical Implementation:
The application will be built using React Native for cross-platform compatibility, with ARKit (iOS) and ARCore (Android) for the augmented reality components. Backend services will be implemented using Node.js and PostgreSQL, with real-time updates managed through WebSockets.`,
    full_description_az: `Bu layihə Bakı Dövlət Universitetində tələbələr, müəllimlər və ziyarətçilər üçün kampus naviqasiya təcrübəsini təkmilləşdirmək üçün genişləndirilmiş reallıq (AR) texnologiyasından istifadə edən hərtərəfli mobil tətbiq hazırlamağı hədəfləyir.

Əsas xüsusiyyətlər:
- Bütün universitet binaları və açıq məkanların interaktiv 3D xəritələri
- AR örtükləri ilə real vaxt məkan izləmə və naviqasiya
- Cədvəl inteqrasiyası ilə sinif və obyekt axtarış sistemi
- Maraq məntəqələrinin vurğulanması (kafedralar, kitabxanalar, inzibati ofislər)
- Mobillik çətinlikləri olan tələbələr üçün əlçatanlıq marşrutları
- Müxtəlif məkanlarda cari və gələcək tədbirləri göstərən tədbir inteqrasiyası
- Xüsusi otaqları və ya obyektləri tez tapmaq üçün axtarış funksionallığı
- Fərdi təcrübə üçün istifadəçi özəlləşdirmə seçimləri

Texniki İcra:
Tətbiq, platformalararası uyğunluq üçün React Native istifadə edərək, genişləndirilmiş reallıq komponentləri üçün ARKit (iOS) və ARCore (Android) ilə qurulacaq. Backend xidmətləri Node.js və PostgreSQL istifadə edərək həyata keçiriləcək və real vaxt yeniləmələri WebSockets vasitəsilə idarə olunacaq.`,
    cover_image_url: '/placeholder/idea1.svg',
    status: 'approved',
    category_en: 'Mobile Apps',
    category_az: 'Mobil Tətbiqlər',
    created_at: '2025-03-10',
    author_name: 'Aysel Mammadova',
    technologies: ['React Native', 'ARKit', 'ARCore', 'Node.js', 'PostgreSQL'],
    upvotes: 124,
    team_size: 3,
    duration_months: 6,
    current_phase: 'Development'
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
  }
];

export default function IdeaDetailPage() {
  const params = useParams();
  const { language, t } = useLanguage();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // This will be replaced with a Supabase fetch in production
    const fetchIdea = () => {
      setTimeout(() => {
        const foundIdea = sampleIdeas.find(item => item.id === params.id);
        setIdea(foundIdea || null);
        setLoading(false);
      }, 300); // Simulate network request
    };
    
    fetchIdea();
  }, [params.id]);
  
  // Handle loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse flex flex-col w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-80 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Handle not found
  if (!idea) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('ideas.notFound')}</h1>
          <p className="mb-6">{t('ideas.noIdeaWithId')}</p>
          <Link 
            href="/ideas" 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {t('ideas.backToIdeas')}
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const title = language === 'en' ? idea.title_en : idea.title_az;
  const description = language === 'en' ? idea.full_description_en || idea.description_en : idea.full_description_az || idea.description_az;
  const category = language === 'en' ? idea.category_en : idea.category_az;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-indigo-600">{t('nav.home')}</Link>
          <span className="mx-2">/</span>
          <Link href="/ideas" className="text-gray-500 hover:text-indigo-600">{t('nav.ideas')}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{title}</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title and meta */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-x-6 gap-y-2">
            {idea.created_at && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{new Date(idea.created_at).toLocaleDateString()}</span>
              </div>
            )}
            
            {category && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>{category}</span>
              </div>
            )}
            
            {idea.author_name && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{idea.author_name}</span>
              </div>
            )}
            
            {idea.status && (
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                {idea.status}
              </span>
            )}
          </div>
          
          {/* Main image */}
          <div className="relative h-80 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={idea.cover_image_url}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {description.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          {/* Project details section */}
          {(idea.technologies || idea.team_size || idea.duration_months || idea.current_phase) && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">{t('ideas.projectDetails')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {idea.technologies && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t('ideas.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {idea.technologies.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {idea.team_size && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t('ideas.teamSize')}</h4>
                    <p>{idea.team_size} {t('ideas.people')}</p>
                  </div>
                )}
                
                {idea.duration_months && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t('ideas.duration')}</h4>
                    <p>{idea.duration_months} {t('ideas.months')}</p>
                  </div>
                )}
                
                {idea.current_phase && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">{t('ideas.currentPhase')}</h4>
                    <p>{idea.current_phase}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              {idea.upvotes !== undefined && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span>{idea.upvotes} {t('ideas.upvotes')}</span>
                </button>
              )}
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
                <span>{t('ideas.discuss')}</span>
              </button>
            </div>
            
            <Link 
              href="/ideas"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('ideas.backToIdeas')}
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
