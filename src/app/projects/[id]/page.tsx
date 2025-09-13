'use client'

import { useState, use, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeftIcon, 
  EyeIcon,
  ShareIcon, 
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CodeBracketIcon,
  TrophyIcon,
  ChartBarIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CameraIcon,
  PlayIcon,
  DocumentIcon,
  LinkIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for projects
const projectsData = [
  {
    id: 1,
    title: 'Smart Healthcare Assistant',
    description: 'AI əsaslı tibbi diaqnostika sistemi və sağlamlıq monitoru. Xəstələrin vital göstəricilərini izləyir və erkən xəbərdarlıq sistemi təmin edir.',
    longDescription: 'Bu layihə müasir süni intellekt texnologiyalarından istifadə edərək sağlamlıq sektorunda inqilab yaratmağı hədəfləyir. Sistem xəstələrin vital göstəricilərini real vaxt rejimində izləyir, potensial sağlamlıq problemlərini erkən mərhələdə aşkar edir və həkimlərə detallı təhlil təqdim edir. Machine Learning alqoritmlərindən istifadə edərək sistem vaxt keçdikcə daha dəqiq proqnozlar verə bilir.',
    category: 'AI/ML',
    status: 'Tamamlandı',
    difficulty: 'Çətin',
    duration: '6 ay',
    startDate: '2023-08-15',
    endDate: '2024-01-15',
    team: [
      {
        name: 'Əli Məmmədov',
        role: 'Project Lead & AI Developer',
        avatar: '/api/placeholder/64/64',
        skills: ['Python', 'TensorFlow', 'Machine Learning']
      },
      {
        name: 'Nigar Əliyeva',
        role: 'Backend Developer',
        avatar: '/api/placeholder/64/64',
        skills: ['Flask', 'PostgreSQL', 'API Development']
      },
      {
        name: 'Ramin Quliyev',
        role: 'Frontend Developer',
        avatar: '/api/placeholder/64/64',
        skills: ['React', 'TypeScript', 'UI/UX']
      }
    ],
    technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'PostgreSQL', 'Docker', 'Redis', 'OpenCV'],
    likes: 124,
    views: 2840,
    createdAt: '2024-01-15',
    image: '/api/placeholder/800/400',
    gradient: 'from-blue-600 to-indigo-700',
    icon: 'BeakerIcon',
    featured: true,
    features: [
      'Real-vaxt vital göstəricilər monitoru',
      'AI əsaslı diaqnostika sistemi',
      'Erkən xəbərdarlıq sistemi',
      'Həkim-xəstə kommunikasiya platforması',
      'Tibbi məlumatların təhlükəsiz saxlanması',
      'Mobil tətbiq dəstəyi'
    ],
    challenges: [
      'Tibbi məlumatların konfidensiallığının təmin edilməsi',
      'Yüksək dəqiqlikli ML modellərinin hazırlanması',
      'Real-vaxt məlumat emalının optimallaşdırılması',
      'Müxtəlif tibbi cihazlarla inteqrasiya'
    ],
    achievements: [
      'Xəstə diaqnostikasında 94% dəqiqlik',
      'Erkən xəbərdarlıq sistemində 87% uğur nisbəti',
      'Orta hesabla 40% vaxt qənaəti',
      'ADA Health Hackathon 2024 - Birinci mükafat'
    ],
    links: {
      github: 'https://github.com/tetym/smart-healthcare',
      demo: 'https://healthcare-demo.tetym.az',
      documentation: 'https://docs.tetym.az/healthcare'
    },
    gallery: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]
  }
]

const iconMap = {
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CameraIcon
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isClient, setIsClient] = useState(false)
  const [liked, setLiked] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, 150])

  // Ensure client-side only for scroll effects
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const project = projectsData.find(p => p.id === parseInt(resolvedParams.id)) || projectsData[0]
  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || CodeBracketIcon

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
    { id: 'overview', name: 'Ümumi baxış', shortName: 'Baxış', icon: EyeIcon },
    { id: 'team', name: 'Komanda', shortName: 'Komanda', icon: UserGroupIcon },
    { id: 'tech', name: 'Texnologiya', shortName: 'Texno.', icon: CodeBracketIcon },
    { id: 'gallery', name: 'Qalereya', shortName: 'Şəkil', icon: CameraIcon }
  ]

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Cover Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
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
              <Link href="/projects">
                <motion.div
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm md:text-base"
                >
                  <ArrowLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Layihələrə qayıt
                </motion.div>
              </Link>
            </motion.div>
            
            <div className="flex flex-col items-center md:flex-row md:items-end gap-4 md:gap-8">
              {/* Project Icon */}
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
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                  animate={isClient ? { rotate: 360 } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                    project.status === 'Tamamlandı' ? 'bg-green-500' :
                    project.status === 'Davam edir' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></span>
                </motion.div>
              </motion.div>
              
              {/* Project Info */}
              <motion.div 
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                    project.status === 'Davam edir' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                    {project.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">{project.title}</h1>
                <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-2 md:mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-blue-100 text-sm md:text-base">
                  <div className="flex items-center justify-center md:justify-start">
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">{project.duration}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <UserGroupIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">{project.team.length} üzv</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <EyeIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">{project.views}</span>
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
                  onClick={handleLike}
                  className={`flex-1 md:flex-initial text-sm md:text-base ${
                    liked ? 'bg-red-500 hover:bg-red-600 text-white' : 'text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <HeartIcon className={`h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 ${liked ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{liked ? 'Bəyəndim' : 'Bəyən'}</span>
                  <span className="sm:hidden">{project.likes + (liked ? 1 : 0)}</span>
                </Button>
                <Button variant="outline" className="flex-1 md:flex-initial border-white/20 text-white text-sm md:text-base">
                  <ShareIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Paylaş</span>
                  <span className="sm:hidden">Paylaş</span>
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
              {/* Project Stats */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <ChartBarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Layihə Statistikası
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">{project.likes + (liked ? 1 : 0)}</div>
                      <div className="text-xs md:text-sm text-gray-600">Bəyənmə</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-green-600">{project.views}</div>
                      <div className="text-xs md:text-sm text-gray-600">Baxış</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-purple-600">{project.team.length}</div>
                      <div className="text-xs md:text-sm text-gray-600">Komanda</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{project.difficulty}</div>
                      <div className="text-xs md:text-sm text-gray-600">Çətinlik</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Timeline */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <ClockIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Vaxt Çərçivəsi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <div>
                      <div className="text-sm md:text-base font-medium">Başlama tarixi</div>
                      <div className="text-xs md:text-sm text-gray-600">{project.startDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <div>
                      <div className="text-sm md:text-base font-medium">Müddət</div>
                      <div className="text-xs md:text-sm text-gray-600">{project.duration}</div>
                    </div>
                  </div>
                  {project.endDate && (
                    <div className="flex items-center">
                      <TrophyIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                      <div>
                        <div className="text-sm md:text-base font-medium">Tamamlanma tarixi</div>
                        <div className="text-xs md:text-sm text-gray-600">{project.endDate}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Project Links */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <LinkIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Keçidlər
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                          <CodeBracketIcon className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <span>GitHub Repository</span>
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                          <PlayIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                        </div>
                        <span>Canlı Demo</span>
                      </a>
                    )}
                    {project.links.documentation && (
                      <a href={project.links.documentation} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                          <DocumentIcon className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                        </div>
                        <span>Sənədlər</span>
                      </a>
                    )}
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
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Layihə Haqqında</h3>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">{project.longDescription}</p>
                          
                          {/* Project Image */}
                          <div className="rounded-xl overflow-hidden shadow-lg mb-4">
                            <Image 
                              src={project.image} 
                              alt={project.title}
                              width={800}
                              height={400}
                              className="w-full h-48 md:h-64 object-cover"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Əsas Xüsusiyyətlər</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                            {project.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 bg-blue-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Çətinliklər</h3>
                          <div className="space-y-2 md:space-y-3">
                            {project.challenges.map((challenge, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 bg-orange-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-xs md:text-sm text-gray-700">{challenge}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Nailiyyətlər</h3>
                          <div className="space-y-2 md:space-y-3">
                            {project.achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start p-3 bg-green-50 rounded-lg"
                              >
                                <TrophyIcon className="h-4 w-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-xs md:text-sm text-gray-700">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === 'team' && (
                      <motion.div
                        key="team"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Komanda Üzvləri</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {project.team.map((member, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-xl p-4 md:p-6"
                              >
                                <div className="flex items-start space-x-3 md:space-x-4">
                                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm md:text-lg">
                                      {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">{member.name}</h4>
                                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{member.role}</p>
                                    <div className="flex flex-wrap gap-1 md:gap-2">
                                      {member.skills.map((skill) => (
                                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === 'tech' && (
                      <motion.div
                        key="tech"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 md:mb-4">İstifadə Olunan Texnologiyalar</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                            {project.technologies.map((tech, index) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 md:p-4 text-center hover:shadow-md transition-all duration-300"
                              >
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-2 md:mb-3 flex items-center justify-center">
                                  <CodeBracketIcon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                                </div>
                                <h4 className="text-xs md:text-sm font-semibold text-gray-900">{tech}</h4>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'gallery' && (
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Layihə Şəkilləri</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {project.gallery.map((image, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                              >
                                <Image 
                                  src={image} 
                                  alt={`${project.title} - Şəkil ${index + 1}`}
                                  width={600}
                                  height={400}
                                  className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </motion.div>
                            ))}
                          </div>
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
    </div>
  )
}
