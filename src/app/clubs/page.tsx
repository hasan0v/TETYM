'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  CodeBracketIcon,
  BeakerIcon,
  PaintBrushIcon,
  CpuChipIcon,
  GlobeAltIcon,
  CameraIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  HeartIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Mock data for clubs
const clubsData = [
  {
    id: 1,
    name: 'AI & Machine Learning Club',
    description: 'Süni intellekt və maşın öyrənməsi sahəsində tədqiqat və praktik layihələr həyata keçiririk.',
    category: 'Texnologiya',
    members: 45,
    founded: '2023-01-15',
    location: 'ADA Universiteti',
    meetingTime: 'Çərşənbə axşamı 18:00',
    president: 'Əli Məmmədov',
    gradient: 'from-blue-600 to-purple-600',
    icon: 'CpuChipIcon',
    tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
    rating: 4.8,
    image: '/api/placeholder/400/250',
    upcomingEvents: 3,
    recentProjects: 8
  },
  {
    id: 2,
    name: 'Web Development Guild',
    description: 'Müasir web texnologiyalarını öyrənir və real layihələr hazırlayırıq. React, Node.js və daha çox.',
    category: 'Texnologiya',
    members: 67,
    founded: '2022-09-10',
    location: 'ASOIU',
    meetingTime: 'Cümə axşamı 19:00',
    president: 'Leyla Hüseynova',
    gradient: 'from-green-500 to-teal-600',
    icon: 'CodeBracketIcon',
    tags: ['React', 'Node.js', 'JavaScript', 'Full-Stack'],
    rating: 4.9,
    image: '/api/placeholder/400/250',
    upcomingEvents: 2,
    recentProjects: 12
  },
  {
    id: 3,
    name: 'Robotics & IoT Society',
    description: 'Robot hazırlama və IoT həlləri yaratmaqla texnologiyanın fiziki dünyada tətbiqini öyrənirik.',
    category: 'Mühəndislik',
    members: 32,
    founded: '2023-03-20',
    location: 'BTU',
    meetingTime: 'Şənbə günü 14:00',
    president: 'Rəşad Quliyev',
    gradient: 'from-orange-500 to-red-600',
    icon: 'BeakerIcon',
    tags: ['Arduino', 'Raspberry Pi', 'IoT', 'Sensors'],
    rating: 4.7,
    image: '/api/placeholder/400/250',
    upcomingEvents: 4,
    recentProjects: 6
  },
  {
    id: 4,
    name: 'UX/UI Design Studio',
    description: 'İstifadəçi təcrübəsi və interfeys dizaynı sahəsində yaradıcı həllər tapır və prototiplər hazırlayırıq.',
    category: 'Dizayn',
    members: 28,
    founded: '2023-02-05',
    location: 'BANM',
    meetingTime: 'Bazar ertəsi 17:30',
    president: 'Günel Məmmədova',
    gradient: 'from-pink-500 to-purple-600',
    icon: 'PaintBrushIcon',
    tags: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    rating: 4.6,
    image: '/api/placeholder/400/250',
    upcomingEvents: 1,
    recentProjects: 9
  },
  {
    id: 5,
    name: 'Cyber Security Alliance',
    description: 'Kiberməkan təhlükəsizliyi sahəsində bilik və bacarıqlar inkişaf etdiririk. Etik hacking və müdafiə.',
    category: 'Təhlükəsizlik',
    members: 38,
    founded: '2022-11-12',
    location: 'Azercell Academy',
    meetingTime: 'Çərşənbə axşamı 19:30',
    president: 'Elnur Həsənov',
    gradient: 'from-red-600 to-orange-600',
    icon: 'GlobeAltIcon',
    tags: ['Ethical Hacking', 'Network Security', 'Penetration Testing'],
    rating: 4.8,
    image: '/api/placeholder/400/250',
    upcomingEvents: 2,
    recentProjects: 5
  },
  {
    id: 6,
    name: 'Digital Media Creators',
    description: 'Foto, video və qrafik dizayn sahəsində yaradıcı məzmun hazırlayır və sosial mediada paylaşırıq.',
    category: 'Media',
    members: 41,
    founded: '2023-04-18',
    location: 'Media Plaza',
    meetingTime: 'Cümə axşamı 18:30',
    president: 'Aysel Rəhmanova',
    gradient: 'from-indigo-500 to-purple-600',
    icon: 'CameraIcon',
    tags: ['Photography', 'Video Editing', 'Graphic Design', 'Social Media'],
    rating: 4.5,
    image: '/api/placeholder/400/250',
    upcomingEvents: 3,
    recentProjects: 15
  },
  {
    id: 7,
    name: 'Music Technology Lab',
    description: 'Musiqi texnologiyaları və audio produksiya sahəsində innovativ layihələr yaradırıq.',
    category: 'Musiqi',
    members: 19,
    founded: '2023-05-22',
    location: 'Baku Music Academy',
    meetingTime: 'Şənbə günü 16:00',
    president: 'Farid Əliyev',
    gradient: 'from-purple-600 to-pink-600',
    icon: 'MusicalNoteIcon',
    tags: ['Audio Production', 'Digital Music', 'Sound Design', 'Ableton'],
    rating: 4.4,
    image: '/api/placeholder/400/250',
    upcomingEvents: 1,
    recentProjects: 7
  },
  {
    id: 8,
    name: 'Tech Entrepreneurship Hub',
    description: 'Texnologiya startapları yaratmaq və biznes inkişafı sahəsində təcrübə qazanmaq istəyənlər üçün.',
    category: 'Biznes',
    members: 35,
    founded: '2022-08-30',
    location: 'ABAD',
    meetingTime: 'Çərşənbə axşamı 18:30',
    president: 'Nigar Səfərova',
    gradient: 'from-yellow-500 to-orange-600',
    icon: 'RocketLaunchIcon',
    tags: ['Startup', 'Business Development', 'Funding', 'Pitching'],
    rating: 4.7,
    image: '/api/placeholder/400/250',
    upcomingEvents: 2,
    recentProjects: 11
  }
]

const categories = ['Hamısı', 'Texnologiya', 'Mühəndislik', 'Dizayn', 'Təhlükəsizlik', 'Media', 'Musiqi', 'Biznes']

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

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Hamısı')
  const [sortBy, setSortBy] = useState('name') // name, members, rating, recent
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate consistent floating particles to avoid hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${(i * 6.67) % 100}%`,
      top: `${(i * 5.33 + 10) % 80 + 10}%`,
      delay: (i * 0.2) % 3,
      duration: 3 + (i % 4),
      xOffset: (i % 2 === 0 ? 1 : -1) * (30 + (i % 3) * 20)
    }))
  }, [])

  const filteredClubs = useMemo(() => {
    const filtered = clubsData.filter((club) => {
      const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           club.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'Hamısı' || club.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort clubs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'members':
          return b.members - a.members
        case 'rating':
          return b.rating - a.rating
        case 'recent':
          return new Date(b.founded).getTime() - new Date(a.founded).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating particles */}
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
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white mb-6"
            >
              <UserGroupIcon className="h-4 w-4 mr-2" />
              {clubsData.length}+ Aktiv Klub
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              TETYM 
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Klubları
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Maraqlarınıza uyğun klubları tapın, yeni dostlar qazanın və birlikdə innovativ layihələr hazırlayın
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                  {clubsData.reduce((acc, club) => acc + club.members, 0)}+
                </div>
                <div className="text-sm md:text-base text-blue-100">Üzv</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  {categories.length - 1}
                </div>
                <div className="text-sm md:text-base text-blue-100">Kateqoriya</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">
                  {clubsData.reduce((acc, club) => acc + club.recentProjects, 0)}+
                </div>
                <div className="text-sm md:text-base text-blue-100">Layihə</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 md:py-12 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Klub adı, açıqlama və ya texnologiya axtarın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs md:text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="name">Ad (A-Z)</option>
                <option value="members">Üzv sayı</option>
                <option value="rating">Reytinq</option>
                <option value="recent">Ən yeni</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-600">
              <span className="font-semibold text-blue-600">{filteredClubs.length}</span> klub tapıldı
              {searchTerm && (
                <span className="ml-2">
                  &quot;<span className="font-medium">{searchTerm}</span>&quot; üçün
                </span>
              )}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredClubs.map((club, index) => {
                const IconComponent = iconMap[club.icon as keyof typeof iconMap] || LightBulbIcon
                
                return (
                  <motion.div
                    key={club.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Link href={`/clubs/${club.id}`}>
                      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm cursor-pointer">
                        {/* Header with gradient */}
                        <div className={`h-32 md:h-40 bg-gradient-to-br ${club.gradient} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              <IconComponent className="h-12 w-12 md:h-16 md:w-16 text-white/80" />
                            </motion.div>
                          </div>
                          
                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
                              {club.category}
                            </span>
                          </div>
                          
                          {/* Rating */}
                          <div className="absolute top-3 right-3 flex items-center space-x-1">
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-medium">{club.rating}</span>
                          </div>
                        </div>
                        
                        <CardHeader className="p-4 md:p-6">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <CardTitle className="text-lg md:text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                              {club.name}
                            </CardTitle>
                          </div>
                          
                          <p className="text-sm md:text-base text-gray-600 line-clamp-3 leading-relaxed">
                            {club.description}
                          </p>
                        </CardHeader>
                        
                        <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {club.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {club.tags.length > 3 && (
                              <span className="text-xs text-gray-500">+{club.tags.length - 3}</span>
                            )}
                          </div>
                          
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-lg md:text-xl font-bold text-blue-600">{club.members}</div>
                              <div className="text-xs text-gray-600">Üzv</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-lg md:text-xl font-bold text-green-600">{club.upcomingEvents}</div>
                              <div className="text-xs text-gray-600">Tədbir</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2">
                              <div className="text-lg md:text-xl font-bold text-purple-600">{club.recentProjects}</div>
                              <div className="text-xs text-gray-600">Layihə</div>
                            </div>
                          </div>
                          
                          {/* Meeting info */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              {club.meetingTime}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPinIcon className="h-4 w-4 mr-2" />
                              {club.location}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
          
          {filteredClubs.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <UserGroupIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Klub tapılmadı</h3>
              <p className="text-gray-600 mb-6">Axtarış parametrlərini dəyişdirərək yenidən cəhd edin</p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Hamısı')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Filtri təmizlə
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Öz Klubunuzu Yaradın
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Yeni bir sahədə maraqlısınız və həmfikir dostlar axtarırsınız? 
              Öz klubunuzu yaradın və liderlik təcrübəsi qazanın!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="text-blue-600 hover:bg-gray-100 shadow-lg">
                  <HeartIcon className="mr-2 h-5 w-5" />
                  Klub Yarat
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <BookOpenIcon className="mr-2 h-5 w-5" />
                  Daha çox məlumat
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
