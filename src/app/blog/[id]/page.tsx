'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PencilSquareIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  TagIcon,
  LinkIcon,
  PrinterIcon,
  CodeBracketIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BeakerIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BookOpenIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid'

// Mock blog posts data (same as in the listing page)
const blogPosts = [
  {
    id: 1,
    title: 'Süni İntellekt və Azərbaycan Dili: Gələcəyin Texnologiyaları',
    excerpt: 'AI texnologiyalarının Azərbaycan dilinə adaptasiyası və bu sahədə edilən innovativ işlər haqqında ətraflı məlumat',
    content: `
      <h2>Giriş</h2>
      <p>Süni intellekt texnologiyaları sürətlə inkişaf etdikcə, milli dillərin bu proseslərə inteqrasiyası getdikcə daha aktual məsələyə çevrilir. Azərbaycan dili də bu baxımdan istisna deyil və bu sahədə aparılan işlər ölkəmizin rəqəmsal gələcəyi üçün strateji əhəmiyyət daşıyır.</p>
      
      <h2>Azərbaycan Dilində AI Həlləri</h2>
      <p>Son illər Azərbaycan dilində təbii dil emalı (NLP) sahəsində əhəmiyyətli irəliləyişlər əldə edilib. Bu sahədə aparılan işlər aşağıdakı istiqamətləri əhatə edir:</p>
      
      <ul>
        <li><strong>Dil modelləri:</strong> GPT-3 və BERT kimi müasir arxitekturalara əsaslanan Azərbaycan dili modelləri</li>
        <li><strong>Maşın tərcüməsi:</strong> Azərbaycan-İngilis və digər dil cütləri üçün neural tərcümə sistemləri</li>
        <li><strong>Səs tanıma:</strong> Azərbaycan dilinin müxtəlif dialektlərini tanıya bilən ASR sistemləri</li>
        <li><strong>Mətn analizi:</strong> Sentiment analizi və mətn təsnifatı alqoritmləri</li>
      </ul>
      
      <h2>Təchirirli Problemlər və Həllər</h2>
      <p>Azərbaycan dili üçün AI həlləri hazırlayarkən qarşılaşılan əsas problemlər:</p>
      
      <h3>1. Məlumat çatışmazlığı</h3>
      <p>Azərbaycan dili üçün böyük həcmli korpusların olmaması əsas problemlərdən biridir. Bu problemin həlli üçün:</p>
      <ul>
        <li>Web scraping metodları ilə mətn toplama</li>
        <li>Crowd-sourcing platformalar vasitəsilə məlumat bazası yaratma</li>
        <li>Sintetik məlumat generasiyası</li>
      </ul>
      
      <h3>2. Dil xüsusiyyətləri</h3>
      <p>Azərbaycan dilinin aqqlütinativ strukturu və zəngin morfologiyası xüsusi yanaşmalar tələb edir:</p>
      <ul>
        <li>Morfoloji analiz alqoritmləri</li>
        <li>Word embedding modelləri</li>
        <li>Subword tokenization metodları</li>
      </ul>
      
      <h2>Praktik Tətbiqlər</h2>
      <p>Azərbaycan dilində AI texnologiyalarının tətbiqi sahələri:</p>
      
      <blockquote>
        "AI texnologiyalarının milli dilimizə adaptasiyası ölkəmizin rəqəmsal suverenliyi üçün vacibdir" - Dr. Leyla Hüseynova
      </blockquote>
      
      <h3>Təhsil sahəsi</h3>
      <p>AI köməkçiləri tələbələrin Azərbaycan dili və ədəbiyyatını öyrənməsində kömək edə bilər.</p>
      
      <h3>Dövlət xidmətləri</h3>
      <p>Vətəndaş-dövlət qarşılıqlı əlaqəsinin optimallaşdırılması üçün AI chatbot-lar.</p>
      
      <h3>Media və məzmun</h3>
      <p>Avtomatik xəbər yazma və məzmun moderasiyası sistemləri.</p>
      
      <h2>Gələcək Perspektivlər</h2>
      <p>Azərbaycan dilində AI sahəsinin gələcək inkişaf istiqamətləri:</p>
      
      <ol>
        <li><strong>Multimodal AI:</strong> Mətn, səs və görüntünü birləşdirən sistemlər</li>
        <li><strong>Conversational AI:</strong> İnsan kimi təbii ünsiyyət qura bilən sistemlər</li>
        <li><strong>Domain-specific AI:</strong> Tibb, hüquq və digər sahələr üçün xüsusi həllər</li>
        <li><strong>Ethical AI:</strong> Mədəni dəyərləri nəzərə alan etik AI sistemləri</li>
      </ol>
      
      <h2>Nəticə</h2>
      <p>Azərbaycan dilində AI sahəsi böyük potensial daşıyır və bu sahədə aparılan işlər ölkəmizin texnoloji müstəqilliyinə töhfə verir. Gənc mütəxəssislərin bu sahəyə marağının artması və dövlətin dəstəyi ilə daha böyük nailiyyətlər əldə etmək mümkündür.</p>
    `,
    category: 'AI/ML',
    author: {
      name: 'Dr. Leyla Hüseynova',
      role: 'AI Research Lead',
      avatar: '/api/placeholder/100/100',
      bio: 'AI sahəsində 10+ il təcrübəyə malik tədqiqatçı. MIT-də PhD dərəcəsi, 50+ elmi məqalənin müəllifi.'
    },
    publishDate: '2024-12-20',
    lastUpdated: '2024-12-21',
    readTime: 8,
    views: 2450,
    likes: 156,
    comments: 23,
    bookmarks: 89,
    tags: ['AI', 'NLP', 'Azərbaycan dili', 'Innovation', 'Machine Learning', 'Deep Learning'],
    featured: true,
    image: '/api/placeholder/1200/600',
    gradient: 'from-purple-600 to-pink-700',
    tableOfContents: [
      { id: 'giris', title: 'Giriş', level: 2 },
      { id: 'azerbaycan-dilinde-ai', title: 'Azərbaycan Dilində AI Həlləri', level: 2 },
      { id: 'problemler-heller', title: 'Problemlər və Həllər', level: 2 },
      { id: 'praktik-tetbiqler', title: 'Praktik Tətbiqlər', level: 2 },
      { id: 'gelecek-perspektivler', title: 'Gələcək Perspektivlər', level: 2 },
      { id: 'netice', title: 'Nəticə', level: 2 }
    ],
    relatedPosts: [2, 3, 6],
    seoTitle: 'AI və Azərbaycan Dili - TETYM Blog',
    seoDescription: 'Süni intellekt texnologiyalarının Azərbaycan dilinə adaptasiyası və bu sahədə innovativ işlər'
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
      avatar: '/api/placeholder/100/100',
      bio: 'IoT və embedded systems sahəsində mütəxəssis. 8+ il təcrübə, 30+ layihə.'
    },
    publishDate: '2024-12-18',
    lastUpdated: '2024-12-19',
    readTime: 6,
    views: 1890,
    likes: 98,
    comments: 15,
    bookmarks: 45,
    tags: ['IoT', 'Smart City', 'Innovation', 'Infrastructure'],
    featured: false,
    image: '/api/placeholder/1200/600',
    gradient: 'from-blue-600 to-indigo-700',
    tableOfContents: [],
    relatedPosts: [1, 4, 7],
    seoTitle: 'IoT və Smart City - TETYM Blog',
    seoDescription: 'Internet of Things texnologiyaları ilə ağıllı şəhər həlləri'
  }
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

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Məqalə tapılmadı</h1>
          <p className="text-gray-600 mb-4">Axtardığınız məqalə mövcud deyil</p>
          <Link href="/blog">
            <Button>Bloga qayıt</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = getCategoryIcon(post.category)
  const relatedPosts = blogPosts.filter(p => post.relatedPosts?.includes(p.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative">
        <div className={`h-96 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
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
                <Link href="/blog">
                  <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Blog
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
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="bg-white/20 backdrop-blur-sm text-white border-white/20 hover:bg-white/30"
                  >
                    {isBookmarked ? (
                      <BookmarkSolid className="h-4 w-4 mr-2 text-yellow-400" />
                    ) : (
                      <BookmarkIcon className="h-4 w-4 mr-2" />
                    )}
                    {isBookmarked ? post.bookmarks + 1 : post.bookmarks}
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
                    {isLiked ? post.likes + 1 : post.likes}
                  </Button>
                </div>
              </div>
              
              <div className="max-w-4xl">
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
                        {post.category}
                      </span>
                      {post.featured && (
                        <div className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-sm font-medium text-white ml-2">
                          <SparklesIcon className="h-4 w-4 mr-1" />
                          Seçilmiş
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-white mb-4 sm:text-5xl leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-white/80">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-2" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {post.readTime} dəqiqə oxunma
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      {post.views} baxış
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                      {post.comments} şərh
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{post.author.name}</h3>
                        <p className="text-blue-600 mb-2">{post.author.role}</p>
                        <p className="text-gray-600 text-sm">{post.author.bio}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>Nəşr tarixi: {formatDate(post.publishDate)}</p>
                        {post.lastUpdated && post.lastUpdated !== post.publishDate && (
                          <p>Yeniləndi: {formatDate(post.lastUpdated)}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Article Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <div 
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-lg"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5" />
                      Açar sözlər
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => setIsLiked(!isLiked)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          {isLiked ? (
                            <HeartSolid className="h-6 w-6 text-red-500" />
                          ) : (
                            <HeartIcon className="h-6 w-6" />
                          )}
                          <span className="font-medium">{isLiked ? post.likes + 1 : post.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setIsBookmarked(!isBookmarked)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors"
                        >
                          {isBookmarked ? (
                            <BookmarkSolid className="h-6 w-6 text-yellow-500" />
                          ) : (
                            <BookmarkIcon className="h-6 w-6" />
                          )}
                          <span className="font-medium">{isBookmarked ? post.bookmarks + 1 : post.bookmarks}</span>
                        </button>
                        
                        <div className="flex items-center space-x-2 text-gray-600">
                          <ChatBubbleLeftIcon className="h-6 w-6" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <ShareIcon className="h-4 w-4 mr-2" />
                          Paylaş
                        </Button>
                        <Button variant="outline" size="sm">
                          <PrinterIcon className="h-4 w-4 mr-2" />
                          Çap et
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpenIcon className="h-5 w-5" />
                        Mündəricat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <nav className="space-y-2">
                        {post.tableOfContents.map((item, index) => (
                          <a
                            key={index}
                            href={`#${item.id}`}
                            className={`block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1 ${
                              item.level === 3 ? 'pl-4' : ''
                            }`}
                          >
                            {item.title}
                          </a>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Article Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <EyeIcon className="h-5 w-5" />
                      Statistika
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Baxış sayı</span>
                        <span className="font-semibold">{post.views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Bəyənmə</span>
                        <span className="font-semibold">{isLiked ? post.likes + 1 : post.likes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Şərh</span>
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Saxlanma</span>
                        <span className="font-semibold">{isBookmarked ? post.bookmarks + 1 : post.bookmarks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Oxunma müddəti</span>
                        <span className="font-semibold">{post.readTime} dəq</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5" />
                        Əlaqəli Məqalələr
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                            <div className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                              <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                {relatedPost.readTime} dəq
                                <span className="mx-2">•</span>
                                <EyeIcon className="h-3 w-3 mr-1" />
                                {relatedPost.views}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
