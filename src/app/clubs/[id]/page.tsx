'use client'

import { useState, use, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeftIcon, 
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  TrophyIcon,
  BeakerIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  CpuChipIcon,
  CameraIcon,
  MusicalNoteIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for clubs
const clubsData = [
  {
    id: 1,
    name: 'AI & Machine Learning Club',
    description: 'Süni intellekt və maşın öyrənməsi sahəsində tədqiqat və praktik layihələr həyata keçiririk.',
    longDescription: 'AI & Machine Learning Club TETYM-in ən aktiv və innovativ klublarından biridir. Biz süni intellekt, maşın öyrənməsi, dərin öyrənmə və data science sahələrində həm nəzəri bilikləri dərinləşdirir, həm də praktik layihələr üzərində işləyirik. Klubumuz tələbələrə real dünya problemlərini AI texnologiyaları ilə həll etməyi öyrədir.',
    category: 'Texnologiya',
    members: 45,
    founded: '2023-01-15',
    location: 'ADA Universiteti, Computer Science Building',
    meetingTime: 'Çərşənbə axşamı 18:00',
    duration: '2 saat',
    president: {
      name: 'Əli Məmmədov',
      role: 'Klub Prezidenti',
      email: 'ali.mammadov@tetym.az',
      bio: 'Computer Science 3-cü kurs tələbəsi, AI sahəsində 2 illik təcrübə',
      avatar: '/api/placeholder/80/80'
    },
    vicePresident: {
      name: 'Leyla Əhmədova', 
      role: 'Vitse-prezident',
      email: 'leyla.ahmadova@tetym.az',
      bio: 'Data Science mütəxəssisi, ML competitions qalibi',
      avatar: '/api/placeholder/80/80'
    },
    gradient: 'from-blue-600 to-purple-600',
    icon: 'CpuChipIcon',
    tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow', 'Deep Learning', 'Neural Networks'],
    rating: 4.8,
    image: '/api/placeholder/800/400',
    upcomingEvents: [
      {
        title: 'Deep Learning Workshop',
        date: '2024-12-15',
        time: '18:00',
        location: 'Lab 302',
        description: 'PyTorch ilə neural network qurma'
      },
      {
        title: 'AI Ethics Seminar', 
        date: '2024-12-22',
        time: '17:30',
        location: 'Conference Hall',
        description: 'Süni intellektdə etik məsələlər'
      },
      {
        title: 'Hackathon Preparation',
        date: '2024-12-29',
        time: '14:00', 
        location: 'Main Lab',
        description: 'Yaxınlaşan AI hackathon üçün hazırlıq'
      }
    ],
    recentProjects: [
      {
        title: 'Azərbaycan Dili NLP Modeli',
        description: 'Azərbaycan dili üçün təbii dil emalı modeli',
        status: 'Tamamlandı',
        technologies: ['Python', 'BERT', 'Transformers']
      },
      {
        title: 'Smart Traffic System',
        description: 'Kompüter görmə ilə trafik idarəetmə sistemi', 
        status: 'Davam edir',
        technologies: ['OpenCV', 'YOLO', 'TensorFlow']
      },
      {
        title: 'Medical Diagnosis AI',
        description: 'Tibbi şəkillərin analizi üçün AI sistemi',
        status: 'Planlanır',
        technologies: ['CNN', 'Medical Imaging', 'Deep Learning']
      }
    ],
    achievements: [
      'AI4Good Hackathon 2024 - 1-ci yer',
      'Google AI Challenge Regional Winner',
      '15+ uğurlu ML modeli hazırlanmış',
      'Tech Conference\'də klub təqdimatı',
      '3 tələbə Google AI Residency proqramına qəbul olmuş'
    ],
    activities: [
      'Həftəlik praktik workshop\'lar',
      'Qonaq mütəxəssislərlə seminarlar', 
      'Hackathon və müsabiqələrə qatılım',
      'Open source layihələrə töhfə',
      'Mentorship proqramları'
    ],
    requirements: [
      'Python proqramlaşdırma bilgisi (minimum)',
      'Riyaziyyat və statistika əsasları',
      'Öyrənməyə həvəs və motivasiya',
      'Komanda işi bacarığı'
    ],
    contact: {
      email: 'ai-club@tetym.az',
      telegram: '@tetym_ai_club',
      discord: 'TETYM AI Club#1234',
      website: 'https://ai.tetym.az'
    },
    gallery: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300', 
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    stats: {
      totalProjects: 12,
      activeMembers: 45,
      eventsThisYear: 24,
      graduateMembers: 18
    }
  }
]

const iconMap = {
  CpuChipIcon,
  CodeBracketIcon,
  BeakerIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  CameraIcon,
  MusicalNoteIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  BookOpenIcon,
  AcademicCapIcon
}

export default function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isClient, setIsClient] = useState(false)
  const [joined, setJoined] = useState(false)
  const [liked, setLiked] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, 150])

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const club = clubsData.find(c => c.id === parseInt(resolvedParams.id)) || clubsData[0]
  const IconComponent = iconMap[club.icon as keyof typeof iconMap] || LightBulbIcon

  // Generate consistent particle positions to avoid hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${(i * 8.33) % 90 + 5}%`,
      top: `${(i * 7.14 + 15) % 70 + 15}%`,
      delay: (i * 0.3) % 2.5,
      duration: 4 + (i % 3),
      xOffset: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15)
    }))
  }, [])

  const tabs = [
    { id: 'overview', name: 'Ümumi baxış', shortName: 'Baxış', icon: BookOpenIcon },
    { id: 'events', name: 'Tədbirlər', shortName: 'Tədbir', icon: CalendarIcon },
    { id: 'projects', name: 'Layihələr', shortName: 'Layihə', icon: CodeBracketIcon },
    { id: 'members', name: 'Üzvlər', shortName: 'Üzv', icon: UserGroupIcon }
  ]

  const handleJoin = () => {
    setJoined(!joined)
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Cover Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${club.gradient}`} />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {isClient && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-white/20 rounded-full"
              animate={{
                y: [-20, -100],
                x: [0, particle.xOffset],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="relative z-10 h-full flex items-end"
          style={isClient ? { y: heroY } : {}}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 w-full pb-4 md:pb-8">
            {/* Back button */}
            <motion.div 
              className="mb-4 md:mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/clubs">
                <motion.div
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm md:text-base"
                >
                  <ArrowLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Klublara qayıt
                </motion.div>
              </Link>
            </motion.div>
            
            <div className="flex flex-col items-center md:flex-row md:items-end gap-4 md:gap-8">
              {/* Club Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-100 rounded-lg md:rounded-xl flex items-center justify-center">
                    <IconComponent className="h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 text-blue-600" />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={isClient ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></span>
                </motion.div>
              </motion.div>
              
              {/* Club Info */}
              <motion.div 
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                    {club.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{club.rating}</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">{club.name}</h1>
                <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-2 md:mb-4 line-clamp-2">{club.description}</p>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-blue-100 text-sm md:text-base">
                  <div className="flex items-center justify-center md:justify-start">
                    <UserGroupIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">{club.members} üzv</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">{club.meetingTime}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">{club.location.split(',')[0]}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Actions */}
              <motion.div 
                className="flex flex-row gap-2 md:gap-3 w-full md:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Button 
                  onClick={handleJoin}
                  className={`flex-1 md:flex-initial text-sm md:text-base ${
                    joined ? 'bg-green-500 hover:bg-green-600 text-white' : 'text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <PlusIcon className={`h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 ${joined ? 'rotate-45' : ''} transition-transform`} />
                  <span className="hidden sm:inline">{joined ? 'Üzvsən' : 'Qoşul'}</span>
                  <span className="sm:hidden">{joined ? '✓' : '+'}</span>
                </Button>
                <Button 
                  onClick={handleLike}
                  variant="outline" 
                  className={`flex-1 md:flex-initial border-white/20 text-white text-sm md:text-base ${
                    liked ? 'bg-red-500/20' : ''
                  }`}
                >
                  <HeartIcon className={`h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 ${liked ? 'fill-current text-red-400' : ''}`} />
                  <span className="hidden sm:inline">{liked ? 'Bəyəndim' : 'Bəyən'}</span>
                  <span className="sm:hidden">♡</span>
                </Button>
                <Button variant="outline" className="flex-1 md:flex-initial border-white/20 text-white text-sm md:text-base">
                  <ShareIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Paylaş</span>
                  <span className="sm:hidden">↗</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Sidebar */}
            <motion.div 
              className="lg:col-span-1 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Club Stats */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <TrophyIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Klub Statistikası
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">{club.stats.activeMembers}</div>
                      <div className="text-xs md:text-sm text-gray-600">Aktiv üzv</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-green-600">{club.stats.totalProjects}</div>
                      <div className="text-xs md:text-sm text-gray-600">Layihə</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-purple-600">{club.stats.eventsThisYear}</div>
                      <div className="text-xs md:text-sm text-gray-600">Bu il tədbir</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{club.stats.graduateMembers}</div>
                      <div className="text-xs md:text-sm text-gray-600">Məzun</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Info */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Görüş Məlumatları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <div>
                      <div className="text-sm md:text-base font-medium">{club.meetingTime}</div>
                      <div className="text-xs md:text-sm text-gray-600">Müddət: {club.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <div>
                      <div className="text-sm md:text-base font-medium">Məkan</div>
                      <div className="text-xs md:text-sm text-gray-600">{club.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leadership */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <AcademicCapIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Rəhbərlik
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {club.president.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm md:text-base font-semibold">{club.president.name}</div>
                      <div className="text-xs md:text-sm text-blue-600">{club.president.role}</div>
                      <div className="text-xs text-gray-600 mt-1">{club.president.bio}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {club.vicePresident.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm md:text-base font-semibold">{club.vicePresident.name}</div>
                      <div className="text-xs md:text-sm text-green-600">{club.vicePresident.role}</div>
                      <div className="text-xs text-gray-600 mt-1">{club.vicePresident.bio}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <ChatBubbleLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Əlaqə
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href={`mailto:${club.contact.email}`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                    <EnvelopeIcon className="h-4 w-4 mr-2 md:mr-3" />
                    <span className="truncate">{club.contact.email}</span>
                  </a>
                  <a href={club.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                    <GlobeAltIcon className="h-4 w-4 mr-2 md:mr-3" />
                    <span>Websayt</span>
                  </a>
                  <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-2 md:mr-3" />
                    <span className="truncate">{club.contact.telegram}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              className="lg:col-span-2 order-1 lg:order-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Tabs */}
              <Card className="shadow-lg border-0">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-4 md:space-x-6 lg:space-x-8 px-3 md:px-4 lg:px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        <tab.icon className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 mr-1 md:mr-2 inline-block" />
                        <span className="hidden sm:inline">{tab.name}</span>
                        <span className="sm:hidden">{tab.shortName || tab.name.split(' ')[0]}</span>
                      </motion.button>
                    ))}
                  </nav>
                </div>
                
                <CardContent className="p-3 md:p-4 lg:p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Klub Haqqında</h3>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">{club.longDescription}</p>
                          
                          {/* Club Image */}
                          <div className="rounded-xl overflow-hidden shadow-lg mb-4">
                            <Image 
                              src={club.image} 
                              alt={club.name}
                              width={800}
                              height={400}
                              className="w-full h-48 md:h-64 object-cover"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Fəaliyyətlər</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                            {club.activities.map((activity, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 bg-blue-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-xs md:text-sm text-gray-700">{activity}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Üzvlük Tələbləri</h3>
                          <div className="space-y-2 md:space-y-3">
                            {club.requirements.map((requirement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 bg-green-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-xs md:text-sm text-gray-700">{requirement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Nailiyyətlər</h3>
                          <div className="space-y-2 md:space-y-3">
                            {club.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 bg-yellow-50 rounded-lg"
                              >
                                <TrophyIcon className="h-4 w-4 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-xs md:text-sm text-gray-700">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Texnologiyalar</h3>
                          <div className="flex flex-wrap gap-2">
                            {club.tags.map((tag, index) => (
                              <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === 'events' && (
                      <motion.div
                        key="events"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Yaxınlaşan Tədbirlər</h3>
                          <div className="space-y-4">
                            {club.upcomingEvents.map((event, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 border border-blue-100"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                  <h4 className="text-base md:text-lg font-semibold text-gray-900">{event.title}</h4>
                                  <div className="flex items-center text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    {event.date}
                                  </div>
                                </div>
                                <p className="text-sm md:text-base text-gray-600 mb-3">{event.description}</p>
                                <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    {event.time}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPinIcon className="h-4 w-4 mr-1" />
                                    {event.location}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === 'projects' && (
                      <motion.div
                        key="projects"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Aktiv Layihələr</h3>
                          <div className="space-y-4">
                            {club.recentProjects.map((project, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                  <h4 className="text-base md:text-lg font-semibold text-gray-900">{project.title}</h4>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium self-start ${
                                    project.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                                    project.status === 'Davam edir' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {project.status}
                                  </span>
                                </div>
                                <p className="text-sm md:text-base text-gray-600 mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech) => (
                                    <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'members' && (
                      <motion.div
                        key="members"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div className="text-center py-8">
                          <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Üzvlər Bölməsi</h3>
                          <p className="text-gray-600 mb-6">
                            Bu bölmə üzvlər üçün xüsusi məlumatları ehtiva edir
                          </p>
                          <Button 
                            onClick={handleJoin}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Üzv olmaq üçün qeydiyyatdan keç
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-20 h-20 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-16 h-16 border border-white/10 rounded-full"
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FireIcon className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Sən də Bizə Qoşul!
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Texnologiya dünyasında öz yerini tap, yeni bacarıqlar öyrən və 
              həmfikir dostlarla birlikdə gələcəyi formalaşdır!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleJoin}
                className={`shadow-lg transition-all duration-300 ${
                  joined 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'text-blue-600 hover:bg-gray-100'
                }`}
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                {joined ? 'Artıq üzvsən!' : 'Kluba qoşul'}
              </Button>
              <Link href="/clubs">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeftIcon className="mr-2 h-5 w-5" />
                  Digər klubları gör
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
