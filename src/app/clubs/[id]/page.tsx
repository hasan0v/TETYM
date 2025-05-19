'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define interfaces for club data
interface Achievement {
  title_en: string;
  title_az: string;
  date: string;
}

interface Event {
  title_en: string;
  title_az: string;
  date: string;
  time_en: string;
  time_az: string;
  location_en: string;
  location_az: string;
}

interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

interface Club {
  id: string;
  name_en: string;
  name_az: string;
  description_en: string;
  description_az: string;
  full_description_en: string;
  full_description_az: string;
  image_url: string;
  cover_image_url: string;
  members_count: number;
  founded_date: string;
  category_en: string;
  category_az: string;
  meeting_schedule_en: string;
  meeting_schedule_az: string;
  location_en: string;
  location_az: string;
  faculty_advisor: string;
  contact_email: string;
  social_media: SocialMedia;
  achievements: Achievement[];
  upcoming_events: Event[];
}

// This will later be fetched from Supabase
const sampleClubs: Club[] = [
  {
    id: '1',
    name_en: 'Robotics Club',
    name_az: 'Robotika Dərnəyi',
    description_en: 'Design, build, and program robots. Learn mechanical engineering, electronics, and programming skills through hands-on projects.',
    description_az: 'Robotlar dizayn edin, qurun və proqramlaşdırın. Əməli layihələr vasitəsilə mexanik mühəndislik, elektronika və proqramlaşdırma bacarıqlarını öyrənin.',
    full_description_en: 'The Robotics Club at BSU SSTCC is a vibrant community of students passionate about robots and automation systems. Our club provides a platform for students to design, build, program, and test robotic systems in a collaborative environment. Members work on various projects ranging from simple autonomous vehicles to complex humanoid robots and industrial automation systems. We also participate in national and international robotics competitions, where our teams have won several awards. The club hosts regular workshops on topics such as Arduino programming, sensor integration, mechanical design, and artificial intelligence for robotics. We welcome students from all academic backgrounds who are interested in exploring the exciting world of robotics.',
    full_description_az: 'BDU TETYM-də Robotika Dərnəyi robotlar və avtomatlaşdırma sistemləri ilə maraqlanan tələbələrin canlı birliyidir. Klubumuz tələbələrə əməkdaşlıq mühitində robot sistemlərini dizayn etmək, qurmaq, proqramlaşdırmaq və sınaqdan keçirmək üçün platforma təqdim edir. Üzvlər sadə avtonom nəqliyyat vasitələrindən tutmuş mürəkkəb humanoid robotlara və sənaye avtomatlaşdırma sistemlərinə qədər müxtəlif layihələr üzərində işləyirlər. Biz həmçinin komandalarımızın bir neçə mükafat qazandığı milli və beynəlxalq robotika yarışlarında iştirak edirik. Klub Arduino proqramlaşdırması, sensor inteqrasiyası, mexaniki dizayn və robotika üçün süni intellekt kimi mövzularda müntəzəm seminarlar keçirir. Biz robotikanın həyəcanverici dünyasını kəşf etməklə maraqlanan bütün akademik ixtisaslardan olan tələbələri qəbul edirik.',
    image_url: '/placeholder/club1.svg',
    cover_image_url: '/placeholder/club-cover1.svg',
    members_count: 42,
    founded_date: '2023-09-15',
    category_en: 'Engineering',
    category_az: 'Mühəndislik',
    meeting_schedule_en: 'Every Tuesday and Thursday, 4:00 PM - 6:00 PM',
    meeting_schedule_az: 'Hər çərşənbə axşamı və cümə axşamı, saat 16:00 - 18:00',
    location_en: 'Engineering Building, Room E301',
    location_az: 'Mühəndislik Binası, Otaq E301',
    faculty_advisor: 'Dr. Vugar Ahmadov',
    contact_email: 'robotics.club@bsusttc.edu.az',
    social_media: {
      instagram: 'bsu_robotics',
      facebook: 'BSURoboticsClub',
      twitter: 'BSU_Robotics'
    },
    achievements: [
      {
        title_en: 'First Place at National Robotics Competition 2024',
        title_az: '2024 Milli Robotika Yarışmasında Birinci Yer',
        date: '2024-03-20'
      },
      {
        title_en: 'Best Technical Innovation Award at EuroRobotics 2023',
        title_az: 'EuroRobotics 2023-də Ən Yaxşı Texniki İnnovasiya Mükafatı',
        date: '2023-11-05'
      }
    ],
    upcoming_events: [
      {
        title_en: 'Robotics Workshop for Beginners',
        title_az: 'Yeni Başlayanlar üçün Robotika Seminarı',
        date: '2025-06-15',
        time_en: '3:00 PM - 5:00 PM',
        time_az: '15:00 - 17:00',
        location_en: 'Main Campus, Room 203',
        location_az: 'Əsas Korpus, Otaq 203'
      },
      {
        title_en: 'Preparation for International Robotics Competition',
        title_az: 'Beynəlxalq Robotika Yarışmasına Hazırlıq',
        date: '2025-07-01',
        time_en: '4:00 PM - 7:00 PM',
        time_az: '16:00 - 19:00',
        location_en: 'Engineering Building, Room E301',
        location_az: 'Mühəndislik Binası, Otaq E301'
      }
    ]
  },
  {
    id: '2',
    name_en: 'AI Research Group',
    name_az: 'Süni İntellekt Tədqiqat Qrupu',
    description_en: 'Explore artificial intelligence, machine learning, and neural networks. Work on projects from basic algorithms to advanced applications.',
    description_az: 'Süni intellekt, maşın öyrənməsi və neyron şəbəkələrini araşdırın. Əsas alqoritmlərdən qabaqcıl tətbiqlərə qədər layihələr üzərində çalışın.',
    full_description_en: 'The AI Research Group at BSU SSTCC is dedicated to advancing the field of artificial intelligence through collaborative research and innovative applications. Our members explore various domains of AI including machine learning, deep learning, natural language processing, computer vision, and reinforcement learning. The group works on both theoretical research and practical applications, developing solutions for real-world problems. We regularly organize workshops, hackathons, and invited talks from industry experts and academic researchers. The group also collaborates with local tech companies and research institutions to provide members with opportunities for internships and research partnerships. Students joining our group gain valuable experience in cutting-edge AI technologies that are highly sought after in today\'s job market.',
    full_description_az: 'BDU TETYM-də Süni İntellekt Tədqiqat Qrupu əməkdaşlıq tədqiqatı və innovativ tətbiqlər vasitəsilə süni intellekt sahəsinin inkişafına həsr olunub. Üzvlərimiz süni intellektin müxtəlif sahələrini, o cümlədən maşın öyrənməsi, dərin öyrənmə, təbii dilin işlənməsi, kompüter görüntüsü və təqviyələndirici öyrənməni araşdırırlar. Qrup həm nəzəri tədqiqatlar, həm də praktiki tətbiqlər üzərində işləyir və real dünya problemləri üçün həllər hazırlayır. Biz müntəzəm olaraq seminarlar, hakatonlar və sənaye mütəxəssisləri və akademik tədqiqatçılardan dəvətli çıxışlar təşkil edirik. Qrup həmçinin üzvlərə təcrübə və tədqiqat tərəfdaşlığı imkanları təmin etmək üçün yerli texnologiya şirkətləri və tədqiqat institutları ilə əməkdaşlıq edir. Qrupumuza qoşulan tələbələr bu günün iş bazarında çox tələb olunan ən müasir süni intellekt texnologiyalarında qiymətli təcrübə qazanırlar.',
    image_url: '/placeholder/club2.svg',
    cover_image_url: '/placeholder/club-cover2.svg',
    members_count: 35,
    founded_date: '2024-01-20',
    category_en: 'Computer Science',
    category_az: 'Kompüter Elmləri',
    meeting_schedule_en: 'Every Monday and Wednesday, 5:00 PM - 7:00 PM',
    meeting_schedule_az: 'Hər bazar ertəsi və çərşənbə, saat 17:00 - 19:00',
    location_en: 'Computer Science Building, Lab CS201',
    location_az: 'Kompüter Elmləri Binası, Laboratoriya CS201',
    faculty_advisor: 'Prof. Aytən Məmmədli',
    contact_email: 'ai.research@bsusttc.edu.az',
    social_media: {
      instagram: 'bsu_ai_research',
      facebook: 'BSUAIResearch',
      twitter: 'BSU_AI'
    },
    achievements: [
      {
        title_en: 'Best Research Paper at ICML 2024',
        title_az: 'ICML 2024-də Ən Yaxşı Tədqiqat Məqaləsi',
        date: '2024-04-10'
      },
      {
        title_en: 'Innovation Grant from Ministry of Digital Development',
        title_az: 'Rəqəmsal İnkişaf Nazirliyindən İnnovasiya Qrantı',
        date: '2024-02-15'
      }
    ],
    upcoming_events: [
      {
        title_en: 'AI Ethics Workshop',
        title_az: 'Süni İntellekt Etikası Seminarı',
        date: '2025-06-20',
        time_en: '4:00 PM - 6:00 PM',
        time_az: '16:00 - 18:00',
        location_en: 'Computer Science Building, Room 105',
        location_az: 'Kompüter Elmləri Binası, Otaq 105'
      },
      {
        title_en: 'Deep Learning Bootcamp',
        title_az: 'Dərin Öyrənmə Bootcamp',
        date: '2025-07-05',
        time_en: '10:00 AM - 5:00 PM',
        time_az: '10:00 - 17:00',
        location_en: 'SSTCC Main Hall',
        location_az: 'TETYM Əsas Zalı'
      }
    ]
  },
  // Additional clubs would be here
];

export default function ClubDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const { id } = params;
  
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with delay
    const fetchClub = async () => {
      try {
        // This would be replaced with a real API call
        setTimeout(() => {
          const foundClub = sampleClubs.find(c => c.id === id);
          setClub(foundClub || null);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching club details:', error);
        setLoading(false);
      }
    };
    
    fetchClub();
  }, [id]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!club) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">{t('clubs.notFound')}</h3>
            <p className="mt-1 text-gray-500">{t('clubs.notFoundDesc')}</p>
            <div className="mt-6">
              <Link href="/clubs" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {t('common.backToList')}
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const clubName = language === 'en' ? club.name_en : club.name_az;
  const clubDescription = language === 'en' ? club.full_description_en : club.full_description_az;
  const meetingSchedule = language === 'en' ? club.meeting_schedule_en : club.meeting_schedule_az;
  const location = language === 'en' ? club.location_en : club.location_az;
  
  return (
    <MainLayout>
      {/* Hero Section with Cover Image */}
      <div className="relative h-80 lg:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 z-10"></div>
        <Image 
          src={club.cover_image_url || club.image_url}
          alt={clubName}
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">{clubName}</h1>
            <p className="text-xl text-white/90">
              {language === 'en' ? club.category_en : club.category_az}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Club Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('clubs.about')}</h2>
              <p className="text-gray-700 whitespace-pre-line">{clubDescription}</p>
            </div>
            
            {/* Achievements */}
            {club.achievements && club.achievements.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('clubs.achievements')}</h2>
                <div className="space-y-4">
                  {club.achievements.map((achievement: Achievement, index: number) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {language === 'en' ? achievement.title_en : achievement.title_az}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(achievement.date).toLocaleDateString(language === 'en' ? 'en-US' : 'az-AZ', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upcoming Events */}
            {club.upcoming_events && club.upcoming_events.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('clubs.upcomingEvents')}</h2>
                <div className="space-y-6">
                  {club.upcoming_events.map((event: Event, index: number) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-lg font-medium text-gray-800">
                        {language === 'en' ? event.title_en : event.title_az}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600 flex items-center">
                          <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(event.date).toLocaleDateString(language === 'en' ? 'en-US' : 'az-AZ', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {language === 'en' ? event.time_en : event.time_az}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {language === 'en' ? event.location_en : event.location_az}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Right Column - Club Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('clubs.details')}</h2>
              
              <div className="space-y-4">
                {/* Members Count */}
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">{t('clubs.members')}</p>
                    <p className="text-gray-800 font-medium">{club.members_count}</p>
                  </div>
                </div>
                
                {/* Founded Date */}
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">{t('clubs.founded')}</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(club.founded_date).toLocaleDateString(language === 'en' ? 'en-US' : 'az-AZ', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                {/* Meeting Schedule */}
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">{t('clubs.meetings')}</p>
                    <p className="text-gray-800 font-medium">{meetingSchedule}</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">{t('clubs.location')}</p>
                    <p className="text-gray-800 font-medium">{location}</p>
                  </div>
                </div>
                
                {/* Faculty Advisor */}
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">{t('clubs.advisor')}</p>
                    <p className="text-gray-800 font-medium">{club.faculty_advisor}</p>
                  </div>
                </div>
                
                {/* Contact Email */}
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">{t('clubs.email')}</p>
                    <a href={`mailto:${club.contact_email}`} className="text-blue-600 hover:underline font-medium">
                      {club.contact_email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            {club.social_media && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t('clubs.followUs')}</h2>
                <div className="flex space-x-4">
                  {club.social_media.instagram && (
                    <a 
                      href={`https://instagram.com/${club.social_media.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  
                  {club.social_media.facebook && (
                    <a 
                      href={`https://facebook.com/${club.social_media.facebook}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                  )}
                  
                  {club.social_media.twitter && (
                    <a 
                      href={`https://twitter.com/${club.social_media.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('clubs.joinUs')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">{t('clubs.joinUsDesc')}</p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            {t('clubs.contactUs')}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
