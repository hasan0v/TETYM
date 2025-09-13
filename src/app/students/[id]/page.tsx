'use client'

import { useState, use, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  EnvelopeIcon, 
  ShareIcon, 
  MapPinIcon, 
  CalendarIcon,
  PhoneIcon,
  AcademicCapIcon,
  EyeIcon,
  CodeBracketIcon,
  TrophyIcon,
  ChartBarIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for students
const studentsData = [
  {
    id: 1,
    name: 'Əli Məmmədov',
    major: 'Kompüter Mühəndisliyi',
    year: '3-cü kurs',
    university: 'ADA Universiteti',
    email: 'ali.mammadov@student.ada.edu.az',
    phone: '+994 50 123 45 67',
    location: 'Bakı, Azərbaycan',
    bio: 'AI və Machine Learning sahəsində ixtisaslaşan tələbəyəm. Dərin öyrənmə və təbii dil emalı sahələrində araşdırmalar aparıram.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'JavaScript', 'React', 'Node.js', 'Docker', 'AWS'],
    interests: ['Artificial Intelligence', 'Deep Learning', 'Computer Vision', 'Web Development'],
    gradient: 'from-blue-600 to-purple-600',
    icon: 'CpuChipIcon',
    joinedDate: '2023-09-15',
    projects: [
      {
        title: 'Smart Healthcare Assistant',
        description: 'AI əsaslı tibbi diaqnostika sistemi',
        status: 'Tamamlandı',
        technologies: ['Python', 'TensorFlow', 'Flask', 'React']
      },
      {
        title: 'E-commerce Platform',
        description: 'Modern e-ticarət platforması',
        status: 'Davam edir',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe']
      },
      {
        title: 'Mobile Banking App',
        description: 'Təhlükəsiz mobil bank tətbiqi',
        status: 'Planlanır',
        technologies: ['React Native', 'Node.js', 'MongoDB']
      }
    ],
    achievements: [
      {
        title: 'AI Hackathon 2024 - 1-ci yer',
        date: '2024-03-15',
        description: 'Bakı AI Hackathon müsabiqəsində Smart Healthcare layihəsi ilə birinci yer'
      },
      {
        title: 'TETYM Developer of the Month',
        date: '2024-02-01',
        description: 'Fevral ayının ən aktiv və uğurlu developeri seçildim'
      },
      {
        title: 'Google Developer Student Club Lead',
        date: '2023-09-01',
        description: 'ADA Universitetində GDSC chapter-ının rəhbəri təyin edildim'
      },
      {
        title: 'Microsoft Azure AI Certification',
        date: '2023-11-20',
        description: 'Microsoft Azure AI Engineer Associate sertifikatını əldə etdim'
      },
      {
        title: 'Research Paper Publication',
        date: '2024-01-10',
        description: 'IEEE konferansında AI mövzusunda məqalə dərc etdirdim'
      }
    ],
    social: {
      github: 'https://github.com/alimammadov',
      linkedin: 'https://linkedin.com/in/alimammadov',
      twitter: 'https://twitter.com/alimammadov'
    },
    stats: {
      totalProjects: 8,
      completedProjects: 6,
      contributions: 124,
      followers: 89
    }
  }
]

const iconMap = {
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  CodeBracketIcon,
  LightBulbIcon
}

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isClient, setIsClient] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, 150])

  // Ensure client-side only for scroll effects
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const student = studentsData.find(s => s.id === parseInt(resolvedParams.id)) || studentsData[0]
  const IconComponent = iconMap[student.icon as keyof typeof iconMap] || CpuChipIcon

  // Generate consistent particle positions to avoid hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${(i * 11 + 23) % 89 + 5}%`, // Deterministic positions
      top: `${(i * 13 + 17) % 79 + 10}%`,
      delay: (i * 0.3) % 2,
      duration: 4 + (i % 3),
      xOffset: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15)
    }))
  }, [])

  const tabs = [
    { id: 'overview', name: 'Ümumi baxış', shortName: 'Baxış', icon: EyeIcon },
    { id: 'projects', name: 'Layihələr', shortName: 'Layihə', icon: CodeBracketIcon },
    { id: 'achievements', name: 'Nailiyyətlər', shortName: 'Nailiy.', icon: TrophyIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Cover Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${student.gradient}`} />
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
              <Link href="/students">
                <motion.div
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm md:text-base"
                >
                  <ArrowLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Tələbələrə qayıt
                </motion.div>
              </Link>
            </motion.div>
            
            <div className="flex flex-col items-center md:flex-row md:items-end gap-4 md:gap-8">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-lg md:rounded-xl flex items-center justify-center">
                    <AcademicCapIcon className="h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 text-gray-400" />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                  animate={isClient ? { rotate: 360 } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <IconComponent className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                </motion.div>
              </motion.div>
              
              {/* Info */}
              <motion.div 
                className="flex-1 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">{student.name}</h1>
                <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-2 md:mb-4">{student.major} • {student.year}</p>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-blue-100 text-sm md:text-base">
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="truncate">{student.university}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    <span className="text-xs md:text-sm">TETYM-də {student.joinedDate.split('-')[0]}-dən bəri</span>
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
                <Button className="flex-1 md:flex-initial text-blue-600 hover:bg-gray-100 text-sm md:text-base">
                  <EnvelopeIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Əlaqə saxla</span>
                  <span className="sm:hidden">Əlaqə</span>
                </Button>
                <Button variant="outline" className="flex-1 md:flex-initial border-white/20 text-white  text-sm md:text-base">
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
              {/* Contact Info */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <EnvelopeIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Əlaqə məlumatları
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <span className="text-sm md:text-base text-gray-600 truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <span className="text-sm md:text-base text-gray-600">{student.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 mr-2 md:mr-3" />
                    <span className="text-sm md:text-base text-gray-600">{student.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="mb-4 md:mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <ShareIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Sosial şəbəkələr
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row lg:flex-col gap-3 lg:space-y-3">
                    <a href={student.social.github} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base flex-1 lg:flex-initial">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                        <span className="text-xs md:text-sm font-semibold">GH</span>
                      </div>
                      <span className="hidden sm:inline lg:inline">GitHub</span>
                    </a>
                    <a href={student.social.linkedin} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base flex-1 lg:flex-initial">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                        <span className="text-xs md:text-sm font-semibold text-blue-600">IN</span>
                      </div>
                      <span className="hidden sm:inline lg:inline">LinkedIn</span>
                    </a>
                    <a href={student.social.twitter} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base flex-1 lg:flex-initial">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 md:mr-3">
                        <span className="text-xs md:text-sm font-semibold text-blue-600">TW</span>
                      </div>
                      <span className="hidden sm:inline lg:inline">Twitter</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <ChartBarIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-600" />
                    Statistika
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">{student.stats.totalProjects}</div>
                      <div className="text-xs md:text-sm text-gray-600">Layihə</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-green-600">{student.stats.completedProjects}</div>
                      <div className="text-xs md:text-sm text-gray-600">Tamamlandı</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-purple-600">{student.stats.contributions}</div>
                      <div className="text-xs md:text-sm text-gray-600">Töhfə</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{student.stats.followers}</div>
                      <div className="text-xs md:text-sm text-gray-600">İzləyici</div>
                    </div>
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
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Haqqında</h3>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{student.bio}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Bacarıqlar</h3>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {student.skills.map((skill, index) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Maraqlar</h3>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {student.interests.map((interest, index) => (
                              <motion.span
                                key={interest}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-2 md:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs md:text-sm font-medium"
                              >
                                {interest}
                              </motion.span>
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
                        className="space-y-3 md:space-y-4 lg:space-y-6"
                      >
                        {student.projects.map((project, index) => (
                          <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2 md:mb-3">
                              <h4 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900">{project.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                                project.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                                project.status === 'Davam edir' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-2 md:mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {project.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    
                    {activeTab === 'achievements' && (
                      <motion.div
                        key="achievements"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 md:space-y-4 lg:space-y-6"
                      >
                        <div className="relative">
                          <div className="absolute left-2 md:left-3 lg:left-4 top-4 bottom-0 w-0.5 bg-gray-200"></div>
                          {student.achievements.map((achievement, index) => (
                            <motion.div
                              key={achievement.title}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative pl-6 md:pl-8 lg:pl-12 pb-4 md:pb-6 lg:pb-8"
                            >
                              <div className="absolute left-1 md:left-2 lg:left-2.5 w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                              <div className="bg-gray-50 rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 md:gap-2 mb-1 md:mb-2">
                                  <h4 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900">{achievement.title}</h4>
                                  <span className="text-xs md:text-sm text-gray-500 self-start">{achievement.date}</span>
                                </div>
                                <p className="text-xs md:text-sm lg:text-base text-gray-600">{achievement.description}</p>
                              </div>
                            </motion.div>
                          ))}
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
