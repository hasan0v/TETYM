'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TrophyIcon,
  StarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BeakerIcon,
  PresentationChartLineIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: 'AI Innovation Challenge Winner',
    description: 'Azərbaycan dilində AI chat assistant hazırlayaraq milli AI yarışmasında birinci yeri qazandı',
    category: 'AI/ML',
    date: '2024-12-15',
    level: 'National',
    participants: ['Leyla Hüseynova', 'Rəşad Quliyev'],
    image: '/api/placeholder/400/250',
    awards: ['1st Place', '10,000 AZN Prize', 'Mentorship Program'],
    organization: 'Ministry of Digital Development',
    technologies: ['Python', 'TensorFlow', 'NLP', 'Azure'],
    rating: 5,
    views: 1250,
    gradient: 'from-purple-600 to-pink-700'
  },
  {
    id: 2,
    title: 'Smart City Hackathon Champion',
    description: 'IoT əsaslı ağıllı şəhər həlləri ilə 48 saatlıq hackathonda qalib gəldi',
    category: 'IoT',
    date: '2024-11-28',
    level: 'Regional',
    participants: ['Əli Məmmədov', 'Səbinə Əliyeva', 'Vüqar Həsənov'],
    image: '/api/placeholder/400/250',
    awards: ['Champion', '5,000 AZN Prize', 'Startup Incubation'],
    organization: 'Baku Tech Week',
    technologies: ['Arduino', 'React', 'MongoDB', 'AWS IoT'],
    rating: 5,
    views: 980,
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 3,
    title: 'Blockchain Security Award',
    description: 'Mərkəzləşdirilməmiş təhlükəsizlik sistemində innovativ həll təqdim etdi',
    category: 'Blockchain',
    date: '2024-10-20',
    level: 'International',
    participants: ['Rəşad Quliyev', 'Nigar Əhmədova'],
    image: '/api/placeholder/400/250',
    awards: ['Excellence Award', '3,000 USD Prize', 'Conference Speaker'],
    organization: 'European Blockchain Alliance',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS'],
    rating: 5,
    views: 1450,
    gradient: 'from-green-600 to-emerald-700'
  },
  {
    id: 4,
    title: 'Mobile App Development Excellence',
    description: 'Təhsil sektorunda mobil həllər ilə regional mobil tətbiq yarışmasında üstünlük qazandı',
    category: 'Mobile',
    date: '2024-09-15',
    level: 'Regional',
    participants: ['Kamran Bayramov', 'Günel İsmayılova'],
    image: '/api/placeholder/400/250',
    awards: ['Best UX/UI', '2,500 AZN Prize', 'Google Play Feature'],
    organization: 'Mobile Dev Caucasus',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    rating: 4,
    views: 750,
    gradient: 'from-orange-600 to-red-700'
  },
  {
    id: 5,
    title: 'Web Development Innovation',
    description: 'E-ticarət platformasında yenilikçi həllər ilə veb inkişaf sahəsində tanınma qazandı',
    category: 'Web Development',
    date: '2024-08-30',
    level: 'National',
    participants: ['Elvin Hüseynov', 'Məryəm Cəfərova', 'Orxan Məmmədov'],
    image: '/api/placeholder/400/250',
    awards: ['Innovation Prize', '4,000 AZN Prize', 'Tech Accelerator'],
    organization: 'Azerbaijan IT Association',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    rating: 4,
    views: 890,
    gradient: 'from-teal-600 to-cyan-700'
  },
  {
    id: 6,
    title: 'Cybersecurity Excellence Award',
    description: 'Kibertəhlükəsizlik sahəsində yenilikçi penetration testing alətləri hazırlayaraq mükafat qazandı',
    category: 'Security',
    date: '2024-07-18',
    level: 'International',
    participants: ['Farid Əliyev', 'Şəbnəm Həsənova'],
    image: '/api/placeholder/400/250',
    awards: ['Security Innovation', '5,000 USD Prize', 'SANS Certification'],
    organization: 'CyberSec Global',
    technologies: ['Python', 'Kali Linux', 'Metasploit', 'Wireshark'],
    rating: 5,
    views: 1100,
    gradient: 'from-red-600 to-pink-700'
  },
  {
    id: 7,
    title: 'Data Science Competition Winner',
    description: 'Big data analizi və machine learning modelleri ilə data science yarışmasında qalib',
    category: 'Data Science',
    date: '2024-06-25',
    level: 'National',
    participants: ['Aynur Əsgərova', 'Tural Rəhimov'],
    image: '/api/placeholder/400/250',
    awards: ['Data Champion', '3,500 AZN Prize', 'IBM Internship'],
    organization: 'DataFest Azerbaijan',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'],
    rating: 4,
    views: 680,
    gradient: 'from-violet-600 to-purple-700'
  },
  {
    id: 8,
    title: 'Game Development Showcase',
    description: 'Virtual reality oyun inkişafında innovativ həllər və immersive təcrübələr yaratdı',
    category: 'Game Development',
    date: '2024-05-12',
    level: 'Regional',
    participants: ['Emil Qasımov', 'Səadət Rəhimova', 'Cavid Nağıyev'],
    image: '/api/placeholder/400/250',
    awards: ['Best VR Game', '2,000 AZN Prize', 'Unity Certification'],
    organization: 'Game Dev Caucasus',
    technologies: ['Unity', 'C#', 'Oculus SDK', 'Blender'],
    rating: 4,
    views: 520,
    gradient: 'from-indigo-600 to-blue-700'
  }
]

const categories = ['All', 'AI/ML', 'IoT', 'Blockchain', 'Mobile', 'Web Development', 'Security', 'Data Science', 'Game Development']
const levels = ['All', 'International', 'National', 'Regional']
const sortOptions = [
  { value: 'date', label: 'Ən yeni' },
  { value: 'title', label: 'Ad' },
  { value: 'rating', label: 'Reytinq' },
  { value: 'views', label: 'Baxış sayı' }
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
    case 'International': return 'bg-purple-100 text-purple-800'
    case 'National': return 'bg-blue-100 text-blue-800'
    case 'Regional': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
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

export default function AchievementsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedAchievements = useMemo(() => {
    let filtered = achievements

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(achievement =>
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.participants.some(participant => 
          participant.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        achievement.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(achievement => achievement.category === selectedCategory)
    }

    // Apply level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(achievement => achievement.level === selectedLevel)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'rating':
          return b.rating - a.rating
        case 'views':
          return b.views - a.views
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedLevel, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <motion.div 
          className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <TrophyIcon className="h-10 w-10 text-yellow-400" />
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-6 sm:text-6xl">
            Nailiyyətlər
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            TETYM tələbələrinin texnologiya sahəsində əldə etdiyi uğurlar və mükafatlar
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <TrophyIcon className="h-4 w-4 inline mr-2" />
              {achievements.length}+ Nailiyyət
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <UserGroupIcon className="h-4 w-4 inline mr-2" />
              {[...new Set(achievements.flatMap(a => a.participants))].length}+ Tələbə
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <StarIcon className="h-4 w-4 inline mr-2" />
              9 Kateqoriya
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Nailiyyətlərdə axtarış..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full"
              />
            </div>
            
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <FunnelIcon className="h-4 w-4" />
              Filtrlər
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <motion.div 
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'Bütün kateqoriyalar' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Səviyyə</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'All' ? 'Bütün səviyyələr' : level}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filteredAndSortedAchievements.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TrophyIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nailiyyət tapılmadı</h3>
              <p className="text-gray-500">Axtarış meyarlarınızı dəyişdirməyi sınayın</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedAchievements.map((achievement, index) => {
                const IconComponent = getCategoryIcon(achievement.category)
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                      {/* Image Header */}
                      <div className={`h-48 bg-gradient-to-br ${achievement.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <IconComponent className="h-16 w-16 text-white/80" />
                          </motion.div>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                            {achievement.category}
                          </span>
                        </div>
                        
                        {/* Level Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getLevelColor(achievement.level)}`}>
                            {achievement.level}
                          </span>
                        </div>
                      </div>
                      
                      <CardHeader className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                            {achievement.title}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                          {achievement.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-6 pb-6">
                        {/* Date and Organization */}
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <CalendarDaysIcon className="h-4 w-4 mr-2" />
                          {formatDate(achievement.date)}
                          <span className="mx-2">•</span>
                          {achievement.organization}
                        </div>
                        
                        {/* Participants */}
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <UserGroupIcon className="h-4 w-4 mr-2" />
                          <span className="line-clamp-1">{achievement.participants.join(', ')}</span>
                        </div>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {achievement.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span key={techIndex} className="inline-flex items-center rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                              {tech}
                            </span>
                          ))}
                          {achievement.technologies.length > 3 && (
                            <span className="inline-flex items-center rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">
                              +{achievement.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-4 w-4 ${i < achievement.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">{achievement.views} baxış</span>
                          </div>
                          
                          <Link href={`/achievements/${achievement.id}`}>
                            <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                              Ətraflı
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
