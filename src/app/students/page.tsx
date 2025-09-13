'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  AcademicCapIcon,
  TrophyIcon,
  CodeBracketIcon,
  StarIcon,
  MapPinIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

const students = [
  {
    id: 1,
    name: 'Əli Məmmədov',
    age: 20,
    university: 'ADA Universiteti',
    major: 'Kompüter Mühəndisliyi',
    year: '3-cü kurs',
    location: 'Bakı, Azərbaycan',
    skills: ['React', 'Node.js', 'Python', 'AI/ML'],
    projects: 8,
    achievements: 5,
    rating: 4.9,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/400/200',
    bio: 'AI və Machine Learning sahəsində ixtisaslaşan developer. Innovativ layihələr yaratmaq və texnologiya ilə real problemləri həll etmək mənim əsas məqsədimdir.',
    email: 'ali.mammadov@tetym.az',
    phone: '+994-55-123-4567',
    website: 'https://alimammadov.dev',
    speciality: 'AI/ML',
    gradient: 'from-blue-500 to-purple-600',
    icon: CpuChipIcon,
    projects_list: [
      { name: 'Smart Home AI', status: 'completed' },
      { name: 'NLP Chat Bot', status: 'in-progress' },
      { name: 'Computer Vision App', status: 'completed' }
    ],
    social: {
      github: 'https://github.com/alimammadov',
      linkedin: 'https://linkedin.com/in/alimammadov',
      twitter: 'https://twitter.com/alimammadov'
    }
  },
  {
    id: 2,
    name: 'Leyla Hüseynova',
    age: 19,
    university: 'ADNSU',
    major: 'İnformatika',
    year: '2-ci kurs',
    location: 'Bakı, Azərbaycan',
    skills: ['Flutter', 'Dart', 'Firebase', 'UI/UX'],
    projects: 6,
    achievements: 3,
    rating: 4.8,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/400/200',
    bio: 'Mobil tətbiq inkişafı və UI/UX dizayn sahəsində təcrübəli developer. İstifadəçi təcrübəsini yaxşılaşdırmaq üçün çalışıram.',
    email: 'leyla.huseynova@tetym.az',
    phone: '+994-55-234-5678',
    website: 'https://leylahuseynova.com',
    speciality: 'Mobile Dev',
    gradient: 'from-pink-500 to-rose-600',
    icon: DevicePhoneMobileIcon,
    projects_list: [
      { name: 'E-commerce Mobile App', status: 'completed' },
      { name: 'Health Tracker', status: 'in-progress' },
      { name: 'Educational Platform', status: 'completed' }
    ],
    social: {
      github: 'https://github.com/leylahuseynova',
      linkedin: 'https://linkedin.com/in/leylahuseynova',
      dribbble: 'https://dribbble.com/leylahuseynova'
    }
  },
  {
    id: 3,
    name: 'Rəşad Quliyev',
    age: 21,
    university: 'Bakı Dövlət Universiteti',
    major: 'Riyaziyyat',
    year: '4-cü kurs',
    location: 'Bakı, Azərbaycan',
    skills: ['Solidity', 'Web3', 'JavaScript', 'Blockchain'],
    projects: 5,
    achievements: 4,
    rating: 4.7,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/400/200',
    bio: 'Blockchain texnologiyaları və kriptovalyuta sahəsində developer. Decentralized tətbiqlərin gələcəyinə inanıram.',
    email: 'reshad.guliyev@tetym.az',
    phone: '+994-55-345-6789',
    website: 'https://reshadguliyev.eth',
    speciality: 'Blockchain',
    gradient: 'from-green-500 to-emerald-600',
    icon: ComputerDesktopIcon,
    projects_list: [
      { name: 'Voting DApp', status: 'completed' },
      { name: 'NFT Marketplace', status: 'in-progress' },
      { name: 'DeFi Protocol', status: 'planning' }
    ],
    social: {
      github: 'https://github.com/reshadguliyev',
      linkedin: 'https://linkedin.com/in/reshadguliyev',
      twitter: 'https://twitter.com/reshadguliyev'
    }
  },
  {
    id: 4,
    name: 'Nigar Əliyeva',
    age: 20,
    university: 'Xəzər Universiteti',
    major: 'Kibertəhlükəsizlik',
    year: '3-cü kurs',
    location: 'Bakı, Azərbaycan',
    skills: ['Python', 'Cybersecurity', 'Penetration Testing', 'Network Security'],
    projects: 7,
    achievements: 6,
    rating: 4.9,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/400/200',
    bio: 'Kibertəhlükəsizlik sahəsində mütəxəssis. Sistem təhlükəsizliyini təmin etmək və haker hücumlarından qorunmaq mənim ixtisasımdır.',
    email: 'nigar.aliyeva@tetym.az',
    phone: '+994-55-456-7890',
    website: 'https://nigaraliyeva.security',
    speciality: 'Cybersecurity',
    gradient: 'from-red-500 to-orange-600',
    icon: BeakerIcon,
    projects_list: [
      { name: 'Security Audit Tool', status: 'completed' },
      { name: 'Malware Detection System', status: 'in-progress' },
      { name: 'Network Monitor', status: 'completed' }
    ],
    social: {
      github: 'https://github.com/nigaraliyeva',
      linkedin: 'https://linkedin.com/in/nigaraliyeva',
      twitter: 'https://twitter.com/nigaraliyeva'
    }
  },
  {
    id: 5,
    name: 'Tural Məmmədli',
    age: 22,
    university: 'UNEC',
    major: 'İqtisadiyyat və İT',
    year: '4-cü kurs',
    location: 'Bakı, Azərbaycan',
    skills: ['React', 'Next.js', 'TypeScript', 'GraphQL'],
    projects: 9,
    achievements: 7,
    rating: 4.8,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/400/200',
    bio: 'Full-stack developer və startup entrepreneur. İqtisadiyyat və texnologiyanı birləşdirərək innovativ həllər yaradıram.',
    email: 'tural.mammadli@tetym.az',
    phone: '+994-55-567-8901',
    website: 'https://turalmammadli.com',
    speciality: 'Full-Stack',
    gradient: 'from-indigo-500 to-blue-600',
    icon: CodeBracketIcon,
    projects_list: [
      { name: 'E-commerce Platform', status: 'completed' },
      { name: 'Analytics Dashboard', status: 'completed' },
      { name: 'Fintech App', status: 'in-progress' }
    ],
    social: {
      github: 'https://github.com/turalmammadli',
      linkedin: 'https://linkedin.com/in/turalmammadli',
      twitter: 'https://twitter.com/turalmammadli'
    }
  },
  {
    id: 6,
    name: 'Aysel Rəhimova',
    age: 19,
    university: 'ADA Universiteti',
    major: 'Data Science',
    year: '2-ci kurs',
    location: 'Bakı, Azərbaycan',
    skills: ['Python', 'R', 'TensorFlow', 'Data Analysis'],
    projects: 4,
    achievements: 3,
    rating: 4.6,
    avatar: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/400/200',
    bio: 'Data Science və Big Data analitikası sahəsində ixtisaslaşıram. Verilənlərdən mənalı nəticələr çıxarmaq mənim passiyamdır.',
    email: 'aysel.rahimova@tetym.az',
    phone: '+994-55-678-9012',
    website: 'https://ayselrahimova.data',
    speciality: 'Data Science',
    gradient: 'from-purple-500 to-pink-600',
    icon: LightBulbIcon,
    projects_list: [
      { name: 'Sales Prediction Model', status: 'completed' },
      { name: 'Customer Segmentation', status: 'in-progress' },
      { name: 'Market Analysis Tool', status: 'planning' }
    ],
    social: {
      github: 'https://github.com/ayselrahimova',
      linkedin: 'https://linkedin.com/in/ayselrahimova',
      kaggle: 'https://kaggle.com/ayselrahimova'
    }
  }
]

const specialties = [
  { name: 'Hamısı', value: 'all', count: students.length },
  { name: 'AI/ML', value: 'AI/ML', count: students.filter(s => s.speciality === 'AI/ML').length },
  { name: 'Mobile Dev', value: 'Mobile Dev', count: students.filter(s => s.speciality === 'Mobile Dev').length },
  { name: 'Blockchain', value: 'Blockchain', count: students.filter(s => s.speciality === 'Blockchain').length },
  { name: 'Cybersecurity', value: 'Cybersecurity', count: students.filter(s => s.speciality === 'Cybersecurity').length },
  { name: 'Full-Stack', value: 'Full-Stack', count: students.filter(s => s.speciality === 'Full-Stack').length },
  { name: 'Data Science', value: 'Data Science', count: students.filter(s => s.speciality === 'Data Science').length },
]

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
          animate={{
            y: [-20, -100],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSpecialty = selectedSpecialty === 'all' || student.speciality === selectedSpecialty
    
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="bg-white relative overflow-hidden min-h-screen">
      {/* Background gradient animations */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <FloatingParticles />
        
        <motion.div 
          className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
          style={{ y: heroY }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg mb-8"
            >
              <UserGroupIcon className="h-4 w-4 mr-2" />
              {students.length}+ Aktiv Tələbə
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 md:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Bizim 
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
                Tələbələrimiz
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg lg:text-xl leading-6 md:leading-8 text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              TETYM ailəsinin üzvləri olan istedadlı tələbələrimizlə tanış olun. 
              Hər biri öz sahəsində unikal layihələr hazırlayır və gələcəyin texnologiyalarını formalaşdırır.
            </motion.p>

            {/* Search and Filter Section */}
            <motion.div 
              className="max-w-4xl mx-auto mb-12 md:mb-16 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col gap-3 md:gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tələbə adı, universitet axtar..."
                      className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    <select
                      className="w-full pl-9 md:pl-10 pr-8 py-2.5 md:py-3 text-sm md:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty.value} value={specialty.value}>
                          {specialty.name} ({specialty.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Students Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/students/${student.id}`}>
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm cursor-pointer">
                    {/* Cover Image with Overlay */}
                    <div className={`h-24 md:h-32 bg-gradient-to-br ${student.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      
                      {/* Floating Icon */}
                      <div className="absolute top-2 md:top-4 left-2 md:left-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <student.icon className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </motion.div>
                      </div>
                      
                      {/* Specialty Badge */}
                      <div className="absolute top-2 md:top-4 right-2 md:right-4">
                        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 text-xs font-medium text-white">
                          {student.speciality}
                        </span>
                      </div>
                      
                      {/* Rating */}
                      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 flex items-center">
                        <StarIcon className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs md:text-sm font-medium ml-1">{student.rating}</span>
                      </div>
                    </div>
                    
                    {/* Avatar */}
                    <div className="relative -mt-8 md:-mt-12 px-4 md:px-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <AcademicCapIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                        </div>
                      </motion.div>
                    </div>
                    
                    <CardHeader className="text-center pt-3 md:pt-4 pb-2 px-4 md:px-6">
                      <CardTitle className="text-lg md:text-xl font-bold group-hover:text-blue-600 transition-colors">
                        {student.name}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base text-gray-600">
                        {student.major} • {student.year}
                      </CardDescription>
                      <div className="flex items-center justify-center text-xs md:text-sm text-gray-500 mt-1">
                        <MapPinIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                        <span className="truncate">{student.university}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                        {student.bio}
                      </p>
                      
                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                        {student.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 md:py-1 text-xs font-medium text-blue-700"
                          >
                            {skill}
                          </span>
                        ))}
                        {student.skills.length > 3 && (
                          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 md:py-1 text-xs font-medium text-gray-500">
                            +{student.skills.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                        <div className="flex items-center">
                          <CodeBracketIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span>{student.projects} layihə</span>
                        </div>
                        <div className="flex items-center">
                          <TrophyIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          <span>{student.achievements} nailiyyət</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* No Results */}
          {filteredStudents.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nəticə tapılmadı</h3>
              <p className="text-gray-600">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
            </motion.div>
          )}
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
            <RocketLaunchIcon className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-4 md:mb-6">
            Siz də TETYM Ailəsinə Qoşulun!
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            İstedadlı tələbələrimizlə birlikdə innovativ layihələr hazırlayın və 
            texnologiya dünyasında iz buraxın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary" className="text-blue-600 hover:bg-gray-100 shadow-lg">
                  <UserGroupIcon className="mr-2 h-5 w-5" />
                  Bizə Qoşul
                </Button>
              </motion.div>
            </Link>
            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center text-white hover:text-blue-200 font-semibold transition-colors"
              >
                Layihələri Gör
                <CodeBracketIcon className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
