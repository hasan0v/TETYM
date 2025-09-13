'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TrophyIcon,
  StarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  EyeIcon,
  MapPinIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BeakerIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
  LinkIcon,
  DocumentTextIcon,
  PhotoIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

// Mock achievements data (same as in the listing page)
const achievements = [
  {
    id: 1,
    title: 'AI Innovation Challenge Winner',
    description: 'Azərbaycan dilində AI chat assistant hazırlayaraq milli AI yarışmasında birinci yeri qazandı. Bu layihə təbii dil emalı texnologiyalarından istifadə edərək Azərbaycan dilində daha effektiv ünsiyyət imkanları yaradır.',
    category: 'AI/ML',
    date: '2024-12-15',
    level: 'National',
    participants: [
      { name: 'Leyla Hüseynova', role: 'Team Lead & AI Developer', avatar: '/api/placeholder/100/100' },
      { name: 'Rəşad Quliyev', role: 'Backend Developer', avatar: '/api/placeholder/100/100' }
    ],
    image: '/api/placeholder/800/400',
    awards: ['1st Place', '10,000 AZN Prize', 'Mentorship Program'],
    organization: 'Ministry of Digital Development',
    location: 'Bakı, Azərbaycan',
    technologies: ['Python', 'TensorFlow', 'NLP', 'Azure', 'FastAPI', 'React'],
    rating: 5,
    views: 1250,
    likes: 89,
    gradient: 'from-purple-600 to-pink-700',
    fullDescription: `Bu layihə Azərbaycan dilində təbii dil emalı sahəsində böyük irəliləyiş təşkil edir. AI chat assistant 
    müxtəlif sahələrdə istifadə oluna bilən, Azərbaycan dilinin xüsusiyyətlərini nəzərə alan və yüksək dəqiqlik göstərən 
    bir sistemdir. Layihə çərçivəsində yaradılan model 50,000+ cümlə və müxtəlif dialoq nümunələri ilə təlim keçirib.`,
    challenges: [
      'Azərbaycan dili üçün kifayət qədər təlim verilənlərinin olmaması',
      'Dil xüsusiyyətlərinin modelə düzgün öyrədilməsi',
      'Real vaxt cavab vermə tezliyi',
      'Müxtəlif dialekt və aksentlərin tanınması'
    ],
    solutions: [
      'Xüsusi Azərbaycan dili korpusu yaradılması',
      'Transfer learning metodlarından istifadə',
      'Model optimallaşdırması və caching strategiyaları',
      'Çoxsaylı audio nümunələr üzərində təlim'
    ],
    impact: 'Bu sistem artıq 3 dövlət qurumunda pilot rejimində istifadə olunur və 85% istifadəçi məmnuniyyəti göstərir.',
    media: [
      { type: 'image', url: '/api/placeholder/600/400', title: 'AI Model Architecture' },
      { type: 'image', url: '/api/placeholder/600/400', title: 'User Interface Demo' },
      { type: 'video', url: '/api/placeholder/600/400', title: 'System Demo Video' },
      { type: 'document', url: '#', title: 'Technical Documentation' }
    ],
    links: [
      { title: 'GitHub Repository', url: 'https://github.com/example/ai-assistant' },
      { title: 'Demo Website', url: 'https://ai-assistant.example.com' },
      { title: 'Research Paper', url: 'https://arxiv.org/example' }
    ],
    timeline: [
      { date: '2024-09-01', event: 'Layihə başlandı' },
      { date: '2024-10-15', event: 'İlk prototip hazırlandı' },
      { date: '2024-11-20', event: 'Beta version test edildi' },
      { date: '2024-12-15', event: 'Yarışmada birinci yeri qazandı' }
    ]
  },
  {
    id: 2,
    title: 'Smart City Hackathon Champion',
    description: 'IoT əsaslı ağıllı şəhər həlləri ilə 48 saatlıq hackathonda qalib gəldi',
    category: 'IoT',
    date: '2024-11-28',
    level: 'Regional',
    participants: [
      { name: 'Əli Məmmədov', role: 'IoT Developer', avatar: '/api/placeholder/100/100' },
      { name: 'Səbinə Əliyeva', role: 'Frontend Developer', avatar: '/api/placeholder/100/100' },
      { name: 'Vüqar Həsənov', role: 'Data Analyst', avatar: '/api/placeholder/100/100' }
    ],
    image: '/api/placeholder/800/400',
    awards: ['Champion', '5,000 AZN Prize', 'Startup Incubation'],
    organization: 'Baku Tech Week',
    location: 'Bakı, Azərbaycan',
    technologies: ['Arduino', 'React', 'MongoDB', 'AWS IoT', 'Node.js', 'Python'],
    rating: 5,
    views: 980,
    likes: 67,
    gradient: 'from-blue-600 to-indigo-700',
    fullDescription: 'Ağıllı şəhər konsepsiyası çərçivəsində işlənən bu həll trafikdən tutmuş enerji istehlakına qədər şəhər həyatının müxtəlif aspektlərini optimallaşdırır.',
    challenges: ['48 saatlıq məhdud vaxt', 'Hardware-software inteqrasiyası', 'Real-time data processing'],
    solutions: ['Agile development metodologiyası', 'Microservices arxitekturası', 'Event-driven architecture'],
    impact: 'Hazırda Bakı şəhər administrasiyası bu həllin pilot layihəsini həyata keçirir.',
    media: [
      { type: 'image', url: '/api/placeholder/600/400', title: 'IoT Sensor Network' },
      { type: 'image', url: '/api/placeholder/600/400', title: 'Dashboard Interface' }
    ],
    links: [
      { title: 'Project Demo', url: 'https://smartcity.example.com' }
    ],
    timeline: [
      { date: '2024-11-26', event: 'Hackathon başladı' },
      { date: '2024-11-27', event: 'Prototip hazırlandı' },
      { date: '2024-11-28', event: 'Final təqdimat və qələbə' }
    ]
  }
  // Add more achievements as needed
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'AI/ML': return LightBulbIcon
    case 'IoT': return BeakerIcon
    case 'Blockchain': return ShieldCheckIcon
    case 'Mobile': return PresentationChartLineIcon
    case 'Web Development': return GlobeAltIcon
    case 'Security': return ShieldCheckIcon
    case 'Data Science': return PresentationChartLineIcon
    case 'Game Development': return RocketLaunchIcon
    default: return CodeBracketIcon
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'International': return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'National': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Regional': return 'bg-green-100 text-green-800 border-green-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getMediaIcon = (type: string) => {
  switch (type) {
    case 'image': return PhotoIcon
    case 'video': return PlayIcon
    case 'document': return DocumentTextIcon
    default: return LinkIcon
  }
}

// Consistent date formatting function to avoid hydration mismatch
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export default function AchievementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const achievement = achievements.find(p => p.id === parseInt(id))

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Nailiyyət tapılmadı</h1>
          <p className="text-gray-600 mb-4">Axtardığınız nailiyyət mövcud deyil</p>
          <Link href="/achievements">
            <Button>Nailiyyətlərə qayıt</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = getCategoryIcon(achievement.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative">
        <div className={`h-96 bg-gradient-to-br ${achievement.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <motion.div 
            className="relative z-10 h-full flex items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <div className="flex items-center justify-between mb-6">
                <Link href="/achievements">
                  <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Nailiyyətlər
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                  >
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Paylaş
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                  >
                    {isLiked ? (
                      <HeartSolid className="h-4 w-4 mr-2 text-red-400" />
                    ) : (
                      <HeartIcon className="h-4 w-4 mr-2" />
                    )}
                    {isLiked ? achievement.likes + 1 : achievement.likes}
                  </Button>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white mb-2">
                        {achievement.category}
                      </span>
                      <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border ${getLevelColor(achievement.level)} ml-2`}>
                        {achievement.level}
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-white mb-4 sm:text-5xl">
                    {achievement.title}
                  </h1>
                  <p className="text-xl text-blue-100 mb-6">
                    {achievement.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-white/80">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-2" />
                      {formatDate(achievement.date)}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {achievement.location}
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      {achievement.views} baxış
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="aspect-video bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
                      <TrophyIcon className="h-20 w-20 text-white/60" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Navigation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Custom Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            {[
              { value: 'overview', label: 'Ümumi' },
              { value: 'team', label: 'Komanda' },
              { value: 'process', label: 'Proses' },
              { value: 'media', label: 'Media' },
              { value: 'timeline', label: 'Zaman Xətti' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.value
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DocumentTextIcon className="h-5 w-5" />
                          Layihə Haqqında
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {achievement.fullDescription}
                        </p>
                        
                        {achievement.impact && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">Təsir və Nəticələr</h4>
                            <p className="text-green-700">{achievement.impact}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CodeBracketIcon className="h-5 w-5" />
                          İstifadə Olunan Texnologiyalar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {achievement.technologies.map((tech, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 border border-blue-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Links */}
                  {achievement.links && achievement.links.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <LinkIcon className="h-5 w-5" />
                            Faydalı Keçidlər
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {achievement.links.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                              >
                                <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                  {link.title}
                                </span>
                                <LinkIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                              </a>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Awards */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrophyIcon className="h-5 w-5" />
                          Mükafatlar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {achievement.awards.map((award, index) => (
                            <div key={index} className="flex items-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                              <TrophyIcon className="h-5 w-5 text-yellow-600 mr-3" />
                              <span className="font-medium text-yellow-800">{award}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Organization */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AcademicCapIcon className="h-5 w-5" />
                          Təşkilatçı
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <h3 className="font-semibold text-gray-900 mb-2">{achievement.organization}</h3>
                          <p className="text-sm text-gray-600">{achievement.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <StarIcon className="h-5 w-5" />
                          Reytinq
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-6 w-6 ${i < achievement.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{achievement.rating}/5</p>
                          <p className="text-sm text-gray-600">{achievement.views} baxış</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserGroupIcon className="h-5 w-5" />
                      Komanda Üzvləri
                    </CardTitle>
                    <CardDescription>
                      Bu nailiyyəti əldə edən komanda üzvləri və onların rolları
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {achievement.participants.map((participant, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{participant.name}</h3>
                            <p className="text-sm text-blue-600 mb-2">{participant.role}</p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Profil</Button>
                              <Button size="sm" variant="outline">Əlaqə</Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {achievement.challenges && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">Çətinliklər</CardTitle>
                        <CardDescription>Layihə zamanı qarşılaşılan əsas problemlər</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {achievement.challenges.map((challenge, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
                              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-semibold mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-red-800 text-sm">{challenge}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {achievement.solutions && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">Həllər</CardTitle>
                        <CardDescription>Problemlərə tapılan yaradıcı həllər</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {achievement.solutions.map((solution, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-semibold mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-green-800 text-sm">{solution}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              {achievement.media && achievement.media.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PhotoIcon className="h-5 w-5" />
                        Media Faylları
                      </CardTitle>
                      <CardDescription>
                        Layihə ilə bağlı şəkillər, videolar və sənədlər
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievement.media.map((item, index) => {
                          const IconComponent = getMediaIcon(item.type)
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.6 }}
                              className="group cursor-pointer"
                            >
                              <div className="relative rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors">
                                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <IconComponent className="h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="p-3">
                                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                  </h4>
                                  <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              {achievement.timeline && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-5 w-5" />
                        Layihə Zaman Xətti
                      </CardTitle>
                      <CardDescription>
                        Layihənin mərhələlər üzrə inkişaf prosesi
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-6">
                          {achievement.timeline.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.6 }}
                              className="relative flex items-start space-x-4"
                            >
                              <div className="relative z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <div className="flex-1 min-w-0 pb-6">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900">{item.event}</p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(item.date)}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
