'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  UserGroupIcon,
  TrophyIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChartBarIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  BeakerIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'

const features = [
  {
    name: 'İnnovativ Layihələr',
    description: 'Real dünya problemlərini həll edən texniki layihələr hazırlayın, gələcəyi formalaşdırın',
    icon: RocketLaunchIcon,
    href: '/projects',
    gradient: 'from-blue-500 to-purple-600',
    delay: 0.1,
  },
  {
    name: 'Peşəkar Mentorluq',
    description: 'Sahə ekspertlərindən birbaşa mentorluq alın və karyeranızı sürətləndirin',
    icon: AcademicCapIcon,
    href: '/about',
    gradient: 'from-green-500 to-teal-600',
    delay: 0.2,
  },
  {
    name: 'Karyera İnkişafı',
    description: 'Portfolio hazırlayın və texnologiya sektorunda parlaq karyera qurun',
    icon: ChartBarIcon,
    href: '/students',
    gradient: 'from-orange-500 to-red-600',
    delay: 0.3,
  },
]

const stats = [
  { name: 'Aktiv Tələbələr', value: '200+', icon: UserGroupIcon },
  { name: 'Tamamlanmış Layihələr', value: '150+', icon: TrophyIcon },
  { name: 'Texnologiya Sahələri', value: '12+', icon: BeakerIcon },
  { name: 'Mentorlar', value: '25+', icon: LightBulbIcon },
]

const recentProjects = [
  {
    title: 'Smart Home Automation',
    description: 'IoT əsaslı ağıllı ev avtomatlaşdırma sistemi ilə gələcəyin evini bugündən yaşayın',
    category: 'IoT',
    author: 'Əli Məmmədov',
    gradient: 'from-blue-600 to-indigo-700',
    image: '/api/placeholder/400/250',
  },
  {
    title: 'AI Chat Assistant',
    description: 'Təbii dil emalı ilə Azərbaycan dilində intellektual chat bot hazırlayın',
    category: 'AI/ML',
    author: 'Leyla Hüseynova',
    gradient: 'from-purple-600 to-pink-700',
    image: '/api/placeholder/400/250',
  },
  {
    title: 'Blockchain Voting',
    description: 'Blockchain texnologiyası ilə təhlükəsiz və şəffaf səsvermə sistemi',
    category: 'Blockchain',
    author: 'Rəşad Quliyev',
    gradient: 'from-green-600 to-emerald-700',
    image: '/api/placeholder/400/250',
  },
]

// Floating particles component
const FloatingParticles = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate deterministic particle data to avoid hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 5.26) % 100}%`, // Deterministic spread across 100%
      top: `${(i * 4.76 + 10) % 80 + 10}%`, // Deterministic vertical distribution
      xOffset: (i % 2 === 0 ? 1 : -1) * (25 + (i % 3) * 25), // Predictable x movement
      duration: 2 + (i % 4), // Duration between 2-5 seconds
      delay: (i * 0.1) % 2, // Staggered delays
    }))
  }, [])

  if (!isClient) {
    return null // Avoid hydration mismatch by rendering only on client
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
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

// Enhanced AnimatedCounter component
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''))
      let startTime: number
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / 2000, 1)
        
        setCount(Math.floor(progress * numericValue))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, value])
  
  return (
    <span ref={ref} className="tabular-nums">
      {count}{value.includes('+') ? '+' : ''}{suffix}
    </span>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Background gradient animations */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <FloatingParticles />
        
        <motion.div 
          className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                Azərbaycanın ən böyük tələbə texnologiya mərkəzi
              </motion.div>
              
              <motion.h1 
                className="mt-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Gələcəyin 
                <motion.span 
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Texnologiyalarını
                </motion.span>
                <span className="block">Bugündən Öyrənin</span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                TETYM-də tələbələr innovativ layihələr hazırlayır, texniki bacarıqlarını inkişaf etdirir 
                və texnologiya sektorunda parlaq karyera yollarını formalaşdırır.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link href="/projects">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300">
                      <RocketLaunchIcon className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      Layihələri Kəşf Et
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
                      Haqqımızda Öyrən
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-12 lg:col-span-5 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <motion.div
                  className="relative rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 shadow-2xl"
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="aspect-[4/3] w-full rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-white text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <CodeBracketIcon className="h-20 w-20 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">İnnovativ Layihələr</h3>
                      <p className="text-blue-100">Real həllər hazırlayın</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating orbs around the main card */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm"
                  animate={{
                    y: [-10, 10, -10],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-sm"
                  animate={{
                    y: [10, -10, 10],
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
              Rəqəmlərlə TETYM
            </h2>
            <p className="text-xl text-gray-300">
              Bizim nailiyyətlərimiz və təsir göstəriciləri
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4"
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-gray-300 font-medium">{stat.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block text-blue-600 font-semibold text-lg mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              ✨ Xüsusiyyətlər
            </motion.span>
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Niyə TETYM-i Seçməlisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müasir texnologiyalar, peşəkar mentorluq və praktik təcrübə ilə gələcəyinizi formalaşdırın
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Link href={feature.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Ətraflı öyrən
                      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              🚀 Son Layihələr
            </h2>
            <p className="text-xl text-gray-600">
              Tələbələrimizin innovativ layihələrinə nəzər salın
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {recentProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <CodeBracketIcon className="h-16 w-16 text-white/80" />
                      </motion.div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <UserGroupIcon className="h-4 w-4 mr-2" />
                        {project.author}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center space-x-1"
                      >
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg"  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Bütün Layihələri Gör
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <motion.div 
          className="relative z-10 mx-auto max-w-4xl text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FireIcon className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6">
            Bizə Qoşulmağa Hazırsınız?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Texnologiya sahəsində karyeranıza başlayın və innovativ layihələrin bir hissəsi olun. 
            Gələcəyin texnologiyalarını bugündən öyrənməyə başlayın!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="text-blue-600 hover:bg-gray-100 shadow-lg">
                  <RocketLaunchIcon className="mr-2 h-5 w-5" />
                  Müraciət Et
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                className="inline-flex items-center text-white hover:text-blue-200 font-semibold transition-colors"
              >
                Daha çox öyrən
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
