'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  CodeBracketIcon,
  UserGroupIcon,
  CalendarIcon,
  StarIcon,
  EyeIcon,
  ArrowRightIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for projects
const projectsData = [
  {
    id: 1,
    title: 'Smart Healthcare Assistant',
    description: 'AI əsaslı tibbi diaqnostika sistemi və sağlamlıq monitoru. Xəstələrin vital göstəricilərini izləyir və erkən xəbərdarlıq sistemi təmin edir.',
    category: 'AI/ML',
    status: 'Tamamlandı',
    difficulty: 'Çətin',
    duration: '6 ay',
    team: ['Əli Məmmədov', 'Nigar Əliyeva', 'Ramin Quliyev'],
    technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'PostgreSQL', 'Docker'],
    likes: 124,
    views: 2840,
    createdAt: '2024-01-15',
    image: '/api/placeholder/400/250',
    gradient: 'from-blue-600 to-indigo-700',
    icon: 'BeakerIcon',
    featured: true
  },
  {
    id: 2,
    title: 'Blockchain Voting System',
    description: 'Təhlükəsiz və şəffaf səsvermə sistemi blockchain texnologiyası əsasında. Seçki proseslərinin effektivliyini artırır.',
    category: 'Blockchain',
    status: 'Davam edir',
    difficulty: 'Çətin',
    duration: '8 ay',
    team: ['Rəşad Quliyev', 'Leyla Hüseynova'],
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'IPFS'],
    likes: 89,
    views: 1920,
    createdAt: '2024-02-20',
    image: '/api/placeholder/400/250',
    gradient: 'from-green-600 to-emerald-700',
    icon: 'ShieldCheckIcon',
    featured: true
  },
  {
    id: 3,
    title: 'IoT Smart City Platform',
    description: 'Ağıllı şəhər infrastrukturu üçün IoT əsaslı platform. Trafik, işıqlandırma və ətraf mühit monitorinqi.',
    category: 'IoT',
    status: 'Tamamlandı',
    difficulty: 'Orta',
    duration: '4 ay',
    team: ['Elçin Məmmədov', 'Aysel Qasımova', 'Tural Nəzərov'],
    technologies: ['Arduino', 'Raspberry Pi', 'Node.js', 'MongoDB', 'React'],
    likes: 156,
    views: 3240,
    createdAt: '2023-11-10',
    image: '/api/placeholder/400/250',
    gradient: 'from-purple-600 to-pink-700',
    icon: 'CpuChipIcon',
    featured: false
  },
  {
    id: 4,
    title: 'AI Chat Assistant (Azərbaycan dili)',
    description: 'Azərbaycan dilində intellektual chat bot. Təbii dil emalı və dərin öyrənmə texnologiyaları istifadə edir.',
    category: 'AI/ML',
    status: 'Tamamlandı',
    difficulty: 'Çətin',
    duration: '5 ay',
    team: ['Leyla Hüseynova', 'Kamran Əliyev'],
    technologies: ['Python', 'BERT', 'FastAPI', 'Vue.js', 'Redis'],
    likes: 201,
    views: 4560,
    createdAt: '2023-12-05',
    image: '/api/placeholder/400/250',
    gradient: 'from-indigo-600 to-purple-700',
    icon: 'LightBulbIcon',
    featured: true
  },
  {
    id: 5,
    title: 'E-learning Platform',
    description: 'Modern onlayn təhsil platforması. Virtual siniflər, interaktiv testlər və tələbə progress izləmə sistemi.',
    category: 'Web Development',
    status: 'Davam edir',
    difficulty: 'Orta',
    duration: '6 ay',
    team: ['Səbinə Həsənova', 'Orxan Məmmədov', 'Günel Əliyeva'],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    likes: 78,
    views: 1680,
    createdAt: '2024-03-01',
    image: '/api/placeholder/400/250',
    gradient: 'from-orange-600 to-red-700',
    icon: 'ComputerDesktopIcon',
    featured: false
  },
  {
    id: 6,
    title: 'Mobile Banking App',
    description: 'Təhlükəsiz mobil bank tətbiqi. Biometrik autentifikasiya, real-vaxt hesab balansı və pul köçürmələri.',
    category: 'Mobile',
    status: 'Planlanır',
    difficulty: 'Çətin',
    duration: '7 ay',
    team: ['Nihat Əsgərov', 'Məryəm Rəhimova'],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Stripe'],
    likes: 45,
    views: 890,
    createdAt: '2024-03-15',
    image: '/api/placeholder/400/250',
    gradient: 'from-teal-600 to-blue-700',
    icon: 'DevicePhoneMobileIcon',
    featured: false
  },
  {
    id: 7,
    title: 'Real Estate Platform',
    description: 'Əmlak alış-satışı üçün müasir platform. VR tur, qiymət təhlili və ipoteka kalkulyatoru daxildir.',
    category: 'Web Development',
    status: 'Tamamlandı',
    difficulty: 'Orta',
    duration: '5 ay',
    team: ['Fərid Həsənov', 'Aynur Məmmədova', 'Emil Quliyev'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Three.js', 'Stripe'],
    likes: 112,
    views: 2340,
    createdAt: '2023-10-20',
    image: '/api/placeholder/400/250',
    gradient: 'from-yellow-600 to-orange-700',
    icon: 'GlobeAltIcon',
    featured: false
  },
  {
    id: 8,
    title: 'Computer Vision Security System',
    description: 'Kompüter görmə texnologiyası ilə təhlükəsizlik sistemi. Üz tanıma və davranış təhlili funksiyaları.',
    category: 'AI/ML',
    status: 'Davam edir',
    difficulty: 'Çətin',
    duration: '9 ay',
    team: ['Cavid Məmmədov', 'Şəbnəm Əliyeva'],
    technologies: ['OpenCV', 'YOLO', 'Python', 'Django', 'PostgreSQL'],
    likes: 67,
    views: 1450,
    createdAt: '2024-01-30',
    image: '/api/placeholder/400/250',
    gradient: 'from-red-600 to-pink-700',
    icon: 'CameraIcon',
    featured: false
  }
]

const categories = ['Hamısı', 'AI/ML', 'Blockchain', 'IoT', 'Web Development', 'Mobile']
const statusOptions = ['Hamısı', 'Tamamlandı', 'Davam edir', 'Planlanır']
const difficultyOptions = ['Hamısı', 'Asan', 'Orta', 'Çətin']

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

// Floating particles component
const FloatingParticles = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${(i * 6.67) % 100}%`,
      top: `${(i * 5.33 + 10) % 80 + 10}%`,
      xOffset: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 20),
      duration: 3 + (i % 4),
      delay: (i * 0.2) % 3,
    }))
  }, [])

  if (!isClient) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
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
  )
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Hamısı')
  const [selectedStatus, setSelectedStatus] = useState('Hamısı')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Hamısı')
  const [showFilters, setShowFilters] = useState(false)

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'Hamısı' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'Hamısı' || project.status === selectedStatus
      const matchesDifficulty = selectedDifficulty === 'Hamısı' || project.difficulty === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
    })
  }, [searchTerm, selectedCategory, selectedStatus, selectedDifficulty])

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <FloatingParticles />
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg mb-4 md:mb-6"
            >
              <CodeBracketIcon className="h-4 w-4 mr-2" />
              İnnovativ Layihələr
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Tələbə 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Layihələri
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              TETYM tələbələrinin real dünya problemlərini həll edən innovativ layihələrini kəşf edin. 
              Müxtəlif texnologiya sahələrində yaradılmış uğurlu proyektlər və onların arxasındakı komandalar.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="max-w-4xl mx-auto mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="relative mb-4 md:mb-6">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Layihələr, texnologiyalar və ya komanda üzvləri axtarın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm md:text-base"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filtrlər
                {(selectedCategory !== 'Hamısı' || selectedStatus !== 'Hamısı' || selectedDifficulty !== 'Hamısı') && (
                  <span className="ml-2 bg-blue-600 text-white rounded-full w-2 h-2"></span>
                )}
              </Button>
              
              <div className="text-sm text-gray-600">
                {filteredProjects.length} layihə tapıldı
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 md:p-6 bg-white rounded-xl shadow-lg border border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Çətinlik</label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      >
                        {difficultyOptions.map(difficulty => (
                          <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ⭐ Seçilmiş Layihələr
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              {featuredProjects.map((project, index) => {
                const IconComponent = iconMap[project.icon as keyof typeof iconMap] || CodeBracketIcon
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                      <div className={`h-48 md:h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          >
                            <IconComponent className="h-16 w-16 md:h-20 md:w-20 text-white/80" />
                          </motion.div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            project.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                            project.status === 'Davam edir' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      
                      <CardHeader className="p-4 md:p-6">
                        <CardTitle className="text-lg md:text-xl font-bold group-hover:text-blue-600 transition-colors mb-2">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                        {/* Team and Stats */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-xs md:text-sm text-gray-500">
                          <div className="flex items-center">
                            <UserGroupIcon className="h-4 w-4 mr-1" />
                            {project.team.length} üzv
                          </div>
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 mr-1" />
                            {project.likes}
                          </div>
                          <div className="flex items-center">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            {project.views}
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {project.duration}
                          </div>
                        </div>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                        
                        {/* CTA */}
                        <Link href={`/projects/${project.id}`}>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm md:text-base"
                          >
                            Ətraflı bax
                            <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {regularProjects.length > 0 && (
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🚀 Bütün Layihələr
            </motion.h2>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {regularProjects.map((project, index) => {
              const IconComponent = iconMap[project.icon as keyof typeof iconMap] || CodeBracketIcon
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (featuredProjects.length * 0.2) + (index * 0.1), duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm h-full">
                    <div className={`h-32 md:h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 md:h-12 md:w-12 text-white/80" />
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          project.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                          project.status === 'Davam edir' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardHeader className="p-3 md:p-4">
                      <CardTitle className="text-base md:text-lg font-bold group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {project.title}
                      </CardTitle>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="px-3 md:px-4 pb-3 md:pb-4 mt-auto">
                      {/* Stats */}
                      <div className="flex items-center gap-2 md:gap-3 mb-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-3 w-3 mr-1" />
                          {project.team.length}
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="h-3 w-3 mr-1" />
                          {project.likes}
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="h-3 w-3 mr-1" />
                          {project.views}
                        </div>
                      </div>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* CTA */}
                      <Link href={`/projects/${project.id}`}>
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-xs md:text-sm"
                        >
                          Ətraflı bax
                          <ArrowRightIcon className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
          
          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12 md:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CodeBracketIcon className="h-16 w-16 md:h-20 md:w-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold text-gray-500 mb-2">Heç bir layihə tapılmadı</h3>
              <p className="text-sm md:text-base text-gray-400">Axtarış kriteriyalarınızı dəyişib yenidən cəhd edin</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
