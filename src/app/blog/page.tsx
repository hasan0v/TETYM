'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PencilSquareIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  TagIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  FireIcon,
  SparklesIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BeakerIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Süni İntellekt və Azərbaycan Dili: Gələcəyin Texnologiyaları',
    excerpt: 'AI texnologiyalarının Azərbaycan dilinə adaptasiyası və bu sahədə edilən innovativ işlər haqqında ətraflı məlumat',
    content: 'Süni intellekt texnologiyaları sürətlə inkişaf etdikcə, milli dillərin bu proseslərə inteqrasiyası...',
    category: 'AI/ML',
    author: {
      name: 'Dr. Leyla Hüseynova',
      role: 'AI Research Lead',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-20',
    readTime: 8,
    views: 2450,
    likes: 156,
    comments: 23,
    tags: ['AI', 'NLP', 'Azərbaycan dili', 'Innovation'],
    featured: true,
    image: '/api/placeholder/800/400',
    gradient: 'from-purple-600 to-pink-700'
  },
  {
    id: 2,
    title: 'IoT və Ağıllı Şəhər Həlləri: Bakının Gələcəyi',
    excerpt: 'İnternet of Things texnologiyaları ilə şəhər infrastrukturunun optimallaşdırılması və ağıllı şəhər konsepsiyası',
    content: 'Ağıllı şəhər konsepsiyası müasir dövrün ən aktual mövzularından biridir...',
    category: 'IoT',
    author: {
      name: 'Əli Məmmədov',
      role: 'IoT Developer',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-18',
    readTime: 6,
    views: 1890,
    likes: 98,
    comments: 15,
    tags: ['IoT', 'Smart City', 'Innovation', 'Infrastructure'],
    featured: false,
    image: '/api/placeholder/800/400',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 3,
    title: 'Blockchain Texnologiyası və Kriptoqrafiya Əsasları',
    excerpt: 'Blockchain texnologiyasının əsas prinsipləri, kriptoqrafiya metodları və praktik tətbiq sahələri',
    content: 'Blockchain texnologiyası mərkəzləşdirilməmiş sistemlərin əsasını təşkil edir...',
    category: 'Blockchain',
    author: {
      name: 'Rəşad Quliyev',
      role: 'Blockchain Developer',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-15',
    readTime: 10,
    views: 3200,
    likes: 201,
    comments: 45,
    tags: ['Blockchain', 'Cryptocurrency', 'Security', 'Decentralization'],
    featured: true,
    image: '/api/placeholder/800/400',
    gradient: 'from-green-600 to-emerald-700'
  },
  {
    id: 4,
    title: 'Frontend İnkişafında Ən Son Tendensiyalar',
    excerpt: 'React, Vue, Angular framework-ləri və müasir frontend texnologiyalarının müqayisəli analizi',
    content: 'Frontend development sahəsi sürətlə dəyişir və yeni texnologiyalar...',
    category: 'Frontend',
    author: {
      name: 'Səbinə Əliyeva',
      role: 'Frontend Developer',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-12',
    readTime: 7,
    views: 1650,
    likes: 87,
    comments: 19,
    tags: ['React', 'Vue', 'Angular', 'JavaScript', 'Web Development'],
    featured: false,
    image: '/api/placeholder/800/400',
    gradient: 'from-orange-600 to-red-700'
  },
  {
    id: 5,
    title: 'Kibertəhlükəsizlik: Müasir Təhdidlər və Müdafiə Metodları',
    excerpt: 'Kibercinayətlərin artan təhdidi və bunlara qarşı effektiv müdafiə strategiyaları',
    content: 'Rəqəmsal dünyada təhlükəsizlik məsələləri getdikcə daha aktual olur...',
    category: 'Security',
    author: {
      name: 'Farid Əliyev',
      role: 'Cybersecurity Expert',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-10',
    readTime: 9,
    views: 2890,
    likes: 167,
    comments: 31,
    tags: ['Cybersecurity', 'Penetration Testing', 'Network Security', 'Ethical Hacking'],
    featured: false,
    image: '/api/placeholder/800/400',
    gradient: 'from-red-600 to-pink-700'
  },
  {
    id: 6,
    title: 'Data Science və Big Data Analizi: Praktik Yanaşma',
    excerpt: 'Böyük verilənlərin analizi, machine learning alqoritmləri və real həyatda tətbiqi',
    content: 'Məlumatların analizi müasir biznesin ayrılmaz hissəsidir...',
    category: 'Data Science',
    author: {
      name: 'Aynur Əsgərova',
      role: 'Data Scientist',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-08',
    readTime: 12,
    views: 2150,
    likes: 134,
    comments: 28,
    tags: ['Data Science', 'Machine Learning', 'Python', 'Analytics'],
    featured: false,
    image: '/api/placeholder/800/400',
    gradient: 'from-violet-600 to-purple-700'
  },
  {
    id: 7,
    title: 'Mobil Tətbiq İnkişafı: Native vs Cross-Platform',
    excerpt: 'iOS və Android platformaları üçün native və cross-platform həllərin müqayisəsi',
    content: 'Mobil tətbiq inkişafında doğru platformanı seçmək...',
    category: 'Mobile',
    author: {
      name: 'Kamran Bayramov',
      role: 'Mobile Developer',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-05',
    readTime: 8,
    views: 1750,
    likes: 92,
    comments: 16,
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'Cross-Platform'],
    featured: false,
    image: '/api/placeholder/800/400',
    gradient: 'from-teal-600 to-cyan-700'
  },
  {
    id: 8,
    title: 'DevOps və Continuous Integration: Səmərəli İş Prosesləri',
    excerpt: 'CI/CD pipeline qurmaq, containerization və cloud services-dən istifadə',
    content: 'DevOps mədəniyyəti modern software development-in...',
    category: 'DevOps',
    author: {
      name: 'Orxan Məmmədov',
      role: 'DevOps Engineer',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-12-03',
    readTime: 11,
    views: 1980,
    likes: 118,
    comments: 22,
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'AWS'],
    featured: false,
    image: '/api/placeholder/800/400',
    gradient: 'from-indigo-600 to-blue-700'
  }
]

const categories = ['All', 'AI/ML', 'IoT', 'Blockchain', 'Frontend', 'Security', 'Data Science', 'Mobile', 'DevOps']
const sortOptions = [
  { value: 'date', label: 'Ən yeni' },
  { value: 'popular', label: 'Ən məşhur' },
  { value: 'title', label: 'Ad' },
  { value: 'readTime', label: 'Oxunma müddəti' }
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'AI/ML': return LightBulbIcon
    case 'IoT': return BeakerIcon
    case 'Blockchain': return RocketLaunchIcon
    case 'Frontend': return CodeBracketIcon
    case 'Security': return AcademicCapIcon
    case 'Data Science': return SparklesIcon
    case 'Mobile': return BriefcaseIcon
    case 'DevOps': return BookOpenIcon
    default: return PencilSquareIcon
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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views + b.likes) - (a.views + a.likes)
        case 'title':
          return a.title.localeCompare(b.title)
        case 'readTime':
          return a.readTime - b.readTime
        case 'date':
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const featuredPosts = blogPosts.filter(post => post.featured)

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
            <PencilSquareIcon className="h-10 w-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-6 sm:text-6xl">
            TETYM Blog
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Texnologiya dünyasından ən son xəbərlər, məqalələr və ekspert fikirləri
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <PencilSquareIcon className="h-4 w-4 inline mr-2" />
              {blogPosts.length}+ Məqalə
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <UserIcon className="h-4 w-4 inline mr-2" />
              {[...new Set(blogPosts.map(p => p.author.name))].length}+ Müəllif
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <TagIcon className="h-4 w-4 inline mr-2" />
              9 Kateqoriya
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                <FireIcon className="h-8 w-8 inline text-orange-500 mr-2" />
                Seçilmiş Məqalələr
              </h2>
              <p className="text-xl text-gray-600">
                Ən çox oxunan və maraqlı məqalələrimiz
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => {
                const IconComponent = getCategoryIcon(post.category)
                
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white h-full">
                      <div className={`h-64 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <IconComponent className="h-16 w-16 text-white/80" />
                          </motion.div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white">
                            <FireIcon className="h-4 w-4 mr-1" />
                            Seçilmiş
                          </span>
                        </div>
                      </div>
                      
                      <CardHeader className="p-6">
                        <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-6 pb-6">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <div className="flex items-center mr-4">
                            <UserIcon className="h-4 w-4 mr-1" />
                            {post.author.name}
                          </div>
                          <div className="flex items-center mr-4">
                            <CalendarDaysIcon className="h-4 w-4 mr-1" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {post.readTime} dəq
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <EyeIcon className="h-4 w-4 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <HeartIcon className="h-4 w-4 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                              {post.comments}
                            </span>
                          </div>
                          
                          <Link href={`/blog/${post.id}`}>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                              Oxu
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Məqalələrdə axtarış..."
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
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
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

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filteredAndSortedPosts.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PencilSquareIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Məqalə tapılmadı</h3>
              <p className="text-gray-500">Axtarış meyarlarınızı dəyişdirməyi sınayın</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedPosts.map((post, index) => {
                const IconComponent = getCategoryIcon(post.category)
                
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
                      {/* Image Header */}
                      <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <IconComponent className="h-12 w-12 text-white/80" />
                          </motion.div>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                            {post.category}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {post.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center rounded-full bg-orange-500 px-2 py-1 text-xs font-medium text-white">
                              <FireIcon className="h-3 w-3 mr-1" />
                              Seçilmiş
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="p-6">
                        <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-6 pb-6">
                        {/* Author and Date */}
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <div className="flex items-center mr-4">
                            <UserIcon className="h-4 w-4 mr-1" />
                            {post.author.name}
                          </div>
                          <div className="flex items-center mr-4">
                            <CalendarDaysIcon className="h-4 w-4 mr-1" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {post.readTime} dəq
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span key={tagIndex} className="inline-flex items-center rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="inline-flex items-center rounded bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span className="flex items-center">
                              <EyeIcon className="h-4 w-4 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <HeartIcon className="h-4 w-4 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                              {post.comments}
                            </span>
                          </div>
                          
                          <Link href={`/blog/${post.id}`}>
                            <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                              Oxu
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
